import type { StudyBlock } from '../types/agenda';
import { db } from './storage';
import { googleAuthService } from './google-auth';

class GoogleCalendarService {
  public async syncBlockToCalendar(block: StudyBlock): Promise<boolean> {
    const auth = googleAuthService.getState();
    if (!auth.isAuthenticated || !auth.scopes.calendar) {
      throw new Error('Debes conectar tu cuenta de Google con permisos de Google Calendar');
    }

    // 1. MODO DEMO: Simulación fluida sin llamadas externas
    if (auth.mode === 'demo') {
      await new Promise(resolve => setTimeout(resolve, 500));
      const googleEventId = `gcal_demo_${Date.now()}`;
      if (block.id) {
        await db.studyBlocks.update(block.id, {
          syncedWithGoogle: true,
          googleEventId
        });
      }
      return true;
    }

    // 2. MODO REAL: Llamada a Google Calendar API v3
    const accessToken = googleAuthService.getAccessToken();
    if (!accessToken) {
      throw new Error('El token de sesión de Google ha caducado. Vuelve a conectar tu cuenta.');
    }

    const startDateTime = `${block.date}T${block.startTime}:00`;
    const startDate = new Date(startDateTime);
    const endDate = new Date(startDate.getTime() + (block.durationMinutes * 60 * 1000));

    const eventPayload = {
      summary: `[Anaxagoras AI] ${block.title}`,
      description: `Asignatura: ${block.subject}\nNotas: ${block.notes || 'Sesión de aprendizaje autónomo'}\n\nCreado con Anaxagoras AI Sistema de Tutoría Inteligente`,
      start: {
        dateTime: startDate.toISOString(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
      },
      end: {
        dateTime: endDate.toISOString(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
      },
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'popup', minutes: 15 },
          { method: 'popup', minutes: 60 }
        ]
      }
    };

    const response = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(eventPayload)
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(`Error de Google Calendar API (${response.status}): ${errData.error?.message || response.statusText}`);
    }

    const createdEvent = await response.json();
    if (block.id) {
      await db.studyBlocks.update(block.id, {
        syncedWithGoogle: true,
        googleEventId: createdEvent.id
      });
    }

    return true;
  }

  public async syncAllPendingBlocks(): Promise<number> {
    const pending = await db.studyBlocks.filter(b => !b.syncedWithGoogle).toArray();
    for (const block of pending) {
      await this.syncBlockToCalendar(block);
    }
    return pending.length;
  }

  public async fetchRealUpcomingEvents(): Promise<any[]> {
    const auth = googleAuthService.getState();
    if (auth.mode !== 'real') return [];

    const token = googleAuthService.getAccessToken();
    if (!token) return [];

    const now = new Date().toISOString();
    const url = `https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${encodeURIComponent(now)}&maxResults=10&singleEvents=true&orderBy=startTime`;

    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (!res.ok) return [];
    const data = await res.json();
    return data.items || [];
  }
}

export const googleCalendarService = new GoogleCalendarService();

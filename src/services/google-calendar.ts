import type { StudyBlock } from '../types/agenda';
import { db } from './storage';
import { googleAuthService } from './google-auth';

class GoogleCalendarService {
  public async syncBlockToCalendar(block: StudyBlock): Promise<boolean> {
    const auth = googleAuthService.getState();
    if (!auth.isAuthenticated || !auth.scopes.calendar) {
      throw new Error('Debes conectar tu cuenta de Google con permisos de Google Calendar');
    }

    // Mock API call to Google Calendar API v3
    // POST https://www.googleapis.com/calendar/v3/calendars/primary/events
    await new Promise(resolve => setTimeout(resolve, 600));

    const googleEventId = `gcal_${Date.now()}`;
    if (block.id) {
      await db.studyBlocks.update(block.id, {
        syncedWithGoogle: true,
        googleEventId
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
}

export const googleCalendarService = new GoogleCalendarService();

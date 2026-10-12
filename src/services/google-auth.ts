import type { AuthState, GoogleProfile } from '../types/auth';

const STORAGE_KEY = 'anaxagoras_auth_state';

class GoogleAuthService {
  private state: AuthState = {
    isAuthenticated: false,
    user: null,
    scopes: {
      calendar: true,
      drive: true,
      profile: true,
    },
  };

  private listeners: Array<(state: AuthState) => void> = [];

  constructor() {
    this.loadPersistedState();
  }

  private loadPersistedState(): void {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        this.state = JSON.parse(saved);
      } else {
        // Provide a friendly default connected state for immediate test demonstration
        this.state = {
          isAuthenticated: true,
          user: {
            id: 'google_user_demo_01',
            name: 'Álvaro Martín',
            email: 'alvaro.estudiante@edu.es',
            avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
            gradeLevel: '4º ESO / Secundaria',
            connectedAt: new Date().toISOString()
          },
          scopes: {
            calendar: true,
            drive: true,
            profile: true
          }
        };
        this.saveState();
      }
    } catch {
      // Fallback
    }
  }

  private saveState(): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    this.notify();
  }

  public getState(): AuthState {
    return { ...this.state };
  }

  public subscribe(callback: (state: AuthState) => void): () => void {
    this.listeners.push(callback);
    callback(this.state);
    return () => {
      this.listeners = this.listeners.filter(l => l !== callback);
    };
  }

  private notify(): void {
    for (const listener of this.listeners) {
      listener(this.state);
    }
  }

  public async connectGoogle(customName?: string, customEmail?: string): Promise<GoogleProfile> {
    const profile: GoogleProfile = {
      id: `google_${Date.now()}`,
      name: customName || 'Estudiante Conectado',
      email: customEmail || 'estudiante@colegio.edu.es',
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      gradeLevel: '3º / 4º ESO',
      connectedAt: new Date().toISOString()
    };

    this.state = {
      isAuthenticated: true,
      user: profile,
      scopes: {
        calendar: true,
        drive: true,
        profile: true
      }
    };

    this.saveState();
    return profile;
  }

  public disconnect(): void {
    this.state = {
      isAuthenticated: false,
      user: null,
      scopes: {
        calendar: false,
        drive: false,
        profile: false
      }
    };
    this.saveState();
  }
}

export const googleAuthService = new GoogleAuthService();

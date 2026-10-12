import type { AuthState, GoogleProfile } from '../types/auth';

const STORAGE_KEY = 'anaxagoras_auth_state';
const DEFAULT_SCOPES = [
  'openid',
  'https://www.googleapis.com/auth/userinfo.profile',
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/calendar.events',
  'https://www.googleapis.com/auth/drive.readonly'
].join(' ');

class GoogleAuthService {
  private state: AuthState = {
    isAuthenticated: true,
    mode: 'demo',
    user: null,
    clientId: '',
    scopes: {
      calendar: true,
      drive: true,
      profile: true
    }
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
        // Default to Demo Mode with active profile for seamless evaluation
        this.setDemoState();
      }
    } catch {
      this.setDemoState();
    }
  }

  private setDemoState(): void {
    this.state = {
      isAuthenticated: true,
      mode: 'demo',
      clientId: '',
      user: {
        id: 'google_user_demo_01',
        name: 'Álvaro Martín (Demo)',
        email: 'alvaro.estudiante@edu.es',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        gradeLevel: '4º ESO / Secundaria',
        connectedAt: new Date().toISOString(),
        mode: 'demo'
      },
      scopes: {
        calendar: true,
        drive: true,
        profile: true
      }
    };
    this.saveState();
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

  public setClientId(clientId: string): void {
    this.state.clientId = clientId.trim();
    this.saveState();
  }

  public async connectDemo(): Promise<GoogleProfile> {
    this.setDemoState();
    return this.state.user!;
  }

  public async connectRealGoogle(clientId?: string): Promise<GoogleProfile> {
    const activeClientId = clientId || this.state.clientId;
    if (!activeClientId) {
      throw new Error('Debes introducir un Google OAuth Client ID válido para conectar en modo real.');
    }

    this.state.clientId = activeClientId;

    // Wait for Google Identity Services SDK
    await this.ensureGoogleSDKLoaded();

    if (!window.google?.accounts?.oauth2) {
      throw new Error('La librería Google Identity Services no está disponible. Comprueba tu conexión a internet.');
    }

    return new Promise<GoogleProfile>((resolve, reject) => {
      try {
        const client = window.google!.accounts!.oauth2!.initTokenClient({
          client_id: activeClientId,
          scope: DEFAULT_SCOPES,
          callback: async (tokenResponse) => {
            if (tokenResponse.error) {
              reject(new Error(`Error de autenticación Google: ${tokenResponse.error}`));
              return;
            }

            if (!tokenResponse.access_token) {
              reject(new Error('No se recibió token de acceso de Google.'));
              return;
            }

            try {
              // Fetch real userinfo from Google OAuth2 endpoint
              const userInfoRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                headers: {
                  Authorization: `Bearer ${tokenResponse.access_token}`
                }
              });

              if (!userInfoRes.ok) {
                throw new Error('Fallo al obtener información del perfil del usuario de Google.');
              }

              const userInfo = await userInfoRes.json();
              const profile: GoogleProfile = {
                id: userInfo.sub || `google_${Date.now()}`,
                name: userInfo.name || 'Estudiante Google',
                email: userInfo.email || 'estudiante@gmail.com',
                avatarUrl: userInfo.picture || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
                gradeLevel: 'Cuenta Personal / Educativa',
                connectedAt: new Date().toISOString(),
                mode: 'real'
              };

              this.state = {
                isAuthenticated: true,
                mode: 'real',
                clientId: activeClientId,
                accessToken: tokenResponse.access_token,
                tokenExpiry: Date.now() + ((tokenResponse.expires_in || 3600) * 1000),
                user: profile,
                scopes: {
                  calendar: true,
                  drive: true,
                  profile: true
                }
              };

              this.saveState();
              resolve(profile);
            } catch (err: any) {
              reject(err);
            }
          },
          error_callback: (err) => {
            reject(new Error(err?.message || 'Error en el diálogo de inicio de sesión de Google.'));
          }
        });

        // Trigger Google OAuth 2.0 popup
        client.requestAccessToken({ prompt: 'consent' });
      } catch (err: any) {
        reject(err);
      }
    });
  }

  private async ensureGoogleSDKLoaded(): Promise<void> {
    if (window.google?.accounts?.oauth2) return;

    return new Promise((resolve) => {
      let attempts = 0;
      const checkInterval = setInterval(() => {
        attempts++;
        if (window.google?.accounts?.oauth2 || attempts > 25) {
          clearInterval(checkInterval);
          resolve();
        }
      }, 100);
    });
  }

  public getAccessToken(): string | null {
    if (this.state.mode === 'real' && this.state.accessToken) {
      if (this.state.tokenExpiry && Date.now() > this.state.tokenExpiry) {
        console.warn('[GoogleAuth] Token de acceso expirado.');
        return null;
      }
      return this.state.accessToken;
    }
    return null;
  }

  public disconnect(): void {
    this.state = {
      isAuthenticated: false,
      mode: 'demo',
      user: null,
      accessToken: undefined,
      tokenExpiry: undefined,
      clientId: this.state.clientId,
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

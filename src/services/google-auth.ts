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
        // Ensure distinct demo emails and IDs are synchronized when loading persisted state
        if (this.state.mode === 'demo' && this.state.user) {
          if (this.state.user.gradeKey === '2batx') {
            this.state.user.id = 'google_user_demo_2batx';
            this.state.user.name = 'Álvaro Martín (2º Bachillerato)';
            this.state.user.email = 'alvaro.martin@ies-catalunya.edu.cat';
          } else {
            this.state.user.id = 'google_user_demo_1eso';
            this.state.user.name = 'Marc Vidal (1º de ESO)';
            this.state.user.email = 'marc.vidal@ies-catalunya.edu.cat';
          }
        }
      } else {
        // Default to Demo Mode with active 1º ESO profile for seamless evaluation
        this.setDemoState('1eso');
      }
    } catch {
      this.setDemoState('1eso');
    }
  }

  private setDemoState(grade: '1eso' | '2batx' = '1eso'): void {
    const isBatx = grade === '2batx';
    this.state = {
      isAuthenticated: true,
      mode: 'demo',
      clientId: '',
      user: {
        id: isBatx ? 'google_user_demo_2batx' : 'google_user_demo_1eso',
        name: isBatx ? 'Álvaro Martín (2º Bachillerato)' : 'Marc Vidal (1º de ESO)',
        email: isBatx ? 'alvaro.martin@ies-catalunya.edu.cat' : 'marc.vidal@ies-catalunya.edu.cat',
        avatarUrl: isBatx 
          ? 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'
          : 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=150&auto=format&fit=crop&q=80',
        gradeLevel: isBatx ? '2º de Bachillerato (17-18 años)' : '1º de ESO (12 años)',
        gradeKey: grade,
        stageName: isBatx ? 'Operaciones Formales (Piaget)' : 'Operaciones Concretas (Piaget)',
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

  public async connectDemo(grade: '1eso' | '2batx' = '1eso'): Promise<GoogleProfile> {
    this.setDemoState(grade);
    return this.state.user!;
  }

  public setGradeProfile(grade: '1eso' | '2batx'): void {
    if (!this.state.user) {
      this.setDemoState(grade);
      return;
    }

    if (grade === '1eso') {
      this.state.user = {
        ...this.state.user,
        id: this.state.mode === 'demo' ? 'google_user_demo_1eso' : this.state.user.id,
        name: this.state.mode === 'demo' ? 'Marc Vidal (1º de ESO)' : this.state.user.name,
        email: this.state.mode === 'demo' ? 'marc.vidal@ies-catalunya.edu.cat' : this.state.user.email,
        gradeLevel: '1º de ESO (12 años)',
        gradeKey: '1eso',
        stageName: 'Operaciones Concretas (Piaget)',
        avatarUrl: this.state.mode === 'demo' 
          ? 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=150&auto=format&fit=crop&q=80'
          : this.state.user.avatarUrl
      };
    } else {
      this.state.user = {
        ...this.state.user,
        id: this.state.mode === 'demo' ? 'google_user_demo_2batx' : this.state.user.id,
        name: this.state.mode === 'demo' ? 'Álvaro Martín (2º Bachillerato)' : this.state.user.name,
        email: this.state.mode === 'demo' ? 'alvaro.martin@ies-catalunya.edu.cat' : this.state.user.email,
        gradeLevel: '2º de Bachillerato (17-18 años)',
        gradeKey: '2batx',
        stageName: 'Operaciones Formales (Piaget)',
        avatarUrl: this.state.mode === 'demo'
          ? 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'
          : this.state.user.avatarUrl
      };
    }
    this.saveState();
  }

  public toggleGradeProfile(): void {
    const current = this.state.user?.gradeKey || '1eso';
    this.setGradeProfile(current === '1eso' ? '2batx' : '1eso');
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
                name: userInfo.name || 'Álvaro Martín (2º de Bachillerato)',
                email: userInfo.email || 'alvaro.estudiante@batxillerat.cat',
                avatarUrl: userInfo.picture || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
                gradeLevel: '2º de Bachillerato (17-18 años)',
                gradeKey: '2batx',
                stageName: 'Operaciones Formales (Piaget)',
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

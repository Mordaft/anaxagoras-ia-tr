export type AuthMode = 'demo' | 'real';
export type StudentGrade = '1eso' | '2batx';

export interface GoogleProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  gradeLevel: string; // e.g. "1º de ESO (12 años)", "2º de Bachillerato (17-18 años)"
  gradeKey: StudentGrade; // '1eso' | '2batx'
  stageName: string; // "Operaciones Concretas / Transición" o "Operaciones Formales / Preuniversitario"
  connectedAt: string;
  mode: AuthMode;
}

export interface AuthState {
  isAuthenticated: boolean;
  mode: AuthMode;
  user: GoogleProfile | null;
  accessToken?: string;
  tokenExpiry?: number;
  clientId: string;
  scopes: {
    calendar: boolean;
    drive: boolean;
    profile: boolean;
  };
}

// Global declaration for Google Identity Services
declare global {
  interface Window {
    google?: {
      accounts?: {
        oauth2?: {
          initTokenClient: (config: {
            client_id: string;
            scope: string;
            callback: (response: {
              access_token?: string;
              error?: string;
              expires_in?: number;
              scope?: string;
            }) => void;
            error_callback?: (error: any) => void;
          }) => {
            requestAccessToken: (overrideConfig?: { prompt?: string }) => void;
          };
          hasGrantedAllScopes: (
            tokenResponse: any,
            firstScope: string,
            ...restScopes: string[]
          ) => boolean;
        };
      };
    };
  }
}

export interface GoogleProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  gradeLevel: string; // e.g. "4º ESO", "2º Bachillerato", "6º Primaria"
  connectedAt: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: GoogleProfile | null;
  scopes: {
    calendar: boolean;
    drive: boolean;
    profile: boolean;
  };
  clientId?: string;
}

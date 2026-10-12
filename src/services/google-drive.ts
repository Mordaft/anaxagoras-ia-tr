import type { DriveAttachment } from '../types/tasks';
import { googleAuthService } from './google-auth';

class GoogleDriveService {
  public async getAvailableFiles(): Promise<DriveAttachment[]> {
    const auth = googleAuthService.getState();
    if (!auth.isAuthenticated || !auth.scopes.drive) {
      throw new Error('Debes conectar tu cuenta de Google con acceso a Google Drive');
    }

    // Realistic school Google Drive files
    return [
      {
        fileId: 'drv_01',
        name: 'Ensayo_Energia_Sostenible_Borrador.gdoc',
        mimeType: 'application/vnd.google-apps.document',
        lastModified: 'Hoy, 10:30'
      },
      {
        fileId: 'drv_02',
        name: 'Presentacion_Historia_Siglo_XX.gslides',
        mimeType: 'application/vnd.google-apps.presentation',
        lastModified: 'Ayer'
      },
      {
        fileId: 'drv_03',
        name: 'Apuntes_Biologia_Genetica.pdf',
        mimeType: 'application/pdf',
        lastModified: 'Hace 3 días'
      },
      {
        fileId: 'drv_04',
        name: 'Datos_Graficos_Matematicas.gsheet',
        mimeType: 'application/vnd.google-apps.spreadsheet',
        lastModified: 'Hace 1 semana'
      }
    ];
  }
}

export const googleDriveService = new GoogleDriveService();

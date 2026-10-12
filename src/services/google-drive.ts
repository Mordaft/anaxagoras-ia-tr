import type { DriveAttachment } from '../types/tasks';
import { googleAuthService } from './google-auth';

class GoogleDriveService {
  public async getAvailableFiles(): Promise<DriveAttachment[]> {
    const auth = googleAuthService.getState();
    if (!auth.isAuthenticated || !auth.scopes.drive) {
      throw new Error('Debes conectar tu cuenta de Google con acceso a Google Drive');
    }

    // 1. MODO DEMO: Retornar documentos escolares simulados
    if (auth.mode === 'demo') {
      return [
        {
          fileId: 'drv_demo_01',
          name: 'Ensayo_Energia_Sostenible_Borrador.gdoc',
          mimeType: 'application/vnd.google-apps.document',
          webViewLink: 'https://docs.google.com/document',
          lastModified: 'Hoy, 10:30'
        },
        {
          fileId: 'drv_demo_02',
          name: 'Presentacion_Historia_Siglo_XX.gslides',
          mimeType: 'application/vnd.google-apps.presentation',
          webViewLink: 'https://docs.google.com/presentation',
          lastModified: 'Ayer'
        },
        {
          fileId: 'drv_demo_03',
          name: 'Apuntes_Biologia_Genetica.pdf',
          mimeType: 'application/pdf',
          webViewLink: 'https://drive.google.com',
          lastModified: 'Hace 3 días'
        },
        {
          fileId: 'drv_demo_04',
          name: 'Datos_Graficos_Matematicas.gsheet',
          mimeType: 'application/vnd.google-apps.spreadsheet',
          webViewLink: 'https://docs.google.com/spreadsheets',
          lastModified: 'Hace 1 semana'
        }
      ];
    }

    // 2. MODO REAL: Consulta a Google Drive API v3
    const token = googleAuthService.getAccessToken();
    if (!token) {
      throw new Error('El token de sesión de Google ha caducado. Vuelve a iniciar sesión.');
    }

    const query = encodeURIComponent("trashed=false and (mimeType contains 'document' or mimeType contains 'presentation' or mimeType contains 'spreadsheet' or mimeType = 'application/pdf')");
    const fields = encodeURIComponent('files(id,name,mimeType,webViewLink,iconLink,modifiedTime)');
    const url = `https://www.googleapis.com/drive/v3/files?pageSize=25&q=${query}&fields=${fields}&orderBy=modifiedTime desc`;

    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(`Error de Google Drive API (${response.status}): ${errData.error?.message || response.statusText}`);
    }

    const data = await response.json();
    const files = data.files || [];

    return files.map((f: any) => ({
      fileId: f.id,
      name: f.name,
      mimeType: f.mimeType,
      iconUrl: f.iconLink,
      webViewLink: f.webViewLink || `https://drive.google.com/open?id=${f.id}`,
      lastModified: f.modifiedTime ? new Date(f.modifiedTime).toLocaleDateString() : 'Drive Sync'
    }));
  }
}

export const googleDriveService = new GoogleDriveService();

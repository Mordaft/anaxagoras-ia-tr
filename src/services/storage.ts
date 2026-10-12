import Dexie, { type Table } from 'dexie';
import type { AISettings } from '../types/ai';
import type { StudyBlock } from '../types/agenda';
import type { ProjectTask } from '../types/tasks';
import type { GoogleProfile } from '../types/auth';

export class AnaxagorasDatabase extends Dexie {
  aiSettings!: Table<AISettings, number>;
  studyBlocks!: Table<StudyBlock, number>;
  projectTasks!: Table<ProjectTask, number>;
  userProfile!: Table<GoogleProfile, string>;

  constructor() {
    super('AnaxagorasAIDatabase');
    this.version(1).stores({
      aiSettings: '++id, provider, modelName',
      studyBlocks: '++id, date, subject, completed, syncedWithGoogle',
      projectTasks: '++id, subject, currentPhase, dueDate',
      userProfile: 'id, email'
    });
  }
}

export const db = new AnaxagorasDatabase();

// Pre-populate with realistic, engaging starter data if database is empty
export async function initializeStarterData(): Promise<void> {
  const blocksCount = await db.studyBlocks.count();
  if (blocksCount === 0) {
    const today = new Date().toISOString().split('T')[0];
    const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
    const inThreeDays = new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0];

    await db.studyBlocks.bulkAdd([
      {
        title: 'Repaso Ecuaciones y Funciones',
        subject: 'Matemáticas',
        date: today,
        startTime: '17:00',
        durationMinutes: 45,
        type: 'study_session',
        completed: false,
        notes: 'Enfoque en despeje de incógnitas sin mirar soluciones directas',
        syncedWithGoogle: true,
        googleEventId: 'gcal_ev_101'
      },
      {
        title: 'Examen Unidad 3: La Célula y Fotosíntesis',
        subject: 'Biología',
        date: inThreeDays,
        startTime: '09:30',
        durationMinutes: 60,
        type: 'exam',
        completed: false,
        notes: 'Llevar esquemas dibujados a mano',
        syncedWithGoogle: true,
        googleEventId: 'gcal_ev_102'
      },
      {
        title: 'Estructurar Introducción del Trabajo',
        subject: 'Historia',
        date: tomorrow,
        startTime: '18:30',
        durationMinutes: 40,
        type: 'assignment_due',
        completed: false,
        notes: 'Verificar fuentes primarias en Google Drive',
        syncedWithGoogle: false
      }
    ]);
  }

  const tasksCount = await db.projectTasks.count();
  if (tasksCount === 0) {
    const nextWeek = new Date(Date.now() + 86400000 * 7).toISOString().split('T')[0];

    await db.projectTasks.bulkAdd([
      {
        title: 'Monografía: Energías Renovables en el Mediterráneo',
        subject: 'Ciencias y Tecnología',
        dueDate: nextWeek,
        currentPhase: 'research',
        autonomyScore: 75,
        notes: 'Analizar viabilidad de la solar y eólica marina en costas de Valencia y Baleares.',
        driveFiles: [
          {
            fileId: 'drive_doc_01',
            name: 'Borrador_Esquema_Energias.gdoc',
            mimeType: 'application/vnd.google-apps.document',
            lastModified: 'Hace 2 horas'
          },
          {
            fileId: 'drive_sheet_02',
            name: 'Datos_Produccion_2025.gsheet',
            mimeType: 'application/vnd.google-apps.spreadsheet',
            lastModified: 'Ayer'
          }
        ],
        criteria: [
          {
            id: 'c1',
            label: 'Formulación de la pregunta de investigación con mis palabras',
            checked: true,
            explanation: 'Definido el objetivo sin copia directa de internet.'
          },
          {
            id: 'c2',
            label: 'Búsqueda y contraste de 3 fuentes académicas fiables',
            checked: true,
            explanation: 'Artículos de revistas científicas guardados en Drive.'
          },
          {
            id: 'c3',
            label: 'Redacción de conclusiones propias basadas en los datos',
            checked: false,
            explanation: 'En proceso: reflexionar sobre los resultados sin pedir resumen a la IA.'
          },
          {
            id: 'c4',
            label: 'Revisión ortográfica y citas bibliográficas en formato APA',
            checked: false,
            explanation: 'Pendiente de fase final.'
          }
        ]
      }
    ]);
  }

  // Ensure default AI settings
  const aiCount = await db.aiSettings.count();
  if (aiCount === 0) {
    await db.aiSettings.add({
      provider: 'local',
      endpointUrl: 'http://localhost:11434/v1',
      modelName: 'llama3:latest',
      temperature: 0.7,
      socraticStrictness: 'high',
      updatedAt: new Date().toISOString()
    });
  }
}

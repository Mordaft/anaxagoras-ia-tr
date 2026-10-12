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

  // Ensure Lengua Castellana comparative tasks for 1º ESO vs 2º Bachillerato
  await ensureLenguaCastellanaTasks();
}

export async function ensureLenguaCastellanaTasks(): Promise<void> {
  const existing = await db.projectTasks.where('subject').equals('Lengua Castellana y Literatura').toArray();
  const nextWeek = new Date(Date.now() + 86400000 * 5).toISOString().split('T')[0];
  const inTwoWeeks = new Date(Date.now() + 86400000 * 12).toISOString().split('T')[0];

  if (!existing.some(t => t.gradeKey === '1eso')) {
    await db.projectTasks.add({
      title: 'Análisis Sintáctico: El Predicado y el Complemento Verbal',
      subject: 'Lengua Castellana y Literatura',
      gradeKey: '1eso',
      dueDate: nextWeek,
      currentPhase: 'writing',
      autonomyScore: 75,
      pedagogicalNote: 'Nivel 1º de ESO (12 años - Operaciones Concretas): Los elementos que acompañan al verbo se identifican en bloque como Complemento Verbal (CV). No se exige clasificar subtipos avanzados.',
      notes: 'Oración modelo: "El tren llegó puntual a la estación". Identificar el Sujeto ("El tren") y el Predicado ("llegó puntual a la estación") reconociendo el verbo y sus acompañantes directos.',
      driveFiles: [
        {
          fileId: 'drive_doc_sintaxis_1eso',
          name: 'Ficha_Sintaxis_Oraciones_Simples_1ESO.gdoc',
          mimeType: 'application/vnd.google-apps.document',
          lastModified: 'Hace 1 día'
        }
      ],
      criteria: [
        {
          id: 'c_eso_1',
          label: 'Identificación del Sujeto ("El tren") y el Predicado',
          checked: true,
          explanation: 'Diferenciado correctamente quién realiza la acción.'
        },
        {
          id: 'c_eso_2',
          label: 'Localización del verbo principal ("llegó")',
          checked: true,
          explanation: 'Núcleo del predicado identificado.'
        },
        {
          id: 'c_eso_3',
          label: 'Reconocimiento del Complemento Verbal ("puntual a la estación")',
          checked: true,
          explanation: 'Identificado en bloque como acompañante del verbo, sin clasificar subtipos.'
        },
        {
          id: 'c_eso_4',
          label: 'Redacción de una oración propia con complemento verbal similar',
          checked: false,
          explanation: 'Pendiente de redactar y enviar al tutor.'
        }
      ]
    });
  }

  if (!existing.some(t => t.gradeKey === '2batx')) {
    await db.projectTasks.add({
      title: 'Sintaxis Superior: Tipología y Pruebas de Complementos Verbales (PAU)',
      subject: 'Lengua Castellana y Literatura',
      gradeKey: '2batx',
      dueDate: inTwoWeeks,
      currentPhase: 'writing',
      autonomyScore: 60,
      pedagogicalNote: 'Nivel 2º de Bachillerato (17-18 años - Operaciones Formales): Es obligatorio clasificar la tipología exacta de cada complemento verbal y contrastar casos dudosos mediante pruebas sintácticas formales.',
      notes: 'Oración modelo: "El tren llegó puntual a la estación". Demostrar por qué "puntual" es Complemento Predicativo (CPred) y no CCM, y clasificar "a la estación" como Complemento Circunstancial de Lugar (CCL).',
      driveFiles: [
        {
          fileId: 'drive_doc_sintaxis_2batx',
          name: 'Guia_PAU_Tipologia_Complementos_Verbales.gdoc',
          mimeType: 'application/vnd.google-apps.document',
          lastModified: 'Hace 3 horas'
        },
        {
          fileId: 'drive_sheet_pruebas',
          name: 'Matriz_Pruebas_Sintacticas_RAE.gsheet',
          mimeType: 'application/vnd.google-apps.spreadsheet',
          lastModified: 'Ayer'
        }
      ],
      criteria: [
        {
          id: 'c_batx_1',
          label: 'Segmentación en Sintagmas y delimitación oracional formal',
          checked: true,
          explanation: 'SN Sujeto y SV Predicado identificados con precisión.'
        },
        {
          id: 'c_batx_2',
          label: 'Tipificación exacta: "puntual" como CPredicativo y "a la estación" como CCL',
          checked: true,
          explanation: 'Diferenciación estricta de la tipología de complementos del predicado.'
        },
        {
          id: 'c_batx_3',
          label: 'Prueba sintáctica de concordancia para el CPredicativo',
          checked: false,
          explanation: 'Demostrar concordancia con el sujeto: "Las locomotoras llegaron puntuales".'
        },
        {
          id: 'c_batx_4',
          label: 'Contraste argumentado: Distinción entre CPredicativo vs CCM / CRV vs CC',
          checked: false,
          explanation: 'Justificar por qué los adjetivos en función de complemento verbal no pueden ser adverbiales.'
        }
      ]
    });
  }
}

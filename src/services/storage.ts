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

  // Ensure distinct agenda blocks and project tasks for 1º ESO and 2º Bachillerato
  await ensureGradeSpecificAgendaBlocks();
  await ensureGradeSpecificProjectTasks();
}

export async function ensureGradeSpecificAgendaBlocks(): Promise<void> {
  // Purge any legacy untagged blocks to guarantee clean grade separation
  const legacyBlocks = await db.studyBlocks.filter(b => !b.gradeKey).toArray();
  if (legacyBlocks.length > 0) {
    for (const b of legacyBlocks) {
      if (b.id) await db.studyBlocks.delete(b.id);
    }
  }

  const existing1eso = await db.studyBlocks.filter(b => b.gradeKey === '1eso').count();
  const existing2batx = await db.studyBlocks.filter(b => b.gradeKey === '2batx').count();

  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
  const inTwoDays = new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0];
  const inThreeDays = new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0];
  const inFourDays = new Date(Date.now() + 86400000 * 4).toISOString().split('T')[0];

    if (existing1eso === 0) {
    await db.studyBlocks.bulkAdd([
      {
        title: 'Análisis de Oraciones: Sujeto y Complemento Verbal',
        subject: 'Lengua Castellana',
        date: today,
        startTime: '17:00',
        durationMinutes: 45,
        type: 'assignment_due',
        completed: false,
        gradeKey: '1eso',
        origin: 'institutional',
        teacherNotes: 'Publicado desde Esfer@ tras completar la explicación del Sujeto y Predicado en clase.',
        notes: 'Identificación del predicado y localización del Complemento Verbal (CV) en bloque.',
        syncedWithGoogle: true,
        googleEventId: 'gcal_eso_castellano'
      },
      {
        title: 'Ciencias Naturales: El Reino Animal y los Ecosistemas',
        subject: 'Ciencias Naturales',
        date: tomorrow,
        startTime: '16:30',
        durationMinutes: 40,
        type: 'study_session',
        completed: false,
        gradeKey: '1eso',
        origin: 'institutional',
        teacherNotes: 'El profesor ha cerrado el tema 2 de ecosistemas. Repaso activo recomendado.',
        notes: 'Repaso con esquemas visuales de vertebrados e invertebrados.',
        syncedWithGoogle: false
      },
      {
        title: 'Matemáticas: Fracciones y Operaciones Básicas',
        subject: 'Matemáticas',
        date: inTwoDays,
        startTime: '17:15',
        durationMinutes: 45,
        type: 'study_session',
        completed: false,
        gradeKey: '1eso',
        origin: 'institutional',
        teacherNotes: 'Avance del tema de fracciones en el aula. Resolver ejercicios de cálculo.',
        notes: 'Ejercicios de suma y resta con común denominador.',
        syncedWithGoogle: true,
        googleEventId: 'gcal_eso_mates'
      },
      {
        title: 'Control Tema 2: Egipto y las Civilizaciones Fluviales',
        subject: 'Ciencias Sociales',
        date: inThreeDays,
        startTime: '09:00',
        durationMinutes: 50,
        type: 'exam',
        completed: false,
        gradeKey: '1eso',
        origin: 'institutional',
        teacherNotes: 'Control trimestral de departamento programado por el centro educativo.',
        notes: 'Llevar mapa histórico de Mesopotamia y el Nilo.',
        syncedWithGoogle: false
      },
      {
        title: 'Lectura Guiada: Crónicas Juveniles y Vocabulario',
        subject: 'Tutoría / Lectura',
        date: inFourDays,
        startTime: '16:00',
        durationMinutes: 30,
        type: 'study_session',
        completed: false,
        gradeKey: '1eso',
        origin: 'institutional',
        teacherNotes: 'Actividad de fomento lector coordinada por el equipo docente de 1º de ESO.',
        notes: 'Lectura de 2 capítulos y ficha de comprensión lectora.',
        syncedWithGoogle: false
      }
    ]);
  }

  if (existing2batx === 0) {
    await db.studyBlocks.bulkAdd([
      {
        title: 'Sintaxis Superior: Tipología y Pruebas de Complementos (PAU)',
        subject: 'Lengua Castellana',
        date: today,
        startTime: '17:00',
        durationMinutes: 55,
        type: 'assignment_due',
        completed: false,
        gradeKey: '2batx',
        origin: 'institutional',
        teacherNotes: 'Publicado desde Esfer@ por el Departamento de Lengua Castellana (Preparación PAU).',
        notes: 'Clasificación de complementos verbales (CPred vs CCL) y pruebas sintácticas formales.',
        syncedWithGoogle: true,
        googleEventId: 'gcal_batx_castellano'
      },
      {
        title: 'Historia de España: La Constitución de 1812 y la Guerra de la Independencia',
        subject: 'Historia de España',
        date: tomorrow,
        startTime: '18:00',
        durationMinutes: 50,
        type: 'study_session',
        completed: false,
        gradeKey: '2batx',
        origin: 'institutional',
        teacherNotes: 'El profesor ha impartido el tema en el aula hoy. Comentario de texto obligatorio.',
        notes: 'Comentario de texto histórico: Manifiesto de los Persas y Cortes de Cádiz.',
        syncedWithGoogle: false
      },
      {
        title: 'Matemáticas II: Matrices, Determinantes y Sistemas de Cramer (PAU)',
        subject: 'Matemáticas II',
        date: inTwoDays,
        startTime: '16:30',
        durationMinutes: 60,
        type: 'study_session',
        completed: false,
        gradeKey: '2batx',
        origin: 'institutional',
        teacherNotes: 'Práctica de selectividad asignada en clase para consolidar cálculo matricial.',
        notes: 'Resolución de problemas de selectividad con discusión según parámetro k.',
        syncedWithGoogle: true,
        googleEventId: 'gcal_batx_mates'
      },
      {
        title: 'Simulacro PAU: Filosofía Moderna y Platón (El Mito de la Caverna)',
        subject: 'Filosofía',
        date: inThreeDays,
        startTime: '11:30',
        durationMinutes: 60,
        type: 'exam',
        completed: false,
        gradeKey: '2batx',
        origin: 'institutional',
        teacherNotes: 'Prueba oficial de simulacro de Selectividad coordinada por el departamento.',
        notes: 'Comparativa ontológica y epistemológica entre Platón y Descartes.',
        syncedWithGoogle: false
      },
      {
        title: 'Química: Termodinámica y Cinética Química (PAU)',
        subject: 'Química',
        date: inFourDays,
        startTime: '17:30',
        durationMinutes: 45,
        type: 'study_session',
        completed: false,
        gradeKey: '2batx',
        origin: 'institutional',
        teacherNotes: 'Contenido teórico completado en el laboratorio escolar. Resolver ejercicios del boletín.',
        notes: 'Cálculo de entalpía estándar y entropía de reacción.',
        syncedWithGoogle: false
      }
    ]);
  }
}

export async function ensureGradeSpecificProjectTasks(): Promise<void> {
  // Purge any legacy untagged tasks to guarantee clean grade separation
  const legacyTasks = await db.projectTasks.filter(t => !t.gradeKey).toArray();
  if (legacyTasks.length > 0) {
    for (const t of legacyTasks) {
      if (t.id) await db.projectTasks.delete(t.id);
    }
  }

  // Backfill topicId and activityId for existing tasks if missing
  const untaggedTasks = await db.projectTasks.filter(t => !t.topicId).toArray();
  for (const t of untaggedTasks) {
    if (!t.id) continue;
    if (t.gradeKey === '1eso') {
      if (t.subject.includes('Lengua')) {
        await db.projectTasks.update(t.id, { topicId: 'topic_lengua_1eso', activityId: 'act_lengua_1eso_1' });
      } else {
        await db.projectTasks.update(t.id, { topicId: 'topic_naturales_1eso', activityId: 'act_naturales_1eso_1' });
      }
    } else if (t.gradeKey === '2batx') {
      if (t.subject.includes('Lengua')) {
        await db.projectTasks.update(t.id, { topicId: 'topic_lengua_2batx', activityId: 'act_lengua_2batx_1' });
      } else {
        await db.projectTasks.update(t.id, { topicId: 'topic_tecnologia_2batx', activityId: 'act_tecnologia_2batx_1' });
      }
    }
  }

  const existing1eso = await db.projectTasks.filter(t => t.gradeKey === '1eso').count();
  const existing2batx = await db.projectTasks.filter(t => t.gradeKey === '2batx').count();

  const nextWeek = new Date(Date.now() + 86400000 * 5).toISOString().split('T')[0];
  const inTwoWeeks = new Date(Date.now() + 86400000 * 12).toISOString().split('T')[0];

  if (existing1eso === 0) {
    await db.projectTasks.bulkAdd([
      {
        title: 'Análisis Sintáctico: El Predicado y el Complemento Verbal',
        subject: 'Lengua Castellana y Literatura',
        gradeKey: '1eso',
        topicId: 'topic_lengua_1eso',
        activityId: 'act_lengua_1eso_1',
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
      },
      {
        title: 'Proyecto de Ciencias: Ecosistemas y Maqueta de Biodiversidad',
        subject: 'Ciencias Naturales',
        gradeKey: '1eso',
        topicId: 'topic_naturales_1eso',
        activityId: 'act_naturales_1eso_1',
        dueDate: inTwoWeeks,
        currentPhase: 'research',
        autonomyScore: 50,
        pedagogicalNote: 'Nivel 1º de ESO (12 años): Trabajo de campo guiado sobre cadenas tróficas y relaciones bióticas en el entorno local.',
        notes: 'Investigación sobre fauna y flora del bosque mediterráneo con clasificación de productores y consumidores.',
        driveFiles: [
          {
            fileId: 'drive_doc_ecosistemas_1eso',
            name: 'Guia_Maqueta_Ecosistemas.gdoc',
            mimeType: 'application/vnd.google-apps.document',
            lastModified: 'Hace 2 días'
          }
        ],
        criteria: [
          {
            id: 'c_eco_1',
            label: 'Elección del ecosistema a representar (bosque, río o costa)',
            checked: true,
            explanation: 'Seleccionado bosque mediterráneo.'
          },
          {
            id: 'c_eco_2',
            label: 'Lista de 5 especies autóctonas con su rol trófico',
            checked: true,
            explanation: 'Identificados productores, herbívoros y carnívoros.'
          },
          {
            id: 'c_eco_3',
            label: 'Diseño visual de la maqueta y materiales reciclables',
            checked: false,
            explanation: 'En proceso de preparación.'
          }
        ]
      }
    ]);
  }

  if (existing2batx === 0) {
    await db.projectTasks.bulkAdd([
      {
        title: 'Sintaxis Superior: Tipología y Pruebas de Complementos Verbales (PAU)',
        subject: 'Lengua Castellana y Literatura',
        gradeKey: '2batx',
        topicId: 'topic_lengua_2batx',
        activityId: 'act_lengua_2batx_1',
        dueDate: nextWeek,
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
      },
      {
        title: 'Monografía: Energías Renovables en el Mediterráneo',
        subject: 'Ciencias y Tecnología',
        gradeKey: '2batx',
        topicId: 'topic_tecnologia_2batx',
        activityId: 'act_tecnologia_2batx_1',
        dueDate: inTwoWeeks,
        currentPhase: 'research',
        autonomyScore: 75,
        pedagogicalNote: 'Nivel 2º de Bachillerato (17-18 años): Análisis preuniversitario de viabilidad técnica y económica con contraste de fuentes científicas.',
        notes: 'Analizar viabilidad de la energía solar y eólica marina en costas de Valencia y Baleares con datos reales.',
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
          }
        ]
      }
    ]);
  }
}

// Mantener compatibilidad hacia atrás
export const ensureLenguaCastellanaTasks = ensureGradeSpecificProjectTasks;

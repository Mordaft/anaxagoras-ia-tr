import type { StudentGrade } from '../types/auth';
import type { StudyBlock, InstitutionalTaskProgression, EventType } from '../types/agenda';
import { db } from './storage';

import { promptOrchestratorService } from './prompt-orchestrator';

export interface DepartmentalPromptResponse {
  subject: string;
  gradeKey: StudentGrade;
  gradeLevel: string;
  stageName: string;
  promptMarkdown: string;
  institution: string;
  sourceApi: string;
  fetchedAt: string;
}

interface ProgressionRule {
  gradeKey: '1eso' | '2batx';
  triggerKeywords: string[];
  nextBlock: () => {
    title: string;
    subject: string;
    type: EventType;
    durationMinutes: number;
    daysAhead: number;
    startTime: string;
    notes: string;
    teacherNotes: string;
    reason: 'topic_completed' | 'exam_scheduled' | 'assignment_published';
    notification: string;
  };
}

export class EducationalApiService {
  private readonly INSTITUTION_NAME = "Departament d'Educació de la Generalitat de Catalunya";
  private readonly API_ENDPOINT = 'https://api.educacio.gencat.cat/v1/curriculum/guardrails';

  // Banco de reglas colaborativas que simulan el avance de temario y tareas publicadas por el profesorado
  private readonly progressionRules: ProgressionRule[] = [
    // === 1º de ESO ===
    {
      gradeKey: '1eso',
      triggerKeywords: ['sujeto', 'complemento', 'verbal', 'oracion', 'oraciones'],
      nextBlock: () => ({
        title: 'Práctica de Aula: Complemento Verbal en Textos Narrativos',
        subject: 'Lengua Castellana',
        type: 'assignment_due',
        durationMinutes: 45,
        daysAhead: 2,
        startTime: '17:00',
        notes: 'Identificar el Complemento Verbal (CV) en bloque en 3 oraciones de la lectura.',
        teacherNotes: 'El profesor ha finalizado la explicación del tema 1 en el aula. Entregar ficha de análisis.',
        reason: 'assignment_published',
        notification: 'El profesor de Lengua Castellana ha registrado en Esfer@ que el tema 1 ha sido completado en clase y ha publicado una entrega de ejercicios.'
      })
    },
    {
      gradeKey: '1eso',
      triggerKeywords: ['fraccion', 'fracciones', 'operaciones basicas'],
      nextBlock: () => ({
        title: 'Problemas de Reparto Proporcional con Fracciones',
        subject: 'Matemáticas',
        type: 'study_session',
        durationMinutes: 40,
        daysAhead: 2,
        startTime: '17:30',
        notes: 'Problemas cotidianos de reparto y fracciones. Resolver los 4 problemas de la página 38.',
        teacherNotes: 'El profesor ha avanzado a la resolución de problemas en el aula hoy. Repasar antes de la próxima clase.',
        reason: 'topic_completed',
        notification: 'El profesor de Matemáticas ha comunicado un nuevo bloque de estudio para afianzar problemas de fracciones.'
      })
    },
    {
      gradeKey: '1eso',
      triggerKeywords: ['animal', 'ecosistema', 'vertebrad'],
      nextBlock: () => ({
        title: 'Esquema de Cadenas Tróficas y Especies Autóctonas',
        subject: 'Ciencias Naturales',
        type: 'study_session',
        durationMinutes: 40,
        daysAhead: 2,
        startTime: '16:30',
        notes: 'Dibujar pirámide trófica con productores, herbívoros y descomponedores del ecosistema mediterráneo.',
        teacherNotes: 'Tema 2 impartido en el aula de ciencias. Completar esquema conceptual de biodiversidad.',
        reason: 'topic_completed',
        notification: 'El Departamento de Ciencias Naturales ha agendado una sesión de consolidación de cadenas tróficas.'
      })
    },
    {
      gradeKey: '1eso',
      triggerKeywords: ['egipto', 'mesopotamia', 'civilizacion'],
      nextBlock: () => ({
        title: 'Grecia Clásica: Polis, Democracia Ateniense y Esparta',
        subject: 'Ciencias Sociales',
        type: 'study_session',
        durationMinutes: 45,
        daysAhead: 3,
        startTime: '17:00',
        notes: 'Leer páginas 48-52 del libro y hacer tabla comparativa entre el modelo ateniense y espartano.',
        teacherNotes: 'El centro ha abierto la unidad 3 tras completar las civilizaciones fluviales.',
        reason: 'topic_completed',
        notification: 'El centro educativo ha programado el inicio del Tema 3 (Grecia Clásica) en tu agenda escolar.'
      })
    },
    {
      gradeKey: '1eso',
      triggerKeywords: ['cronicas', 'lectura', 'vocabulario'],
      nextBlock: () => ({
        title: 'Past Simple Narrative: Writing a Short Story',
        subject: 'Inglés',
        type: 'assignment_due',
        durationMinutes: 35,
        daysAhead: 2,
        startTime: '16:00',
        notes: 'Redactar historia breve de 60 palabras usando verbos regulares e irregulares en pasado.',
        teacherNotes: 'Tarea semanal asignada en la clase de inglés de hoy por el Departamento de Lenguas Extranjeras.',
        reason: 'assignment_published',
        notification: 'El profesor de Inglés ha agendado la redacción de la historia corta semanal en tu calendario escolar.'
      })
    },

    // === 2º de Bachillerato (Preparación PAU) ===
    {
      gradeKey: '2batx',
      triggerKeywords: ['sintaxis', 'cpred', 'complementos', 'pau'],
      nextBlock: () => ({
        title: 'Práctica PAU: Valores de "Se" y Oraciones Subordinadas',
        subject: 'Lengua Castellana',
        type: 'study_session',
        durationMinutes: 50,
        daysAhead: 2,
        startTime: '17:00',
        notes: 'Análisis de 3 oraciones complejas de convocatorias PAU (2022-2024). Pruebas formales de pasiva refleja e impersonal.',
        teacherNotes: 'Directriz curricular PAU: Explicación de aula completada hoy. Practicar valores sintácticos de "se".',
        reason: 'topic_completed',
        notification: 'El Departamento de Lengua Castellana ha comunicado una nueva sesión preparatoria PAU.'
      })
    },
    {
      gradeKey: '2batx',
      triggerKeywords: ['constitucion', '1812', 'independencia', 'cadiz'],
      nextBlock: () => ({
        title: 'El Reinado de Fernando VII: Sexenio Absolutista y Trienio Liberal',
        subject: 'Historia de España',
        type: 'study_session',
        durationMinutes: 50,
        daysAhead: 2,
        startTime: '18:00',
        notes: 'Comentario obligatorio del Manifiesto de los Persas (1814) y esquema de las fases del reinado de Fernando VII.',
        teacherNotes: 'El profesor ha concluido el tema de las Cortes de Cádiz en clase y avanza a Fernando VII.',
        reason: 'topic_completed',
        notification: 'El profesor de Historia de España ha registrado en la plataforma escolar el avance de contenido curricular.'
      })
    },
    {
      gradeKey: '2batx',
      triggerKeywords: ['derivadas', 'derivada', 'tangente', 'optimizacion', 'optimización', 'calculo', 'cálculo', 'extremos'],
      nextBlock: () => ({
        title: 'Optimización y Extremos Relativos: Aplicación de Derivadas (PAU)',
        subject: 'Matemáticas II',
        type: 'study_session',
        durationMinutes: 55,
        daysAhead: 2,
        startTime: '16:30',
        notes: 'Resolución de problemas de optimización con funciones polinómicas y racionales de exámenes PAU.',
        teacherNotes: 'Ejercicios de cálculo de máximos y mínimos absolutos en intervalos cerrados trabajados hoy en clase.',
        reason: 'topic_completed',
        notification: 'El profesor de Matemáticas II ha programado ejercicios de optimización tras dominar la recta tangente.'
      })
    },
    {
      gradeKey: '2batx',
      triggerKeywords: ['platon', 'descartes', 'caverna', 'filosofia'],
      nextBlock: () => ({
        title: 'La Teoría del Conocimiento en Kant: Giro Copernicano e Ilustración (PAU)',
        subject: 'Filosofía',
        type: 'study_session',
        durationMinutes: 50,
        daysAhead: 3,
        startTime: '17:15',
        notes: 'Esquema de las preguntas kantianas: ¿Qué puedo saber?, ¿Qué debo hacer?, ¿Qué me cabe esperar?',
        teacherNotes: 'Tema 4 impartido en el aula de filosofía. Comparativa obligatoria con el empirismo de Hume.',
        reason: 'topic_completed',
        notification: 'El centro escolar ha programado el estudio de Kant tras concluir la unidad de Platón.'
      })
    },
    {
      gradeKey: '2batx',
      triggerKeywords: ['quimica', 'termodinamica', 'cinetica'],
      nextBlock: () => ({
        title: 'Equilibrio Químico: Principio de Le Chatelier y Cálculo de Kc/Kp',
        subject: 'Química',
        type: 'study_session',
        durationMinutes: 45,
        daysAhead: 2,
        startTime: '17:30',
        notes: 'Cálculo de cociente de reacción (Qc) y desplazamiento del equilibrio por efecto de temperatura y presión.',
        teacherNotes: 'Práctica de laboratorio finalizada. Resolver problemas 5 al 8 del boletín de Química.',
        reason: 'topic_completed',
        notification: 'El profesor de Química ha agendado la resolución de problemas de equilibrio químico tras la práctica de hoy.'
      })
    }
  ];

  /**
   * Mock colaborativo: Cuando el alumno marca un bloque como completado en la agenda,
   * la entidad educativa registra el avance y programa automáticamente el siguiente hito
   * correspondiente al contenido explicado por el profesor en clase.
   */
  public async checkAndTriggerCollaborativeProgression(
    completedBlock: StudyBlock
  ): Promise<InstitutionalTaskProgression | null> {
    if (!completedBlock.completed) return null;

    const gradeKey = completedBlock.gradeKey === '2batx' ? '2batx' : '1eso';
    const combinedText = `${completedBlock.title} ${completedBlock.subject} ${completedBlock.notes || ''}`.toLowerCase();

    // Buscar una regla aplicable para el curso y la materia completada
    const matchedRule = this.progressionRules.find(rule => {
      if (rule.gradeKey !== gradeKey) return false;
      return rule.triggerKeywords.some(keyword => combinedText.includes(keyword.toLowerCase()));
    });

    let generatedBlock: {
      title: string;
      subject: string;
      type: EventType;
      durationMinutes: number;
      daysAhead: number;
      startTime: string;
      notes: string;
      teacherNotes: string;
      reason: 'topic_completed' | 'exam_scheduled' | 'assignment_published';
      notification: string;
    };

    if (matchedRule) {
      generatedBlock = matchedRule.nextBlock();
    } else {
      // Fallback didáctico adaptativo para materias no pre-mapeadas
      generatedBlock = {
        title: `Consolidación Curricular: ${completedBlock.subject}`,
        subject: completedBlock.subject,
        type: 'study_session',
        durationMinutes: 40,
        daysAhead: 2,
        startTime: '17:00',
        notes: `El profesor ha registrado la finalización de los ejercicios de aula de ${completedBlock.subject}. Repaso activo recomendado.`,
        teacherNotes: 'Registrado desde la plataforma institucional escolar tras el fin de la sesión lectiva.',
        reason: 'topic_completed',
        notification: `El centro educativo ha registrado tu avance en ${completedBlock.subject} y ha agendado una sesión de consolidación.`
      };
    }

    // Verificar si esta tarea ya existe en IndexedDB para no duplicarla
    const existing = await db.studyBlocks
      .filter(b => b.title === generatedBlock.title && b.gradeKey === gradeKey)
      .first();

    if (existing) {
      return null;
    }

    const targetDate = new Date(Date.now() + 86400000 * generatedBlock.daysAhead).toISOString().split('T')[0];

    const newBlock: StudyBlock = {
      title: generatedBlock.title,
      subject: generatedBlock.subject,
      date: targetDate,
      startTime: generatedBlock.startTime,
      durationMinutes: generatedBlock.durationMinutes,
      type: generatedBlock.type,
      completed: false,
      gradeKey,
      notes: generatedBlock.notes,
      teacherNotes: generatedBlock.teacherNotes,
      origin: 'institutional',
      syncedWithGoogle: false
    };

    // Persistir el nuevo hito en IndexedDB
    await db.studyBlocks.add(newBlock);

    return {
      block: newBlock,
      notificationMessage: generatedBlock.notification,
      sourceSubject: generatedBlock.subject,
      reason: generatedBlock.reason
    };
  }

  /**
   * Obtiene la directriz curricular departamental según la asignatura y el grado del alumno conectado.
   * Mockea la API institucional escolar (Esfer@) según la arquitectura planteada en el Treball de Recerca.
   */
  public async getDepartmentalPrompt(
    subject: string,
    gradeKey: StudentGrade,
    topicKeyword = ''
  ): Promise<DepartmentalPromptResponse> {
    // Simulación de latencia de red de la API educativa
    await new Promise((resolve) => setTimeout(resolve, 80));

    const topic = promptOrchestratorService.findTopicBySubjectOrKeyword(subject, gradeKey, topicKeyword);

    return {
      subject: topic.subject,
      gradeKey,
      gradeLevel: gradeKey === '1eso' ? '1º de ESO (12 años)' : '2º de Bachillerato (17-18 años)',
      stageName: gradeKey === '1eso' ? 'Operaciones Concretas / Transición (Piaget)' : 'Operaciones Formales / Preuniversitario PAU (Piaget)',
      promptMarkdown: topic.markdownContent || '',
      institution: this.INSTITUTION_NAME,
      sourceApi: `${this.API_ENDPOINT}?subject=${encodeURIComponent(topic.subject)}&grade=${gradeKey}&topic=${encodeURIComponent(topic.id)}`,
      fetchedAt: new Date().toISOString()
    };
  }
}

export const educationalApiService = new EducationalApiService();


import type { StudentGrade } from '../types/auth';
import type { 
  PromptFunctionalRole, 
  AssembledPrompt, 
  AssembledAgendaPrompt,
  TopicContextDefinition, 
  ActivityDefinition, 
  PromptLayer 
} from '../types/prompts';
import { agendaPromptService } from './agenda-prompt';

// Carga eagerly de todos los archivos markdown de prompts en Vite
const promptFiles = import.meta.glob('../prompts/**/*.md', { 
  query: '?raw', 
  import: 'default', 
  eager: true 
}) as Record<string, string>;

function getFileContent(partialPath: string): string {
  const normalized = partialPath.replace(/\\/g, '/').toLowerCase();
  for (const [path, content] of Object.entries(promptFiles)) {
    if (path.replace(/\\/g, '/').toLowerCase().includes(normalized)) {
      return content as string;
    }
  }
  return '';
}

export class PromptOrchestratorService {
  private readonly TOPIC_DEFINITIONS: TopicContextDefinition[] = [
    // === 1º de ESO ===
    {
      id: 'topic_lengua_1eso',
      gradeKey: '1eso',
      subject: 'Lengua Castellana y Literatura',
      name: 'Sintaxis de la Oración Simple: Sujeto y Complemento Verbal',
      fileKey: 'nivel_2_centro_educativo/1eso/temas/lengua_sintaxis_oracion_simple.md',
      keyConcepts: ['Sujeto y Predicado', 'Verbo', 'Complemento Verbal (en bloque)'],
      pedagogicalNote: 'Estadio de Operaciones Concretas (Piaget): Identificación visual y holística del Sujeto y el Complemento Verbal en bloque ("locomotora y vagones"), sin clasificaciones abstractas prematuras.'
    },
    {
      id: 'topic_naturales_1eso',
      gradeKey: '1eso',
      subject: 'Ciencias Naturales',
      name: 'Ecosistemas y Cadenas Tróficas en el Bosque Mediterráneo',
      fileKey: 'nivel_2_centro_educativo/1eso/temas/naturales_ecosistemas_cadenas_troficas.md',
      keyConcepts: ['Biotopo y Biocenosis', 'Niveles Tróficos', 'Equilibrio Ecológico'],
      pedagogicalNote: 'Modelado intuitivo y visual de las relaciones interespecíficas y flujo de materia/energía a partir de observaciones directas del bosque mediterráneo.'
    },
    {
      id: 'topic_mates_1eso',
      gradeKey: '1eso',
      subject: 'Matemáticas',
      name: 'Fracciones y Operaciones Básicas en Problemas Cotidianos',
      fileKey: 'nivel_2_centro_educativo/1eso/temas/mates_fracciones_proporcionalidad.md',
      keyConcepts: ['Fracciones Equivalentes', 'Común Denominador', 'Reparto Proporcional'],
      pedagogicalNote: 'Aproximación geométrica y tangible al concepto de parte-todo y proporcionalidad antes de la abstracción algorítmica formal.'
    },
    {
      id: 'topic_sociales_1eso',
      gradeKey: '1eso',
      subject: 'Ciencias Sociales',
      name: 'Primeras Civilizaciones Fluviales: Mesopotamia y Egipto',
      fileKey: 'nivel_2_centro_educativo/1eso/temas/sociales_civilizaciones_fluviales.md',
      keyConcepts: ['El Río como Motor', 'Sociedad Jerarquizada', 'Escritura Cuneiforme/Jeroglífica'],
      pedagogicalNote: 'Causalidad histórica fundamental: comprensión del condicionamiento geográfico en la aparición de los primeros estados y códigos normativos.'
    },
    {
      id: 'topic_tutoria_1eso',
      gradeKey: '1eso',
      subject: 'Tutoría / Lectura',
      name: 'Comprensión Lectora y Deducción Léxica en Novela Juvenil',
      fileKey: 'nivel_2_centro_educativo/1eso/temas/tutoria_lectura_comprension.md',
      keyConcepts: ['Estructura Narrativa', 'Vocabulario por Contexto', 'Paráfrasis'],
      pedagogicalNote: 'Fomento del razonamiento inferencial y deducción léxica mediante el diálogo socrático guiado sin recurrir a definiciones pasivas.'
    },

    // === 2º de Bachillerato ===
    {
      id: 'topic_lengua_2batx',
      gradeKey: '2batx',
      subject: 'Lengua Castellana y Literatura',
      name: 'Tipología y Pruebas de Complementos Verbales (PAU)',
      fileKey: 'nivel_2_centro_educativo/2batx/temas/lengua_sintaxis_complementos_pau.md',
      keyConcepts: ['CPredicativo (concordancia)', 'CRV vs CC', 'Pruebas sintácticas PAU'],
      pedagogicalNote: 'Estadio de Operaciones Formales e Hipotético-Deductivas: Rigor filológico con pruebas morfosintácticas estrictas (concordancia, conmutación) para las PAU.'
    },
    {
      id: 'topic_historia_2batx',
      gradeKey: '2batx',
      subject: 'Historia de España',
      name: 'Crisis del Antiguo Régimen, Constitución de 1812 y Fernando VII',
      fileKey: 'nivel_2_centro_educativo/2batx/temas/historia_crisis_antiguo_regimen.md',
      keyConcepts: ['Cortes de Cádiz', 'Constitución de 1812', 'Manifiesto de los Persas'],
      pedagogicalNote: 'Análisis historiográfico dialéctico: contraste de textos y decretos originales bajo los criterios de rigor conceptual de las pruebas PAU.'
    },
    {
      id: 'topic_mates_2batx',
      gradeKey: '2batx',
      subject: 'Matemáticas II',
      name: 'Cálculo Diferencial: Derivadas, Recta Tangente y Optimización (PAU)',
      fileKey: 'nivel_2_centro_educativo/2batx/temas/mates_derivadas_optimizacion.md',
      keyConcepts: ['Reglas de Derivación', 'Ecuación de la Recta Tangente', 'Criterio de Primera y Segunda Derivada', 'Problemas de Optimización'],
      pedagogicalNote: 'Estadio de Operaciones Formales e Hipotético-Deductivas: Rigor analítico en la interpretación geométrica de la derivada como pendiente, deducción formal de extremos y modelización de problemas de optimización para las PAU.'
    },
    {
      id: 'topic_filosofia_2batx',
      gradeKey: '2batx',
      subject: 'Filosofía',
      name: 'Teoría del Conocimiento: Platón vs Descartes (PAU)',
      fileKey: 'nivel_2_centro_educativo/2batx/temas/filosofia_teoria_conocimiento_pau.md',
      keyConcepts: ['Mito de la Caverna', 'Duda Metódica y Cogito', 'Ideas Innatas'],
      pedagogicalNote: 'Pensamiento crítico y dialéctica epistemológica: formulación de tesis, antítesis y justificación argumentativa estructurada.'
    },
    {
      id: 'topic_quimica_2batx',
      gradeKey: '2batx',
      subject: 'Química',
      name: 'Termodinámica Química y Principio de Le Chatelier (PAU)',
      fileKey: 'nivel_2_centro_educativo/2batx/temas/quimica_termodinamica_equilibrio.md',
      keyConcepts: ['Entalpía y Entropía', 'Equilibrio Químico Kc/Kp', 'Le Chatelier'],
      pedagogicalNote: 'Predicción fisicoquímica cuantitativa y cualitativa del equilibrio ante perturbaciones en reactores cerrados.'
    },
    {
      id: 'topic_tecnologia_2batx',
      gradeKey: '2batx',
      subject: 'Ciencias y Tecnología',
      name: 'Transición Energética y Viabilidad de Eólica Marina en el Mediterráneo',
      fileKey: 'nivel_2_centro_educativo/2batx/temas/tecnologia_energias_renovables.md',
      keyConcepts: ['Eólica Marina Flotante', 'LCOE y Descarbonización', 'Impacto Ambiental'],
      pedagogicalNote: 'Pensamiento de ingeniería y sostenibilidad: análisis multidimensional de viabilidad técnica, energética y ambiental.'
    }
  ];

  private readonly ACTIVITY_DEFINITIONS: ActivityDefinition[] = [
    // === 1º ESO Lengua (Repetición con Variación) ===
    {
      id: 'act_lengua_1eso_1',
      topicId: 'topic_lengua_1eso',
      gradeKey: '1eso',
      subject: 'Lengua Castellana y Literatura',
      order: 1,
      title: 'Caso Base: "El tren llegó puntual a la estación"',
      sentenceOrCase: 'El tren llegó puntual a la estación.',
      variationType: 'Caso Base (Sujeto inicial + CV en bloque)',
      fileKey: 'nivel_2_centro_educativo/1eso/actividades/lengua_act_1_tren_puntual.md'
    },
    {
      id: 'act_lengua_1eso_2',
      topicId: 'topic_lengua_1eso',
      gradeKey: '1eso',
      subject: 'Lengua Castellana y Literatura',
      order: 2,
      title: 'Variación 1: Sujeto pospuesto ("Por la mañana sonó ruidosa la alarma")',
      sentenceOrCase: 'Por la mañana sonó ruidosa la alarma en el pasillo.',
      variationType: 'Variación de orden oracional (Sujeto pospuesto)',
      fileKey: 'nivel_2_centro_educativo/1eso/actividades/lengua_act_2_alarma_pospuesta.md'
    },
    {
      id: 'act_lengua_1eso_3',
      topicId: 'topic_lengua_1eso',
      gradeKey: '1eso',
      subject: 'Lengua Castellana y Literatura',
      order: 3,
      title: 'Variación 2: Plural y contexto ("Los jóvenes exploradores regresaron...")',
      sentenceOrCase: 'Los jóvenes exploradores regresaron cansados al campamento al anochecer.',
      variationType: 'Variación léxica y plural (Consolidación y transferencia)',
      fileKey: 'nivel_2_centro_educativo/1eso/actividades/lengua_act_3_exploradores_campamento.md'
    },

    // 1º ESO Otras materias
    {
      id: 'act_naturales_1eso_1',
      topicId: 'topic_naturales_1eso',
      gradeKey: '1eso',
      subject: 'Ciencias Naturales',
      order: 1,
      title: 'Maqueta de Ecosistemas y Cadenas Tróficas',
      sentenceOrCase: 'Diseño de maqueta de bosque mediterráneo con 4 niveles tróficos.',
      variationType: 'Proyecto Guiado de Aula',
      fileKey: 'nivel_2_centro_educativo/1eso/actividades/naturales_act_maqueta_biodiversidad.md'
    },
    {
      id: 'act_mates_1eso_1',
      topicId: 'topic_mates_1eso',
      gradeKey: '1eso',
      subject: 'Matemáticas',
      order: 1,
      title: 'Suma y Resta de Fracciones con Común Denominador',
      sentenceOrCase: 'Calcular: 3/8 + 7/8 - 2/8 y simplificar.',
      variationType: 'Cálculo Aritmético Visual',
      fileKey: 'nivel_2_centro_educativo/1eso/actividades/mates_act_suma_fracciones_comun.md'
    },
    {
      id: 'act_mates_1eso_2',
      topicId: 'topic_mates_1eso',
      gradeKey: '1eso',
      subject: 'Matemáticas',
      order: 2,
      title: 'Problema Cotidiano de Reparto Proporcional',
      sentenceOrCase: 'En una clase de 24 alumnos, 2/3 practican deporte y 1/6 música.',
      variationType: 'Variación Contextualizada (Transferencia)',
      fileKey: 'nivel_2_centro_educativo/1eso/actividades/mates_act_problema_reparto_proporcional.md'
    },
    {
      id: 'act_sociales_1eso_1',
      topicId: 'topic_sociales_1eso',
      gradeKey: '1eso',
      subject: 'Ciencias Sociales',
      order: 1,
      title: 'Mapa Histórico: Nilo y Tigris-Éufrates',
      sentenceOrCase: 'Localización del Creciente Fértil y función agrícola del limo fluvial.',
      variationType: 'Análisis Cartográfico y Causal',
      fileKey: 'nivel_2_centro_educativo/1eso/actividades/sociales_act_mapa_egipto_mesopotamia.md'
    },
    {
      id: 'act_tutoria_1eso_1',
      topicId: 'topic_tutoria_1eso',
      gradeKey: '1eso',
      subject: 'Tutoría / Lectura',
      order: 1,
      title: 'Ficha de Lectura y Deducción Léxica',
      sentenceOrCase: 'Resumen propio y deducción de vocabulario en contexto de novela juvenil.',
      variationType: 'Lectura Crítica y Vocabulario',
      fileKey: 'nivel_2_centro_educativo/1eso/actividades/tutoria_act_ficha_cronicas_juveniles.md'
    },

    // === 2º Bachillerato Lengua (Repetición con Variación) ===
    {
      id: 'act_lengua_2batx_1',
      topicId: 'topic_lengua_2batx',
      gradeKey: '2batx',
      subject: 'Lengua Castellana y Literatura',
      order: 1,
      title: 'Caso Base: CPred de Sujeto ("El tren llegó puntual a la estación")',
      sentenceOrCase: 'El tren llegó puntual a la estación.',
      variationType: 'Caso Base PAU (Prueba de concordancia con Sujeto)',
      fileKey: 'nivel_2_centro_educativo/2batx/actividades/lengua_act_1_cpred_sujeto_concordancia.md'
    },
    {
      id: 'act_lengua_2batx_2',
      topicId: 'topic_lengua_2batx',
      gradeKey: '2batx',
      subject: 'Lengua Castellana y Literatura',
      order: 2,
      title: 'Variación 1: CPred de CD ("El tribunal consideró inocente al acusado")',
      sentenceOrCase: 'El tribunal consideró inocente al acusado tras el juicio.',
      variationType: 'Variación de doble predicación (Concordancia con CD)',
      fileKey: 'nivel_2_centro_educativo/2batx/actividades/lengua_act_2_cpred_cd_acusado.md'
    },
    {
      id: 'act_lengua_2batx_3',
      topicId: 'topic_lengua_2batx',
      gradeKey: '2batx',
      subject: 'Lengua Castellana y Literatura',
      order: 3,
      title: 'Variación 2: Contraste Riguroso CPred vs CCM ("puntual" vs "puntualmente")',
      sentenceOrCase: 'El tren llegó puntual / puntualmente a la estación.',
      variationType: 'Contraejemplo Trampa (Adjetivo variable vs Adverbio invariable)',
      fileKey: 'nivel_2_centro_educativo/2batx/actividades/lengua_act_3_contraste_cpred_ccm.md'
    },

    // 2º Bachillerato Otras materias
    {
      id: 'act_historia_2batx_1',
      topicId: 'topic_historia_2batx',
      gradeKey: '2batx',
      subject: 'Historia de España',
      order: 1,
      title: 'Comentario Histórico: Manifiesto de los Persas (1814)',
      sentenceOrCase: 'Comentario guiado del fragmento absolutista de 1814 presentado a Fernando VII.',
      variationType: 'Comentario PAU de Fuente Primaria',
      fileKey: 'nivel_2_centro_educativo/2batx/actividades/historia_act_comentario_manifiesto_persas.md'
    },
    {
      id: 'act_mates_2batx_1',
      topicId: 'topic_mates_2batx',
      gradeKey: '2batx',
      subject: 'Matemáticas II',
      order: 1,
      title: 'Recta Tangente y Optimización con Derivadas (PAU)',
      sentenceOrCase: 'Calcular la recta tangente a f(x) = x³ - 3x² + 2 en x = 1 y justificar extremos relativos mediante f\'\'(x).',
      variationType: 'Problema Oficial PAU de Análisis y Cálculo Diferencial',
      fileKey: 'nivel_2_centro_educativo/2batx/actividades/mates_act_derivadas_optimizacion.md'
    },
    {
      id: 'act_filosofia_2batx_1',
      topicId: 'topic_filosofia_2batx',
      gradeKey: '2batx',
      subject: 'Filosofía',
      order: 1,
      title: 'Ensayo Comparativo: Caverna Platónica vs Genio Maligno',
      sentenceOrCase: 'Superación del engaño sensorial en Platón (anamnesis) y Descartes (cogito).',
      variationType: 'Redacción Contrastiva PAU',
      fileKey: 'nivel_2_centro_educativo/2batx/actividades/filosofia_act_comparativa_caverna_descartes.md'
    },
    {
      id: 'act_quimica_2batx_1',
      topicId: 'topic_quimica_2batx',
      gradeKey: '2batx',
      subject: 'Química',
      order: 1,
      title: 'Desplazamiento de Equilibrio por Presión y Temperatura (Haber-Bosch)',
      sentenceOrCase: 'Predicción razonada en síntesis de NH3 según Le Chatelier y termodinámica.',
      variationType: 'Problema Razonado PAU de Equilibrio Químico',
      fileKey: 'nivel_2_centro_educativo/2batx/actividades/quimica_act_calculo_le_chatelier_presion.md'
    },
    {
      id: 'act_tecnologia_2batx_1',
      topicId: 'topic_tecnologia_2batx',
      gradeKey: '2batx',
      subject: 'Ciencias y Tecnología',
      order: 1,
      title: 'Monografía: Viabilidad de Eólica Marina Flotante en el Mediterráneo',
      sentenceOrCase: 'Análisis de LCOE, batimetría y evacuación HVDC frente a costa valenciana y balear.',
      variationType: 'Monografía de Investigación Científica',
      fileKey: 'nivel_2_centro_educativo/2batx/actividades/tecnologia_act_monografia_solar_marina.md'
    }
  ];

  public getTopicsForGrade(gradeKey: StudentGrade): TopicContextDefinition[] {
    return this.TOPIC_DEFINITIONS
      .filter(t => t.gradeKey === gradeKey)
      .map(t => ({
        ...t,
        markdownContent: getFileContent(t.fileKey)
      }));
  }

  public getActivitiesForTopic(topicId: string): ActivityDefinition[] {
    return this.ACTIVITY_DEFINITIONS
      .filter(a => a.topicId === topicId)
      .map(a => ({
        ...a,
        markdownContent: getFileContent(a.fileKey)
      }))
      .sort((a, b) => a.order - b.order);
  }

  public findTopicById(topicId: string): TopicContextDefinition | undefined {
    const t = this.TOPIC_DEFINITIONS.find(item => item.id === topicId);
    if (!t) return undefined;
    return {
      ...t,
      markdownContent: getFileContent(t.fileKey)
    };
  }

  public findTopicBySubjectOrKeyword(subject: string, gradeKey: StudentGrade, keyword = ''): TopicContextDefinition {
    const gradeTopics = this.getTopicsForGrade(gradeKey);
    const subLower = subject.toLowerCase();
    const keyLower = keyword.toLowerCase();

    // 1. Intento por keyword en el nombre del tema
    if (keyLower) {
      const matchKey = gradeTopics.find(t => 
        t.name.toLowerCase().includes(keyLower) || 
        t.keyConcepts.some(c => c.toLowerCase().includes(keyLower))
      );
      if (matchKey) return matchKey;
    }

    // 2. Intento por materia
    const matchSubject = gradeTopics.find(t => 
      t.subject.toLowerCase().includes(subLower) || 
      subLower.includes(t.subject.toLowerCase())
    );
    if (matchSubject) return matchSubject;

    // 3. Fallback: primer tema del grado (Lengua)
    return gradeTopics[0];
  }

  public findActivityById(activityId: string): ActivityDefinition | undefined {
    const act = this.ACTIVITY_DEFINITIONS.find(a => a.id === activityId);
    if (!act) return undefined;
    return {
      ...act,
      markdownContent: getFileContent(act.fileKey)
    };
  }

  /**
   * Grafo de Fabricación Dinámica:
   * Ensambla el System Instruction combinando de manera estricta y modular:
   * 1. Nivel 1: Funcional (Tutor Socrático, Planificador, etc.)
   * 2. Nivel 3: Marco Regulador Ético y Criterios LOMLOE de Etapa
   * 3. Nivel 2.A: Contexto Temático de Línea Base (La teoría y reglas del departamento)
   * 4. Nivel 2.B: Foco Específico de la Actividad (La variación actual, objetivos y rúbrica)
   */
  public assemblePrompt(params: {
    role: PromptFunctionalRole;
    gradeKey: StudentGrade;
    subject?: string;
    topicId?: string;
    activityId?: string;
  }): AssembledPrompt {
    const { role, gradeKey } = params;

    // 1. Resolver Nivel 1: Funcional
    const functionalFile = 
      role === 'agenda' ? 'nivel_1_funcional/agenda_planner.md' :
      role === 'project' ? 'nivel_1_funcional/project_guide.md' :
      role === 'recall' ? 'nivel_1_funcional/active_recall_generator.md' :
      'nivel_1_funcional/socratic_tutor.md';
    
    const functionalContent = getFileContent(functionalFile);
    const functionalLayer: PromptLayer = {
      level: 'level1',
      badge: 'Nivel 1: Funcional',
      title: role === 'agenda' ? 'Planificador de Agenda' :
             role === 'project' ? 'Mentor de Trabajos' :
             role === 'recall' ? 'Generador de Active Recall' :
             'Tutor Socrático Inteligente',
      subtitle: 'Metodología pedagógica y guardrails no negociables',
      source: `src/prompts/${functionalFile}`,
      content: functionalContent
    };

    // 2. Resolver Nivel 3: Marco Regulador y Ético
    const ethicalContent = getFileContent('nivel_3_regulador/etica_y_principios_ia.md');
    const stageCriteriaFile = gradeKey === '2batx' 
      ? 'nivel_3_regulador/criterios_generales_2batx.md' 
      : 'nivel_3_regulador/criterios_generales_1eso.md';
    const stageCriteriaContent = getFileContent(stageCriteriaFile);
    
    const combinedRegulatory = `${ethicalContent}\n\n---\n\n${stageCriteriaContent}`.trim();
    const regulatoryLayer: PromptLayer = {
      level: 'level3',
      badge: 'Nivel 3: Marco Regulador',
      title: gradeKey === '2batx' ? 'Criterios Preuniversitarios (PAU) y Ética de la IA' : 'Criterios LOMLOE (1º ESO) y Ética de la IA',
      subtitle: 'Ministerio de Educación / Deontología de Inteligencia Artificial',
      source: 'src/prompts/nivel_3_regulador/',
      content: combinedRegulatory
    };

    // 3. Resolver Nivel 2.A: Contexto Temático de Línea Base
    let topic: TopicContextDefinition;
    if (params.topicId) {
      topic = this.findTopicById(params.topicId) || this.findTopicBySubjectOrKeyword(params.subject || 'Lengua', gradeKey);
    } else {
      topic = this.findTopicBySubjectOrKeyword(params.subject || 'Lengua', gradeKey);
    }

    const baseTopicContent = topic.markdownContent || getFileContent(topic.fileKey);
    const baseTopicLayer: PromptLayer = {
      level: 'level2A',
      badge: 'Nivel 2.A: Línea Base Temática',
      title: topic.name,
      subtitle: `${topic.subject} • ${gradeKey === '2batx' ? '2º de Bachillerato' : '1º de ESO'}`,
      source: `src/prompts/${topic.fileKey}`,
      content: baseTopicContent
    };

    // 4. Resolver Nivel 2.B: Foco de la Actividad Activa (Variación)
    const availableActivities = this.getActivitiesForTopic(topic.id);
    let activity: ActivityDefinition | undefined;
    if (params.activityId) {
      activity = this.findActivityById(params.activityId) || availableActivities[0];
    } else if (availableActivities.length > 0) {
      activity = availableActivities[0];
    }

    let activityLayer: PromptLayer | undefined;
    if (activity) {
      const actContent = activity.markdownContent || getFileContent(activity.fileKey);
      activityLayer = {
        level: 'level2B',
        badge: 'Nivel 2.B: Tarea y Variación',
        title: activity.title,
        subtitle: `Variación: ${activity.variationType}`,
        source: `src/prompts/${activity.fileKey}`,
        content: actContent
      };
    }

    // 5. Ensamblado Sintético Estructurado por Secciones
    const systemInstruction = `
${functionalLayer.content}

---
=== [MARCO REGULADOR Y DEONTOLÓGICO - NIVEL 3] ===
${regulatoryLayer.content}
==================================================

---
=== [DIRECTRIZ Y LÍNEA BASE TEMÁTICA - NIVEL 2.A] ===
Materia: ${topic.subject}
Tema Base: ${topic.name}
${baseTopicLayer.content}
======================================================

${activityLayer ? `
---
=== [FOCO DE LA ACTIVIDAD CONCRETA Y VARIACIÓN - NIVEL 2.B] ===
Actividad: ${activityLayer.title}
Tipo de Variación: ${activity?.variationType || 'Caso de Estudio'}
${activityLayer.content}
================================================================
` : ''}

CONTEXTO DINÁMICO DE EJECUCIÓN:
- Grado del Estudiante: ${gradeKey === '2batx' ? '2º de Bachillerato (17-18 años - PAU)' : '1º de ESO (12 años - Operaciones Concretas)'}
- Asignatura: ${topic.subject}
- Tema Curricular Activo: ${topic.name}
${activity ? `- Actividad Específica en Curso: ${activity.title} ("${activity.sentenceOrCase}")` : ''}
`.trim();

    return {
      role,
      gradeKey,
      subject: topic.subject,
      topicId: topic.id,
      topicName: topic.name,
      activityId: activity?.id,
      activityTitle: activity?.title,
      systemInstruction,
      layers: {
        level1Functional: functionalLayer,
        level3Regulatory: regulatoryLayer,
        level2BaseTopic: baseTopicLayer,
        level2SpecificActivity: activityLayer
      }
    };
  }

  /**
   * Delega el ensamblado de la arquitectura propia del prompt de Agenda
   * a su servicio especializado sin acoplar temas socráticos individuales.
   */
  public assembleAgendaPrompt(gradeKey: StudentGrade = '1eso'): AssembledAgendaPrompt {
    return agendaPromptService.assembleAgendaPrompt(gradeKey);
  }
}

export const promptOrchestratorService = new PromptOrchestratorService();

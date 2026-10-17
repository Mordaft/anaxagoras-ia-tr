import type { StudentGrade } from '../types/auth';
import type { AgendaPromptPillar, AssembledAgendaPrompt } from '../types/prompts';

// Carga eager de los ficheros markdown de la carpeta prompts
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

export class AgendaPromptService {
  /**
   * Ensambla el prompt propio y especializado de la Agenda.
   * Estructura desacoplada e independiente del modelo temático socrático de asignaturas:
   * 1. Distribución Homogénea del Tiempo (prevención de fatiga, descansos y límite diario)
   * 2. Ordenación por Prioridad y Balance (interleaving y ponderación multivariable)
   * 3. Fechas de Compromiso (backward planning para exámenes y entregas con cuenta atrás)
   * 4. Adaptabilidad Dinámica, Novedades Docentes y Persistencia Local
   */
  public assembleAgendaPrompt(gradeKey: StudentGrade = '1eso'): AssembledAgendaPrompt {
    const isBatx = gradeKey === '2batx';
    const gradeLabel = isBatx ? '2º de Bachillerato (PAU)' : '1º de ESO';

    // 1. Cargar los 4 Pilares Modulares
    const pilar1Content = getFileContent('agenda/1_distribucion_homogenea.md');
    const pilar2Content = getFileContent('agenda/2_orden_prioridad.md');
    const pilar3Content = getFileContent('agenda/3_fechas_compromiso.md');
    const pilar4Content = getFileContent('agenda/4_adaptabilidad_ocio.md');
    const masterContent = getFileContent('agenda/agenda_planner_master.md');

    const timeDistributionPillar: AgendaPromptPillar = {
      id: 'time_distribution',
      badge: 'Pilar 1: Distribución Homogénea',
      title: 'Distribución Homogénea del Tiempo y Carga Cognitiva',
      subtitle: `Práctica espaciada, límite diario (${isBatx ? '90-135 min' : '45-75 min'}) y blindaje del ocio`,
      source: 'src/prompts/agenda/1_distribucion_homogenea.md',
      content: pilar1Content
    };

    const priorityOrderPillar: AgendaPromptPillar = {
      id: 'priority_order',
      badge: 'Pilar 2: Ordenación por Prioridad',
      title: 'Ordenación por Prioridad y Alternancia Cognitiva (Interleaving)',
      subtitle: 'Ponderación según dificultad relativa, balance de materias y avance de tareas',
      source: 'src/prompts/agenda/2_orden_prioridad.md',
      content: pilar2Content
    };

    const commitmentDeadlinesPillar: AgendaPromptPillar = {
      id: 'commitment_deadlines',
      badge: 'Pilar 3: Fechas de Compromiso',
      title: 'Fechas de Compromiso: Exámenes y Entregas de Trabajos',
      subtitle: 'Planificación retrospectiva (Backward Planning) con cuenta atrás de vencimiento',
      source: 'src/prompts/agenda/3_fechas_compromiso.md',
      content: pilar3Content
    };

    const adaptiveFlexibilityPillar: AgendaPromptPillar = {
      id: 'adaptive_flexibility',
      badge: 'Pilar 4: Adaptabilidad y Formato',
      title: 'Adaptabilidad Dinámica, Novedades Docentes (+1d) y JSON Local',
      subtitle: 'Flexibilidad ante imprevistos, escucha empática y persistencia en IndexedDB',
      source: 'src/prompts/agenda/4_adaptabilidad_ocio.md',
      content: pilar4Content
    };

    // 2. Ensamblado Sintético Propio de la Agenda
    const systemInstruction = `
${masterContent}

---
=== [PILAR 1: DISTRIBUCIÓN HOMOGÉNEA DEL TIEMPO Y PROTECCIÓN DEL DESCANSO] ===
${pilar1Content}
=============================================================================

---
=== [PILAR 2: ORDENACIÓN MULTIVARIABLE POR PRIORIDAD E INTERLEAVING] ===
${pilar2Content}
========================================================================

---
=== [PILAR 3: GESTIÓN DE FECHAS DE COMPROMISO (EXÁMENES Y ENTREGAS)] ===
${pilar3Content}
=======================================================================

---
=== [PILAR 4: ADAPTABILIDAD, RESPUESTA EMPÁTICA Y FORMATO DE EMISIÓN] ===
${pilar4Content}
=========================================================================

CONTEXTO INSTITUCIONAL DE ETAPA DEL ESTUDIANTE:
- Curso Académico: ${gradeLabel}
- Límite diario vespertino aconsejado: ${isBatx ? 'Máximo 135 minutos repartidos en 2-3 bloques de 45 min' : 'Máximo 75 minutos repartidos en 1-2 bloques de 45 min'}
- Tiempo de descanso y ocio protegido tras las 15:00: Mínimo 3.5 a 4 horas libres para desconexión y deporte
- Compromisos prioritarios: Atender de forma preferente hitos con vencimiento inferior a 72 horas.
`.trim();

    return {
      role: 'agenda',
      gradeKey,
      title: `Planificador Neuroeducativo de Agenda (${gradeLabel})`,
      subtitle: 'Distribución homogénea, ordenación por prioridad y gestión de compromisos (exámenes y entregas)',
      systemInstruction,
      pillars: {
        timeDistribution: timeDistributionPillar,
        priorityOrder: priorityOrderPillar,
        commitmentDeadlines: commitmentDeadlinesPillar,
        adaptiveFlexibility: adaptiveFlexibilityPillar
      }
    };
  }

  /**
   * Directriz Curricular Departamental sobre Deberes, Gestión del Tiempo y Conciliación
   */
  public getCurricularDirective(gradeKey: StudentGrade = '1eso'): { title: string; subtitle: string; content: string; institution: string; sourceApi: string } {
    const isBatx = gradeKey === '2batx';
    if (isBatx) {
      return {
        title: 'Directriz Curricular sobre Gestión del Tiempo, Preparación PAU y Prevención del Burnout',
        subtitle: 'Departament d\'Educació / Coordinació de les Proves d\'Accés a la Universitat (2º de Batxillerat)',
        institution: 'Consell Interuniversitari de Catalunya & Departament d\'Educació',
        sourceApi: 'https://api.educacio.gencat.cat/v1/agenda/directrius?curs=2batx',
        content: `
# 🏛️ Directriu Departamental: Gestió del Temps i Preparació Equilibrada per a les PAU
*Nivell: 2n de Batxillerat (17-18 anys)*

## 1. Objectius de Conciliació i Rendiment Acadèmic
1. **Prevenció del Burnout Estudiantil:**
   - La preparació de les PAU requereix una distribució constant i sostinguda de l'esforç, evitant l'acumulació de sessions intensives els dies previs als exàmens.
   - Es recomana una dedicació màxima d'estudi autònom de **90 a 135 minuts diaris** fora de l'horari lectiu escolar, distribuïts en blocs de 45 minuts.

2. **Planificació Retrospectiva per a les Proves:**
   - Tot examen o simulacre PAU ha de comptar amb una finestra de preparació espaiada d'entre 5 i 7 dies d'antelació.
   - Les tasques de redacció i treballs de recerca han de lliurar-se amb un marge de revisió d'almenys 24 hores respecte a la data límit.

3. **Garantia del Descans Neurocognitiu:**
   - Està estrictament desaconsellat estudiar més enllà de les 22:30 hores per protegir la fase REM del son, fonamental per a la consolidació de la memòria a llarg termini.
   - Cal reservar almenys un dia complet del cap de setmana amb descans total d'estudi.
`.trim()
      };
    }

    return {
      title: 'Directriz Curricular sobre Deberes Escolares, Conciliación Familiar y Descanso',
      subtitle: 'Departament d\'Educació / Marc LOMLOE sobre Hàbits d\'Estudi en l\'Educació Secundària Obligatòria',
      institution: 'Departament d\'Educació de la Generalitat de Catalunya',
      sourceApi: 'https://api.educacio.gencat.cat/v1/agenda/directrius?curs=1eso',
      content: `
# 🏛️ Directriu Departamental sobre Deures Escolars i Protecció del Temps d'Oci
*Nivell: 1r d'Educació Secundària Obligatòria (12 anys)*

## 1. Criteris Normatius de Racionalització del Temps d'Estudi
1. **Límit de Càrrega Diària Extraescolar:**
   - En concordança amb les recomanacions de l'Organització Mundial de la Salut (OMS) i el Departament d'Educació, la càrrega diària de deures i repàs no ha de superar els **45 a 60 minuts diaris** a 1r d'ESO.
   - Els deures han de ser una eina d'afiançament autònom i mai una prolongació de la jornada escolar.

2. **Diferenciació d'Activitats i Compromisos:**
   - Els exàmens han d'avisar-se amb un mínim de 5 dies hàbils per permetre un repàs progressiu i evitar l'ansietat escolar.
   - Els lliuraments de feines escolars han de disposar de pautes clares de planificació per fases.

3. **Protecció de la Desconnexió Digital i Oci Familiar:**
   - La tarda posterior a les classes ha de garantir temps lliure per a la pràctica d'activitat física, el joc i la convivència familiar.
   - A partir de les 21:00 hores es recomana la desconnexió completa de pantalles per afavorir el ritme circadià.
`.trim()
    };
  }
}

export const agendaPromptService = new AgendaPromptService();

import { aiClientService, STATIC_PROMPTS } from '../../services/ai-client';
import { googleAuthService } from '../../services/google-auth';
import { promptOrchestratorService } from '../../services/prompt-orchestrator';
import { renderPromptViewerModal } from '../modals/prompt-viewer-modal';
import { formatMathInText, renderMathCard } from '../common/math-expression';
import { t } from '../../services/i18n';
import type { ChatMessage } from '../../types/study';
import type { TopicContextDefinition, ActivityDefinition } from '../../types/prompts';

interface StudyTaskSession {
  topicId: string;
  status: 'pending' | 'active' | 'paused';
  selectedActivityId: string;
  messages: ChatMessage[];
  flashcardConcept?: string;
  flashcardExplanation?: string;
  flashcardRevealed: boolean;
  lastActiveAt?: Date;
}

// Module-level persistent task sessions map (preserves chat and work done across pauses and tab changes)
const taskSessions = new Map<string, StudyTaskSession>();

function getSubjectIcon(subject: string): string {
  if (subject.includes('Lengua')) return '📖';
  if (subject.includes('Naturales') || subject.includes('Ciencias')) return '🌿';
  if (subject.includes('Matemáticas') || subject.includes('Mates')) return '📐';
  if (subject.includes('Sociales') || subject.includes('Historia')) return '🏛️';
  if (subject.includes('Filosofía')) return '🧠';
  if (subject.includes('Química')) return '🧪';
  if (subject.includes('Tecnología')) return '⚙️';
  if (subject.includes('Tutoría') || subject.includes('Lectura')) return '📚';
  return '💡';
}

function getSubjectBadgeClass(subject: string): string {
  if (subject.includes('Lengua')) return 'bg-cyan-50 text-cyan-700 border border-cyan-200';
  if (subject.includes('Naturales') || subject.includes('Química')) return 'bg-emerald-50 text-emerald-700 border border-emerald-200';
  if (subject.includes('Matemáticas') || subject.includes('Mates')) return 'bg-indigo-50 text-indigo-700 border border-indigo-200';
  if (subject.includes('Sociales') || subject.includes('Historia') || subject.includes('Filosofía')) return 'bg-amber-50 text-amber-800 border border-amber-200';
  if (subject.includes('Tutoría') || subject.includes('Lectura')) return 'bg-purple-50 text-purple-700 border border-purple-200';
  return 'bg-slate-100 text-slate-700 border border-slate-200';
}

function getInitialMessage(topic: TopicContextDefinition, activity?: ActivityDefinition): ChatMessage {
  const isLengua = topic.subject.includes('Lengua');
  const isBatx = topic.gradeKey === '2batx';

  let content = `¡Hola! Soy tu tutor socrático en **${topic.subject}** (*${topic.name}*).\n\nAquí no te daré soluciones directas, sino que exploraremos juntos los conceptos paso a paso para que tu cerebro construya conexiones reales.\n\n`;

  if (activity) {
    content += `🎯 **Reto activo:** *${activity.title}*\n*"${activity.sentenceOrCase}"*\n\n¿Por dónde te gustaría empezar a razonarlo?`;
  } else {
    content += `¿Qué duda o ejercicio estás abordando ahora mismo?`;
  }

  let suggestedPrompts = [
    'No sé cómo empezar el ejercicio',
    'Tengo dudas con el primer paso',
    'Quiero repasar la teoría básica'
  ];

  if (isLengua && !isBatx) {
    if (activity?.order === 2) {
      content = `¡Hola Marc! Pasamos a la **Variación 1** de sintaxis oracional: 🚂🔄\n\nFíjate en esta oración: *"Por la mañana sonó ruidosa la alarma en el pasillo"*\n\nAquí el orden ha cambiado y la oración no empieza por el sujeto. ¿Qué palabra realiza la acción y con cuál concuerda el verbo *sonó*?`;
      suggestedPrompts = [
        'El sujeto es "la alarma", concuerda con "sonó"',
        '¿Por qué "Por la mañana" no es el sujeto?',
        '¿Qué forma el complemento verbal en bloque?'
      ];
    } else if (activity?.order === 3) {
      content = `¡Excelente avance Marc! Vamos con la **Variación 2** (Transferencia a contexto narrativo): 🎒🌲\n\nOración: *"Los jóvenes exploradores regresaron cansados al campamento al anochecer"*\n\n¿Quién es el sujeto plural y qué palabras acompañan al verbo *regresaron* explicando cómo y hacia dónde se mueven?`;
      suggestedPrompts = [
        'El sujeto es "Los jóvenes exploradores"',
        'El complemento verbal es "cansados al campamento al anochecer"',
        '¿Por qué no separamos los tipos de complementos?'
      ];
    } else {
      content = `¡Hola, Marc! Soy tu tutor socrático en **Lengua Castellana (1º de ESO)**. 🚂✨\n\nEn 1º de ESO aprenderemos a identificar el sujeto, el verbo y el **Complemento Verbal** en bloque, sin agobiarnos con clasificaciones abstractas.\n\nPor ejemplo, en la oración: *"El tren llegó puntual a la estación"*, ¿quién realiza la acción y qué palabras acompañan al verbo para completar la idea?`;
      suggestedPrompts = [
        'El sujeto es "El tren" y el verbo "llegó"',
        '¿Qué palabras forman el complemento verbal?',
        '¿Cómo distingo el sujeto del predicado?'
      ];
    }
  } else if (isLengua && isBatx) {
    if (activity?.order === 2) {
      content = `¡Hola Álvaro! Abordamos la **Variación 1** (Doble predicación sobre el CD - PAU): 🎓⚖️\n\nOración: *"El tribunal consideró inocente al acusado tras el juicio"*\n\nAquí el adjetivo *inocente* no se refiere al sujeto (*El tribunal*), sino al CD (*al acusado*). ¿Qué prueba sintáctica formal demuestra la concordancia entre el CD y el Complemento Predicativo?`;
      suggestedPrompts = [
        'Si fuera plural: "consideró inocentes a los acusados"',
        '¿Cómo demuestro que "al acusado" es CD?',
        '¿Por qué no es una oración atributiva?'
      ];
    } else if (activity?.order === 3) {
      content = `¡Hola Álvaro! Desafío de **Variación 2** (Contraste formal CPred vs CCM): 🎓🔍\n\nCompara estas dos oraciones de examen PAU:\n- A: *"El tren llegó puntual a la estación."*\n- B: *"El tren llegó puntualmente a la estación."*\n\n¿Qué prueba morfosintáctica demuestra que en A tenemos un CPred y en B un CC de Modo?`;
      suggestedPrompts = [
        '"Puntual" concuerda en plural; "puntualmente" es invariable',
        '¿Por qué un adjetivo no puede ser CCM según la RAE?',
        '¿Qué función tiene "a la estación" en ambas?'
      ];
    } else {
      content = `¡Hola, Álvaro! Soy tu tutor socrático en **Lengua Castellana (2º de Bachillerato - Preparación PAU)**. 🎓📚\n\nEn este nivel analizamos la sintaxis con rigor gramatical: es obligatorio clasificar la tipología exacta de cada complemento verbal y demostrarlo con pruebas formales.\n\nConsidera la oración: *"El tren llegó puntual a la estación"*. ¿Por qué 'puntual' no puede ser un CC de Modo y qué prueba sintáctica demuestra que es un **Complemento Predicativo (CPred)**?`;
      suggestedPrompts = [
        '"Puntual" concuerda con el sujeto en género y número',
        '¿Y qué función sintáctica tiene "a la estación"?',
        '¿Cómo distingo un CPred de un Atributo?'
      ];
    }
  }

  return {
    id: `msg_welcome_${Date.now()}`,
    role: 'tutor',
    content,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    isSocraticQuestion: true,
    suggestedPrompts
  };
}

function getDefaultFlashcardData(topic: TopicContextDefinition, currentGrade: string): { concept: string; explanation: string } {
  if (topic.subject.includes('Lengua')) {
    if (currentGrade === '1eso') {
      return {
        concept: 'En 1º de ESO, ¿cómo identificamos el Complemento Verbal en "El tren llegó puntual a la estación"?',
        explanation: 'En 1º de ESO se identifica "puntual a la estación" en bloque como Complemento Verbal (CV) sin exigir clasificar subtipos.'
      };
    } else {
      return {
        concept: 'En 2º de Bachillerato, ¿qué prueba sintáctica demuestra que "puntual" es CPred y no CCM?',
        explanation: 'La prueba de concordancia: "puntual" varía con el sujeto ("Las locomotoras llegaron puntuales"), rasgo exclusivo del CPred.'
      };
    }
  }
  return {
    concept: `¿Cómo definirías la idea clave o causa fundamental de ${topic.name}?`,
    explanation: `Comprender los principios de ${topic.name} articulando sus conceptos base: ${topic.keyConcepts.join(', ')}.`
  };
}

export function renderStudyView(container: HTMLElement): void {
  const auth = googleAuthService.getState();
  const currentGrade = auth.user?.gradeKey || '1eso';
  const currentStudent = auth.user;

  // Obtener temas curriculares del grado actual mediante el orquestador
  const availableTopics: TopicContextDefinition[] = promptOrchestratorService.getTopicsForGrade(currentGrade);

  // Asegurar que cada tema tiene una sesión en memoria
  availableTopics.forEach(topic => {
    if (!taskSessions.has(topic.id)) {
      const activities = promptOrchestratorService.getActivitiesForTopic(topic.id);
      const defaultCard = getDefaultFlashcardData(topic, currentGrade);
      taskSessions.set(topic.id, {
        topicId: topic.id,
        status: 'pending',
        selectedActivityId: activities[0]?.id || '',
        messages: [],
        flashcardConcept: defaultCard.concept,
        flashcardExplanation: defaultCard.explanation,
        flashcardRevealed: false
      });
    }
  });

  function getSession(topicId: string): StudyTaskSession {
    let session = taskSessions.get(topicId);
    if (!session) {
      const topic = availableTopics.find(t => t.id === topicId) || availableTopics[0];
      const activities = promptOrchestratorService.getActivitiesForTopic(topic.id);
      const defaultCard = getDefaultFlashcardData(topic, currentGrade);
      session = {
        topicId: topic.id,
        status: 'pending',
        selectedActivityId: activities[0]?.id || '',
        messages: [],
        flashcardConcept: defaultCard.concept,
        flashcardExplanation: defaultCard.explanation,
        flashcardRevealed: false
      };
      taskSessions.set(topicId, session);
    }
    return session;
  }

  function startTask(topicId: string): void {
    // Regla estricta: Solo puede haber UNA tarea activa.
    // Si selecciono iniciar otra tarea, la anterior pasa a 'paused' (En pausa) plegándose.
    for (const [id, session] of taskSessions.entries()) {
      if (id !== topicId && session.status === 'active') {
        session.status = 'paused';
      }
    }

    const session = getSession(topicId);
    session.status = 'active';
    session.lastActiveAt = new Date();

    // Inicializar mensaje del tutor si es la primera vez que se inicia
    if (session.messages.length === 0) {
      const topic = availableTopics.find(t => t.id === topicId);
      if (topic) {
        const activities = promptOrchestratorService.getActivitiesForTopic(topic.id);
        const activity = activities.find(a => a.id === session.selectedActivityId) || activities[0];
        session.messages = [getInitialMessage(topic, activity)];
      }
    }

    render();

    // Scroll suave a la tarea recién desplegada
    requestAnimationFrame(() => {
      const el = container.querySelector(`#task-card-${topicId}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  }

  function pauseTask(topicId: string): void {
    const session = getSession(topicId);
    session.status = 'paused';
    render();
  }

  function selectActivity(topicId: string, activityId: string): void {
    const session = getSession(topicId);
    session.selectedActivityId = activityId;
    const topic = availableTopics.find(t => t.id === topicId);
    if (topic) {
      const activities = promptOrchestratorService.getActivitiesForTopic(topic.id);
      const act = activities.find(a => a.id === activityId);
      if (act) {
        // Enviar mensaje de bienvenida socrático a la nueva variación
        const transitionMsg: ChatMessage = {
          id: `msg_var_${Date.now()}`,
          role: 'tutor',
          content: `🎯 **Activitat actualitzada a ${act.title}:**\n*"${act.sentenceOrCase}"*\n\n¿Por dónde empezamos a analizar esta nueva variación?`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isSocraticQuestion: true,
          suggestedPrompts: [
            '¿Qué cambia respecto al paso anterior?',
            'Identifiquemos el sujeto y el verbo primero',
            'Dame una pista sobre este reto'
          ]
        };
        session.messages.push(transitionMsg);
      }
    }
    render();
  }

  async function sendUserMessage(topicId: string, text: string): Promise<void> {
    const session = getSession(topicId);
    const topic = availableTopics.find(t => t.id === topicId);
    if (!topic) return;

    const userMsg: ChatMessage = {
      id: `msg_u_${Date.now()}`,
      role: 'student',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    session.messages.push(userMsg);
    render();

    const sendBtn = container.querySelector(`#btn-send-message-${topicId}`);
    if (sendBtn) sendBtn.innerHTML = `<span>⏳</span>`;

    const response = await aiClientService.generateSocraticResponse(
      text,
      topic.subject,
      topic.id,
      session.messages,
      session.selectedActivityId
    );

    session.messages.push(response);
    render();
  }

  function renderMessageBubble(msg: ChatMessage): string {
    const isTutor = msg.role === 'tutor';
    return `
      <div class="flex gap-3 ${isTutor ? 'items-start' : 'items-start flex-row-reverse'}">
        <div class="w-8 h-8 rounded-xl flex items-center justify-center text-sm flex-shrink-0 ${
          isTutor ? 'bg-brand-500 text-white shadow-md shadow-brand-500/25' : 'bg-slate-800 text-white'
        }">
          ${isTutor ? '🧠' : '👤'}
        </div>

        <div class="max-w-[85%] space-y-1.5">
          <div class="p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
            isTutor
              ? 'bg-slate-100 text-slate-800 rounded-tl-sm border border-slate-200/60'
              : 'bg-brand-600 text-white rounded-tr-sm shadow-md shadow-brand-500/10'
          }">
            <div class="prose prose-sm max-w-none">
              ${formatMarkdownText(msg.content)}
            </div>
          </div>

          <div class="flex items-center gap-2 text-[10px] text-slate-400 ${isTutor ? 'pl-1' : 'justify-end pr-1'}">
            <span>${isTutor ? t('study.tutorRole') : t('study.userRole')}</span>
            <span>•</span>
            <span>${msg.timestamp}</span>
          </div>
        </div>
      </div>
    `;
  }

  function formatMarkdownText(text: string): string {
    const formatted = text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n\n/g, '<br/><br/>')
      .replace(/\n/g, '<br/>');
    return formatMathInText(formatted);
  }

  function render(): void {
    const activeSession = Array.from(taskSessions.values()).find(s => s.status === 'active');
    const activeTopic = activeSession ? availableTopics.find(t => t.id === activeSession.topicId) : null;

    container.innerHTML = `
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        <!-- Section Header (Consistent with Tasks/Projects view) -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div class="flex items-center gap-2 flex-wrap">
              <h2 class="text-xl font-display font-bold text-slate-900">
                ${t('study.taskListTitle')}
              </h2>
              <span class="text-xs px-2.5 py-0.5 rounded-full ${
                currentGrade === '1eso' 
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                  : 'bg-purple-100 text-purple-800 border border-purple-300'
              } font-bold">
                ${currentStudent?.name || 'Estudiant'} • ${currentStudent?.gradeLevel || (currentGrade === '2batx' ? '2º Batx PAU' : '1º de ESO')}
              </span>
              ${
                activeTopic
                  ? `<span class="text-xs px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-300 font-semibold flex items-center gap-1.5">
                       <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                       <span>1 ${t('study.activeBadge')}: ${activeTopic.subject}</span>
                     </span>`
                  : `<span class="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200 font-semibold">
                       ${t('study.statusPaused')} / ${t('study.statusPending')}
                     </span>`
              }
            </div>
            <p class="text-xs text-slate-500 mt-1">${t('study.taskListSubtitle')}</p>
          </div>

          <div class="flex items-center gap-2 flex-wrap self-start sm:self-auto">
            <span class="text-xs px-3 py-1.5 rounded-2xl bg-brand-50 text-brand-700 border border-brand-200 font-semibold flex items-center gap-1">
              <span>🛡️</span>
              <span>${t('study.safeMode')}</span>
            </span>
          </div>
        </div>

        <!-- Pedagogical Guarantee Banner -->
        <div class="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-brand-600 via-brand-500 to-accent-cyan text-white shadow-lg shadow-brand-500/15 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div class="flex items-center gap-3.5">
            <div class="w-11 h-11 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center text-2xl flex-shrink-0">
              💡
            </div>
            <div>
              <h3 class="font-display font-bold text-base sm:text-lg">${t('study.bannerTitle')}</h3>
              <p class="text-xs text-white/90">${t('study.bannerGraphDesc')}</p>
            </div>
          </div>
          <div class="flex items-center gap-2 bg-black/15 backdrop-blur-md px-3.5 py-1.5 rounded-2xl text-xs font-semibold self-stretch md:self-auto justify-center">
            <span class="w-2 h-2 rounded-full bg-accent-emerald animate-pulse"></span>
            <span>${currentGrade === '2batx' ? 'Álvaro Martín (2º Batx PAU)' : 'Marc Vidal (1º ESO)'}</span>
          </div>
        </div>

        <!-- Study Tasks Accordion List -->
        <div class="space-y-5" id="study-tasks-list">
          ${
            availableTopics.length === 0
              ? `
              <div class="p-12 text-center glass-panel rounded-3xl">
                <span class="text-4xl">📚</span>
                <p class="mt-2 text-sm font-semibold text-slate-700">${t('study.noTasks')}</p>
              </div>
            `
              : availableTopics.map(topic => renderTaskCard(topic)).join('')
          }
        </div>

      </div>
    `;

    hookEventListeners();
  }

  function renderTaskCard(topic: TopicContextDefinition): string {
    const session = getSession(topic.id);
    const activities = promptOrchestratorService.getActivitiesForTopic(topic.id);
    const activeActivity = activities.find(a => a.id === session.selectedActivityId) || activities[0];
    const isPaused = session.status === 'paused';
    const isActive = session.status === 'active';
    const subjectIcon = getSubjectIcon(topic.subject);
    const subjectBadgeClass = getSubjectBadgeClass(topic.subject);
    const messagesExchanged = session.messages.filter(m => m.role === 'student').length;

    // === CASO 1: TAREA DESPLEGADA (ACTIVA) ===
    if (isActive) {
      return `
        <div 
          id="task-card-${topic.id}" 
          class="glass-panel p-6 rounded-3xl border-2 border-brand-500/70 bg-white/95 shadow-xl shadow-brand-500/10 glow-card space-y-5 transition-all duration-300"
        >
          <!-- Active Task Header -->
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div class="space-y-1">
              <div class="flex items-center gap-2 flex-wrap">
                <span class="text-2xl">${subjectIcon}</span>
                <h3 class="font-display font-bold text-lg text-slate-900">${topic.name}</h3>
                <span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold ${subjectBadgeClass}">
                  ${topic.subject}
                </span>
                <span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1.5 shadow-sm">
                  <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>${t('study.statusActive')}</span>
                </span>
              </div>
              <p class="text-xs text-slate-600">${topic.pedagogicalNote || ''}</p>
            </div>

            <!-- Header Controls -->
            <div class="flex items-center gap-2 flex-wrap sm:flex-nowrap">
              <button 
                data-pause-topic-id="${topic.id}" 
                class="btn-pause-task px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm whitespace-nowrap active:scale-95"
                title="${t('study.btnPause')}"
              >
                <span>⏸️</span>
                <span>${t('study.btnPause')}</span>
              </button>
              <button 
                data-topic-prompt-id="${topic.id}" 
                class="btn-view-topic-prompt px-3.5 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm whitespace-nowrap"
                title="${t('study.tooltipPromptGraph')}"
              >
                <span>🧩</span>
                <span>${t('study.btnPromptGraph')}</span>
              </button>
            </div>
          </div>

          <!-- Pedagogical Foundation Callout (Piaget / LOMLOE Anchor, identical to Tasks view) -->
          ${
            topic.pedagogicalNote
              ? `
            <div class="p-3.5 rounded-2xl ${
              currentGrade === '1eso' 
                ? 'bg-emerald-50 border border-emerald-200 text-emerald-900' 
                : 'bg-purple-50 border border-purple-200 text-purple-900'
            } text-xs flex items-start gap-2.5">
              <span class="text-base flex-shrink-0">🧠</span>
              <div>
                <span class="font-bold block">${t('study.pedagogicalAnchor')}</span>
                <span class="leading-relaxed">${topic.pedagogicalNote}</span>
              </div>
            </div>
          `
              : ''
          }

          <!-- Activities / Variations Stepper (Repetición con Variación) -->
          ${
            activities.length > 0
              ? `
            <div class="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-200/80 space-y-2.5">
              <div class="flex items-center justify-between gap-2 flex-wrap">
                <span class="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                  <span>🎯</span>
                  <span>${t('study.activityVariationLabel')}</span>
                </span>
                <span class="text-[11px] text-slate-400 font-mono">Repetición con Variación • ${activities.length} niveles</span>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
                ${activities
                  .map(act => {
                    const isSelected = act.id === activeActivity?.id;
                    return `
                    <button 
                      data-topic-id="${topic.id}"
                      data-select-activity-id="${act.id}"
                      class="btn-select-activity text-left p-2.5 rounded-xl border text-xs transition-all ${
                        isSelected
                          ? 'bg-brand-50 border-brand-300 text-brand-900 font-bold shadow-sm ring-1 ring-brand-400/40'
                          : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                      }"
                    >
                      <div class="flex items-center justify-between mb-1">
                        <span class="text-[10px] uppercase font-mono font-bold ${isSelected ? 'text-brand-600' : 'text-slate-400'}">${t('study.stepPrefix')} ${act.order}</span>
                        ${isSelected ? `<span class="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></span>` : ''}
                      </div>
                      <div class="truncate text-xs ${isSelected ? 'font-bold' : 'font-medium'}">${act.title}</div>
                    </button>
                  `;
                  })
                  .join('')}
              </div>

              ${
                activeActivity
                  ? renderMathCard('Cas Actiu:', activeActivity.sentenceOrCase, activeActivity.variationType)
                  : ''
              }
            </div>
          `
              : ''
          }

          <!-- Socratic Interaction Workspace (2 Columns Grid) -->
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-1">
            
            <!-- Socratic Chat Interface (8 cols) -->
            <div class="lg:col-span-8 flex flex-col rounded-2xl border border-slate-200 overflow-hidden h-[620px] bg-slate-50/50">
              
              <!-- Chat Stream -->
              <div id="chat-stream-${topic.id}" class="chat-stream flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
                ${session.messages.map(msg => renderMessageBubble(msg)).join('')}
              </div>

              <!-- Quick Socratic Prompts (Chips) -->
              <div class="px-4 py-2 border-t border-slate-100 bg-white flex gap-2 overflow-x-auto text-xs">
                <button data-topic-id="${topic.id}" data-prompt="¿Me puedes hacer una pregunta para diagnosticar qué parte no entiendo?" class="chip-btn whitespace-nowrap px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-brand-300 hover:bg-brand-50 text-slate-700 transition-colors">
                  ${t('study.chip1')}
                </button>
                <button data-topic-id="${topic.id}" data-prompt="Dame una pista sin decirme la respuesta final" class="chip-btn whitespace-nowrap px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-brand-300 hover:bg-brand-50 text-slate-700 transition-colors">
                  ${t('study.chip2')}
                </button>
                <button data-topic-id="${topic.id}" data-prompt="Quiero intentar resolver el siguiente paso, ¿voy por buen camino?" class="chip-btn whitespace-nowrap px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-brand-300 hover:bg-brand-50 text-slate-700 transition-colors">
                  ${t('study.chip3')}
                </button>
              </div>

              <!-- Chat Input Area -->
              <div class="p-4 bg-white border-t border-slate-200">
                <form data-topic-id="${topic.id}" class="chat-form flex items-center gap-2">
                  <input 
                    type="text" 
                    id="chat-input-${topic.id}" 
                    placeholder="${t('study.inputPlaceholder')}" 
                    required
                    class="chat-input flex-1 text-sm px-4 py-2.5 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
                  />
                  <button 
                    type="submit" 
                    id="btn-send-message-${topic.id}"
                    class="px-5 py-2.5 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md shadow-brand-500/20 transition-all flex items-center gap-1.5 whitespace-nowrap"
                  >
                    <span>${t('study.send')}</span>
                    <span>➤</span>
                  </button>
                </form>
                <div class="flex items-center justify-between text-[11px] text-slate-400 mt-2 px-1">
                  <span>${t('study.safeMode')}</span>
                  <span>${t('study.openaiCompatible')}</span>
                </div>
              </div>

            </div>

            <!-- Active Recall & Concept Cards (4 cols) -->
            <div class="lg:col-span-4 space-y-4">
              
              <!-- Card 1: Active Recall Flashcard -->
              <div class="p-5 rounded-2xl bg-white border border-slate-200 space-y-4 shadow-sm">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold uppercase tracking-wider text-slate-500">${t('study.activeRecall')}</span>
                  <button data-view-recall-topic="${topic.id}" class="btn-view-recall-prompt text-[11px] font-semibold text-brand-600 hover:text-brand-800 flex items-center gap-1">
                    <span>📄</span>
                    <span>${t('study.btnRecallPrompt')}</span>
                  </button>
                </div>

                <div>
                  <h4 class="font-bold text-sm text-slate-900">${t('study.flashcardTitle')}</h4>
                  <p class="text-xs text-slate-500 mt-0.5">${t('study.flashcardSubtitle')}</p>
                </div>

                <div class="p-4 rounded-2xl bg-brand-50/40 border border-brand-100 space-y-3">
                  <span id="flashcard-concept-${topic.id}" class="text-xs font-bold text-brand-700 block leading-relaxed">
                    ${formatMathInText(session.flashcardConcept || '¿Cómo definirías el concepto principal de esta tarea?')}
                  </span>
                  
                  <div id="flashcard-answer-${topic.id}" class="${session.flashcardRevealed ? '' : 'hidden'} text-xs text-slate-700 pt-2 border-t border-brand-200/50 space-y-1">
                    <p id="flashcard-explanation-${topic.id}" class="leading-relaxed">
                      ${formatMathInText(session.flashcardExplanation || '')}
                    </p>
                  </div>

                  <button 
                    data-topic-id="${topic.id}"
                    class="btn-toggle-answer w-full py-1.5 px-3 rounded-xl text-xs font-semibold bg-white border border-brand-200 text-brand-700 hover:bg-brand-50 transition-colors"
                  >
                    ${t('study.toggleHint')}
                  </button>
                </div>

                <!-- AI Card Generator -->
                <button 
                  data-topic-id="${topic.id}" 
                  class="btn-generate-card-ai w-full py-2 px-3 rounded-xl text-xs font-bold text-brand-700 bg-brand-50 hover:bg-brand-100 border border-brand-200 transition-colors flex items-center justify-center gap-1.5 active:scale-95"
                >
                  <span>⚡ Generar Nuevo Desafío con IA</span>
                </button>

                <div class="flex items-center justify-between gap-2 pt-1">
                  <button class="flex-1 py-1.5 px-2 rounded-xl text-[11px] font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 transition-colors">
                    ${t('study.reviewLater')}
                  </button>
                  <button class="flex-1 py-1.5 px-2 rounded-xl text-[11px] font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 transition-colors">
                    ${t('study.mastered')}
                  </button>
                </div>
              </div>

              <!-- Card 2: Conceptos Clave (Línea Base) -->
              <div class="p-5 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-sm">
                <span class="text-xs font-bold uppercase tracking-wider text-slate-500">${t('study.baselineConcepts')}</span>
                <ul class="space-y-2 text-xs">
                  ${topic.keyConcepts
                    .map(
                      (concept, i) => `
                    <li class="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                      <span class="font-medium text-slate-800">${concept}</span>
                      <span class="text-[10px] font-bold px-2 py-0.5 rounded-md ${i === 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'}">
                        ${i === 0 ? t('study.consolidated') : t('study.toStrengthen')}
                      </span>
                    </li>
                  `
                    )
                    .join('')}
                </ul>
              </div>

              <!-- Single Active Task Helper Callout -->
              <div class="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-[11px] text-slate-500 flex items-center gap-2">
                <span>ℹ️</span>
                <span>${t('study.activeTaskNote')}</span>
              </div>

            </div>

          </div>

        </div>
      `;
    }

    // === CASO 2: TAREA PLEGADA (PENDIENTE O EN PAUSA) ===
    return `
      <div 
        id="task-card-${topic.id}" 
        class="glass-panel p-5 sm:p-6 rounded-3xl border ${
          isPaused 
            ? 'border-amber-300/80 bg-amber-50/20 shadow-md shadow-amber-500/5' 
            : 'border-slate-200 hover:border-slate-300 bg-white/70'
        } glow-card space-y-4 transition-all duration-300"
      >
        <!-- Task Header Row -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div class="space-y-1">
            <div class="flex items-center gap-2 flex-wrap">
              <span class="text-xl">${subjectIcon}</span>
              <h3 class="font-display font-bold text-base text-slate-900">${topic.name}</h3>
              <span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold ${subjectBadgeClass}">
                ${topic.subject}
              </span>
              ${
                isPaused
                  ? `<span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-300 flex items-center gap-1.5 shadow-sm">
                       <span class="text-xs">⏸️</span>
                       <span>${t('study.statusPaused')}</span>
                     </span>`
                  : `<span class="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                       ${t('study.statusPending')}
                     </span>`
              }
            </div>
            <p class="text-xs text-slate-500">${topic.pedagogicalNote || ''}</p>
          </div>

          <!-- Actions & Status Info -->
          <div class="flex items-center gap-2.5 flex-wrap sm:flex-nowrap">
            ${
              isPaused
                ? `
              <div class="text-left sm:text-right hidden sm:block">
                <span class="block text-xs font-bold text-amber-900">${t('study.interactionsCount', { count: messagesExchanged })}</span>
                <span class="text-[11px] text-amber-700 font-medium truncate max-w-[150px] block">${activeActivity?.title || ''}</span>
              </div>
            `
                : `
              <div class="text-left sm:text-right hidden sm:block">
                <span class="block text-xs font-bold text-slate-700">${t('study.badgeActivities', { count: activities.length })}</span>
                <span class="text-[11px] text-slate-400 font-medium">${t('study.badgeConcepts', { count: topic.keyConcepts.length })}</span>
              </div>
            `
            }

            <button 
              data-topic-prompt-id="${topic.id}" 
              class="btn-view-topic-prompt px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm whitespace-nowrap"
              title="${t('study.tooltipPromptGraph')}"
            >
              <span>🧩</span>
              <span>${t('study.btnPromptGraph')}</span>
            </button>

            <button 
              data-start-topic-id="${topic.id}" 
              class="btn-start-task px-4 py-2 rounded-2xl ${
                isPaused 
                  ? 'bg-amber-600 hover:bg-amber-700 shadow-amber-500/20' 
                  : 'bg-brand-600 hover:bg-brand-700 shadow-brand-500/20'
              } text-white text-xs font-bold shadow-md transition-all flex items-center gap-1.5 whitespace-nowrap active:scale-95"
            >
              <span>${isPaused ? '▶️' : '🚀'}</span>
              <span>${isPaused ? t('study.btnResume') : t('study.btnStart')}</span>
            </button>
          </div>
        </div>

        <!-- Task Preview Footer -->
        <div class="flex items-center justify-between gap-3 pt-2 border-t border-slate-100/80 flex-wrap">
          <div class="flex items-center gap-1.5 flex-wrap">
            <span class="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1">Conceptes:</span>
            ${topic.keyConcepts
              .map(
                c => `
              <span class="text-[11px] font-medium px-2 py-0.5 rounded-lg bg-slate-50 text-slate-600 border border-slate-200/80">
                ${c}
              </span>
            `
              )
              .join('')}
          </div>

          ${
            isPaused
              ? `
            <span class="text-[11px] text-amber-700/90 font-semibold flex items-center gap-1">
              <span>💾</span>
              <span>${t('study.pauseNotice')}</span>
            </span>
          `
              : ''
          }
        </div>
      </div>
    `;
  }

  function hookEventListeners(): void {
    // 1. Iniciar / Continuar tarea
    const startBtns = container.querySelectorAll<HTMLButtonElement>('.btn-start-task');
    startBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const topicId = btn.dataset.startTopicId;
        if (topicId) {
          startTask(topicId);
        }
      });
    });

    // 2. Pausar tarea activa
    const pauseBtns = container.querySelectorAll<HTMLButtonElement>('.btn-pause-task');
    pauseBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const topicId = btn.dataset.pauseTopicId;
        if (topicId) {
          pauseTask(topicId);
        }
      });
    });

    // 3. Seleccionar variación / actividad
    const actBtns = container.querySelectorAll<HTMLButtonElement>('.btn-select-activity');
    actBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const topicId = btn.dataset.topicId;
        const actId = btn.dataset.selectActivityId;
        if (topicId && actId) {
          selectActivity(topicId, actId);
        }
      });
    });

    // 4. Ver Grafo de Prompts (4 Niveles) de cualquier tema
    const promptBtns = container.querySelectorAll<HTMLButtonElement>('.btn-view-topic-prompt');
    promptBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const topicId = btn.dataset.topicPromptId;
        const topic = availableTopics.find(t => t.id === topicId);
        if (topic) {
          const session = getSession(topic.id);
          const modalRoot = document.getElementById('modal-root') || document.body;
          const assembled = promptOrchestratorService.assemblePrompt({
            role: 'socratic',
            gradeKey: currentGrade,
            subject: topic.subject,
            topicId: topic.id,
            activityId: session.selectedActivityId
          });

          renderPromptViewerModal(
            modalRoot,
            t('study.modalSocraticTitle'),
            assembled.systemInstruction,
            {
              assembledPrompt: assembled,
              subtitle: t('study.modalSocraticSubtitle', { subject: topic.subject, topic: topic.name }),
              onClose: () => {
                modalRoot.innerHTML = '';
              }
            }
          );
        }
      });
    });

    // 5. Ver Recall Prompt modal
    const recallBtns = container.querySelectorAll<HTMLButtonElement>('.btn-view-recall-prompt');
    recallBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const topicId = btn.dataset.viewRecallTopic;
        const topic = availableTopics.find(t => t.id === topicId) || availableTopics[0];
        const modalRoot = document.getElementById('modal-root') || document.body;
        const assembled = promptOrchestratorService.assemblePrompt({
          role: 'recall',
          gradeKey: currentGrade,
          subject: topic.subject,
          topicId: topic.id
        });

        renderPromptViewerModal(
          modalRoot,
          'Prompt Estático: Generador de Active Recall (active_recall_generator.md)',
          STATIC_PROMPTS.recall,
          {
            assembledPrompt: assembled,
            subtitle: 'Prompt Transversal de Sección (Generación de Flashcards Conceptuales)',
            onClose: () => {
              modalRoot.innerHTML = '';
            }
          }
        );
      });
    });

    // 6. Mostrar/Ocultar respuesta de la tarjeta de autoaprendizaje
    const toggleAnsBtns = container.querySelectorAll<HTMLButtonElement>('.btn-toggle-answer');
    toggleAnsBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const topicId = btn.dataset.topicId;
        if (topicId) {
          const session = getSession(topicId);
          session.flashcardRevealed = !session.flashcardRevealed;
          const ansEl = container.querySelector(`#flashcard-answer-${topicId}`);
          ansEl?.classList.toggle('hidden', !session.flashcardRevealed);
        }
      });
    });

    // 7. Generar desafío con IA
    const genCardBtns = container.querySelectorAll<HTMLButtonElement>('.btn-generate-card-ai');
    genCardBtns.forEach(btn => {
      btn.addEventListener('click', async () => {
        const topicId = btn.dataset.topicId;
        const topic = availableTopics.find(t => t.id === topicId);
        if (topic) {
          btn.innerHTML = `<span>⏳ Generando desafío...</span>`;
          try {
            const card = await aiClientService.generateActiveRecallCard(topic.subject, topic.name);
            const session = getSession(topic.id);
            session.flashcardConcept = card.concept;
            session.flashcardExplanation = card.explanation;
            session.flashcardRevealed = false;

            const conceptEl = container.querySelector(`#flashcard-concept-${topic.id}`);
            const explEl = container.querySelector(`#flashcard-explanation-${topic.id}`);
            const ansEl = container.querySelector(`#flashcard-answer-${topic.id}`);
            if (conceptEl) conceptEl.innerHTML = formatMathInText(card.concept);
            if (explEl) explEl.innerHTML = formatMathInText(card.explanation);
            ansEl?.classList.add('hidden');
          } catch (err: any) {
            alert(err.message || 'Error al generar tarjeta con IA');
          } finally {
            btn.innerHTML = `<span>⚡ Generar Nuevo Desafío con IA</span>`;
          }
        }
      });
    });

    // 8. Quick socratic chips
    const chips = container.querySelectorAll<HTMLButtonElement>('.chip-btn');
    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        const topicId = chip.dataset.topicId;
        const text = chip.dataset.prompt;
        if (topicId && text) {
          sendUserMessage(topicId, text);
        }
      });
    });

    // 9. Chat form submit
    const chatForms = container.querySelectorAll<HTMLFormElement>('.chat-form');
    chatForms.forEach(form => {
      form.addEventListener('submit', e => {
        e.preventDefault();
        const topicId = form.dataset.topicId;
        if (topicId) {
          const input = container.querySelector(`#chat-input-${topicId}`) as HTMLInputElement;
          if (input && input.value.trim()) {
            const val = input.value.trim();
            input.value = '';
            sendUserMessage(topicId, val);
          }
        }
      });
    });

    // 10. Auto-scroll chat stream al final para el tema activo
    const streams = container.querySelectorAll<HTMLElement>('.chat-stream');
    streams.forEach(stream => {
      stream.scrollTo({ top: stream.scrollHeight, behavior: 'smooth' });
    });
  }

  render();
}

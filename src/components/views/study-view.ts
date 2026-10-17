import { aiClientService, STATIC_PROMPTS } from '../../services/ai-client';
import { googleAuthService } from '../../services/google-auth';
import { promptOrchestratorService } from '../../services/prompt-orchestrator';
import { renderPromptViewerModal } from '../modals/prompt-viewer-modal';
import { t } from '../../services/i18n';
import type { ChatMessage } from '../../types/study';
import type { TopicContextDefinition, ActivityDefinition } from '../../types/prompts';

export function renderStudyView(container: HTMLElement): void {
  const auth = googleAuthService.getState();
  const currentGrade = auth.user?.gradeKey || '1eso';
  
  // Obtener temas curriculares del grado actual mediante el orquestador
  const availableTopics: TopicContextDefinition[] = promptOrchestratorService.getTopicsForGrade(currentGrade);
  let selectedTopic = availableTopics[0];

  // Actividades / variaciones asociadas al tema activo
  let availableActivities: ActivityDefinition[] = promptOrchestratorService.getActivitiesForTopic(selectedTopic.id);
  let selectedActivity: ActivityDefinition | undefined = availableActivities[0];

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

  let messages: ChatMessage[] = [getInitialMessage(selectedTopic, selectedActivity)];

  function render() {
    availableActivities = promptOrchestratorService.getActivitiesForTopic(selectedTopic.id);
    if (!selectedActivity || !availableActivities.some(a => a.id === selectedActivity?.id)) {
      selectedActivity = availableActivities[0];
    }

    container.innerHTML = `
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
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

        <!-- Main Layout: Socratic Chat (Left) + Active Recall / Socratic Tools (Right) -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          <!-- Socratic Chat Interface (8 cols) -->
          <div class="lg:col-span-8 flex flex-col glass-panel rounded-3xl border border-slate-200 overflow-hidden h-[640px]">
            
            <!-- Chat Topbar -->
            <div class="p-4 border-b border-slate-200 bg-white/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div class="flex items-center gap-3">
                <span class="text-2xl">🧠</span>
                <div>
                  <h4 class="font-bold text-sm text-slate-900">${selectedTopic.name}</h4>
                  <span class="text-xs text-brand-600 font-semibold">${selectedTopic.subject} • ${currentGrade === '2batx' ? '2º Bachillerato (PAU)' : '1º de ESO'}</span>
                </div>
              </div>

              <!-- Topic & Variation Selectors & Prompt Inspector -->
              <div class="flex items-center gap-2 flex-wrap">
                <button id="btn-view-prompt-graph" class="px-3 py-1.5 rounded-xl bg-purple-50 border border-purple-200 hover:bg-purple-100 text-purple-700 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm" title="${t('study.tooltipPromptGraph')}">
                  <span>🧩</span>
                  <span>${t('study.btnPromptGraph')}</span>
                </button>
                <select id="select-topic" class="text-xs font-medium px-3 py-1.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 max-w-[210px] truncate">
                  ${availableTopics.map(t => `<option value="${t.id}" ${t.id === selectedTopic.id ? 'selected' : ''}>${t.subject}: ${t.name}</option>`).join('')}
                </select>
              </div>
            </div>

            <!-- Activity / Variation Bar (Repetición con Variación) -->
            ${
              availableActivities.length > 0
                ? `
              <div class="px-4 py-2 border-b border-slate-200/70 bg-slate-50/80 flex items-center justify-between gap-3 flex-wrap">
                <div class="flex items-center gap-2 text-xs">
                  <span class="font-bold text-slate-600 flex items-center gap-1">
                    <span>🎯</span>
                    <span>${t('study.activityVariationLabel')}</span>
                  </span>
                  <select id="select-activity" class="text-xs font-semibold px-2.5 py-1 rounded-lg border border-brand-200 bg-brand-50/60 text-brand-800 focus:outline-none focus:ring-1 focus:ring-brand-500">
                    ${availableActivities.map(a => `<option value="${a.id}" ${a.id === selectedActivity?.id ? 'selected' : ''}>${t('study.stepPrefix')} ${a.order}: ${a.title}</option>`).join('')}
                  </select>
                </div>
                ${
                  selectedActivity
                    ? `
                  <div class="text-[11px] font-mono text-slate-500 bg-white px-2.5 py-0.5 rounded-md border border-slate-200 truncate max-w-xs">
                    "${selectedActivity.sentenceOrCase}"
                  </div>
                `
                    : ''
                }
              </div>
            `
                : ''
            }

            <!-- Messages Stream -->
            <div id="chat-stream" class="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
              ${messages.map(msg => renderMessageBubble(msg)).join('')}
            </div>

            <!-- Quick Socratic Prompts (Chips) -->
            <div id="quick-prompts-container" class="px-4 py-2 border-t border-slate-100 bg-slate-50/70 flex gap-2 overflow-x-auto text-xs">
              <button data-prompt="¿Me puedes hacer una pregunta para diagnosticar qué parte no entiendo?" class="chip-btn whitespace-nowrap px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:border-brand-300 hover:bg-brand-50 text-slate-700 transition-colors">
                ${t('study.chip1')}
              </button>
              <button data-prompt="Dame una pista sin decirme la respuesta final" class="chip-btn whitespace-nowrap px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:border-brand-300 hover:bg-brand-50 text-slate-700 transition-colors">
                ${t('study.chip2')}
              </button>
              <button data-prompt="Quiero intentar resolver el siguiente paso, ¿voy por buen camino?" class="chip-btn whitespace-nowrap px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:border-brand-300 hover:bg-brand-50 text-slate-700 transition-colors">
                ${t('study.chip3')}
              </button>
            </div>

            <!-- Chat Input Area -->
            <div class="p-4 bg-white border-t border-slate-200">
              <form id="chat-form" class="flex items-center gap-2">
                <input 
                  type="text" 
                  id="chat-input" 
                  placeholder="${t('study.inputPlaceholder')}" 
                  required
                  class="flex-1 text-sm px-4 py-2.5 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
                />
                <button 
                  type="submit" 
                  id="btn-send-message"
                  class="px-5 py-2.5 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md shadow-brand-500/20 transition-all flex items-center gap-1.5"
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
            
            <!-- Card 1: Desafío de Memoria Activa (Active Recall) -->
            <div class="glass-panel p-5 rounded-3xl border border-slate-200 space-y-4">
              <div class="flex items-center justify-between">
                <span class="text-xs font-bold uppercase tracking-wider text-slate-500">${t('study.activeRecall')}</span>
                <button id="btn-view-recall-prompt" class="text-[11px] font-semibold text-brand-600 hover:text-brand-800 flex items-center gap-1">
                  <span>📄</span>
                  <span>Prompt Recall</span>
                </button>
              </div>

              <div>
                <h4 class="font-bold text-sm text-slate-900">${t('study.flashcardTitle')}</h4>
                <p class="text-xs text-slate-500 mt-1">${t('study.flashcardSubtitle')}</p>
              </div>

              <div id="flashcard-box" class="p-4 rounded-2xl bg-brand-50/40 border border-brand-100 space-y-3">
                <span id="flashcard-concept" class="text-xs font-bold text-brand-700 block">
                  ${
                    selectedTopic.subject.includes('Lengua')
                      ? currentGrade === '1eso'
                        ? 'En 1º de ESO, ¿cómo identificamos el Complemento Verbal en "El tren llegó puntual a la estación"?'
                        : 'En 2º de Bachillerato, ¿qué prueba sintáctica demuestra que "puntual" es CPred y no CCM?'
                      : `¿Cómo definirías la clave de ${selectedTopic.name}?`
                  }
                </span>
                
                <div id="flashcard-answer" class="hidden text-xs text-slate-700 pt-2 border-t border-brand-200/50 space-y-1">
                  <p id="flashcard-explanation">
                    ${
                      selectedTopic.subject.includes('Lengua')
                        ? currentGrade === '1eso'
                          ? 'En 1º de ESO se identifica "puntual a la estación" en bloque como Complemento Verbal (CV) sin exigir clasificar subtipos.'
                          : 'La prueba de concordancia: "puntual" varía con el sujeto ("Las locomotoras llegaron puntuales"), rasgo exclusivo del CPred.'
                        : 'Comprender la causa fundamental y la consecuencia lógica del concepto.'
                    }
                  </p>
                </div>

                <button id="btn-toggle-answer" class="w-full py-1.5 px-3 rounded-xl text-xs font-semibold bg-white border border-brand-200 text-brand-700 hover:bg-brand-50 transition-colors">
                  ${t('study.toggleHint')}
                </button>
              </div>

              <!-- AI Challenge Generator Button -->
              <button id="btn-generate-card-ai" class="w-full py-2 px-3 rounded-xl text-xs font-bold text-brand-700 bg-brand-50 hover:bg-brand-100 border border-brand-200 transition-colors flex items-center justify-center gap-1.5">
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

            <!-- Card 2: Conceptos Clave del Tema (Línea Base) -->
            <div class="glass-panel p-5 rounded-3xl border border-slate-200 space-y-3">
              <span class="text-xs font-bold uppercase tracking-wider text-slate-500">${t('study.baselineConcepts')}</span>
              <ul class="space-y-2 text-xs">
                ${selectedTopic.keyConcepts.map((concept, i) => `
                  <li class="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <span class="font-medium text-slate-800">${concept}</span>
                    <span class="text-[10px] font-bold px-2 py-0.5 rounded-md ${i === 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'}">
                      ${i === 0 ? t('study.consolidated') : t('study.toStrengthen')}
                    </span>
                  </li>
                `).join('')}
              </ul>
            </div>

          </div>

        </div>

      </div>
    `;

    // Hook listeners
    const chatStream = container.querySelector('#chat-stream');
    chatStream?.scrollTo({ top: chatStream.scrollHeight, behavior: 'smooth' });

    // Topic selector
    container.querySelector('#select-topic')?.addEventListener('change', (e) => {
      const topicId = (e.target as HTMLSelectElement).value;
      const found = availableTopics.find(t => t.id === topicId);
      if (found) {
        selectedTopic = found;
        availableActivities = promptOrchestratorService.getActivitiesForTopic(found.id);
        selectedActivity = availableActivities[0];
        messages = [getInitialMessage(found, selectedActivity)];
        render();
      }
    });

    // Activity / Variation selector
    container.querySelector('#select-activity')?.addEventListener('change', (e) => {
      const actId = (e.target as HTMLSelectElement).value;
      const act = availableActivities.find(a => a.id === actId);
      if (act) {
        selectedActivity = act;
        messages = [getInitialMessage(selectedTopic, act)];
        render();
      }
    });

    // Toggle flashcard answer
    container.querySelector('#btn-toggle-answer')?.addEventListener('click', () => {
      const ans = container.querySelector('#flashcard-answer');
      ans?.classList.toggle('hidden');
    });

    // Grafo de Prompts Viewer (4 Capas completas)
    container.querySelector('#btn-view-prompt-graph')?.addEventListener('click', () => {
      const modalRoot = document.getElementById('modal-root') || document.body;
      const assembled = promptOrchestratorService.assemblePrompt({
        role: 'socratic',
        gradeKey: currentGrade,
        subject: selectedTopic.subject,
        topicId: selectedTopic.id,
        activityId: selectedActivity?.id
      });

      renderPromptViewerModal(
        modalRoot,
        t('study.modalSocraticTitle'),
        assembled.systemInstruction,
        {
          assembledPrompt: assembled,
          subtitle: t('study.modalSocraticSubtitle', { subject: selectedTopic.subject, topic: selectedTopic.name }),
          onClose: () => { modalRoot.innerHTML = ''; }
        }
      );
    });

    // View Recall Prompt modal
    container.querySelector('#btn-view-recall-prompt')?.addEventListener('click', () => {
      const modalRoot = document.getElementById('modal-root') || document.body;
      const assembled = promptOrchestratorService.assemblePrompt({
        role: 'recall',
        gradeKey: currentGrade,
        subject: selectedTopic.subject,
        topicId: selectedTopic.id
      });

      renderPromptViewerModal(
        modalRoot,
        'Prompt Estático: Generador de Active Recall (active_recall_generator.md)',
        STATIC_PROMPTS.recall,
        { 
          assembledPrompt: assembled,
          subtitle: 'Prompt Transversal de Sección (Generación de Flashcards Conceptuales)',
          onClose: () => { modalRoot.innerHTML = ''; } 
        }
      );
    });

    // AI Active Recall Card generation
    const genCardBtn = container.querySelector('#btn-generate-card-ai');
    genCardBtn?.addEventListener('click', async () => {
      if (genCardBtn) genCardBtn.innerHTML = `<span>⏳ Generando desafío...</span>`;
      try {
        const card = await aiClientService.generateActiveRecallCard(selectedTopic.subject, selectedTopic.name);
        const conceptEl = container.querySelector('#flashcard-concept');
        const explEl = container.querySelector('#flashcard-explanation');
        const ans = container.querySelector('#flashcard-answer');
        if (conceptEl) conceptEl.textContent = card.concept;
        if (explEl) explEl.textContent = card.explanation;
        ans?.classList.add('hidden');
      } catch (err: any) {
        alert(err.message || 'Error al generar tarjeta con IA');
      } finally {
        if (genCardBtn) genCardBtn.innerHTML = `<span>⚡ Generar Nuevo Desafío con IA</span>`;
      }
    });

    // Chips click
    const chips = container.querySelectorAll<HTMLButtonElement>('.chip-btn');
    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        const text = chip.dataset.prompt;
        if (text) {
          sendUserMessage(text);
        }
      });
    });

    // Chat form submit
    const form = container.querySelector('#chat-form');
    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = container.querySelector('#chat-input') as HTMLInputElement;
      if (input && input.value.trim()) {
        const val = input.value.trim();
        input.value = '';
        sendUserMessage(val);
      }
    });
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
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n\n/g, '<br/><br/>')
      .replace(/\n/g, '<br/>');
  }

  async function sendUserMessage(text: string) {
    const userMsg: ChatMessage = {
      id: `msg_u_${Date.now()}`,
      role: 'student',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    messages.push(userMsg);
    render();

    // Show temporary thinking message
    const sendBtn = container.querySelector('#btn-send-message');
    if (sendBtn) sendBtn.innerHTML = `<span>⏳</span>`;

    const response = await aiClientService.generateSocraticResponse(
      text,
      selectedTopic.subject,
      selectedTopic.id,
      messages,
      selectedActivity?.id
    );

    messages.push(response);
    render();
  }

  render();
}

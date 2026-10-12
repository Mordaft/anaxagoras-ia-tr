import { aiClientService, STATIC_PROMPTS } from '../../services/ai-client';
import { renderPromptViewerModal } from '../modals/prompt-viewer-modal';
import { t } from '../../services/i18n';
import type { ChatMessage, StudyTopic } from '../../types/study';

const AVAILABLE_TOPICS: StudyTopic[] = [
  {
    id: 't_math',
    subject: 'Matemáticas',
    name: 'Ecuaciones y Funciones Cuadráticas',
    level: '4º ESO',
    keyConcepts: ['Fórmula general', 'Vértice de la parábola', 'Discriminante']
  },
  {
    id: 't_bio',
    subject: 'Biología',
    name: 'Metabolismo Celular y Fotosíntesis',
    level: '4º ESO / Bachillerato',
    keyConcepts: ['ATP y Energía', 'Fase luminosa', 'Ciclo de Calvin']
  },
  {
    id: 't_hist',
    subject: 'Historia',
    name: 'Revolución Industrial y Cambios Sociales',
    level: '4º ESO',
    keyConcepts: ['Máquina de vapor', 'Movimiento obrero', 'Causas económicas']
  }
];

export function renderStudyView(container: HTMLElement): void {
  let selectedTopic = AVAILABLE_TOPICS[0];
  let messages: ChatMessage[] = [
    {
      id: 'msg_welcome',
      role: 'tutor',
      content: `¡Hola! Soy tu tutor socrático en **${selectedTopic.subject}** (${selectedTopic.name}).
      
Recuerda: aquí no te daré las respuestas masticadas, sino que exploraremos juntos los conceptos paso a paso para que tu cerebro construya conexiones reales. 

¿Qué ejercicio o concepto estás abordando ahora mismo?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isSocraticQuestion: true,
      suggestedPrompts: [
        'No sé cómo empezar el ejercicio',
        'Tengo dudas con el primer paso',
        'Quiero repasar la teoría básica'
      ]
    }
  ];

  function render() {
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
              <p class="text-xs text-white/90">${t('study.bannerDesc')}</p>
            </div>
          </div>
          <div class="flex items-center gap-2 bg-black/15 backdrop-blur-md px-3.5 py-1.5 rounded-2xl text-xs font-semibold self-stretch md:self-auto justify-center">
            <span class="w-2 h-2 rounded-full bg-accent-emerald animate-pulse"></span>
            <span>${t('study.bannerBadge')}</span>
          </div>
        </div>

        <!-- Main Layout: Socratic Chat (Left) + Active Recall / Socratic Tools (Right) -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          <!-- Socratic Chat Interface (8 cols) -->
          <div class="lg:col-span-8 flex flex-col glass-panel rounded-3xl border border-slate-200 overflow-hidden h-[620px]">
            
            <!-- Chat Topbar -->
            <div class="p-4 border-b border-slate-200 bg-white/50 flex items-center justify-between gap-3 flex-wrap">
              <div class="flex items-center gap-3">
                <span class="text-2xl">🧠</span>
                <div>
                  <h4 class="font-bold text-sm text-slate-900">${selectedTopic.name}</h4>
                  <span class="text-xs text-brand-600 font-semibold">${selectedTopic.subject} • ${selectedTopic.level}</span>
                </div>
              </div>

              <!-- Topic Selector & Prompt Inspector -->
              <div class="flex items-center gap-2 flex-wrap">
                <button id="btn-view-socratic-prompt" class="px-2.5 py-1.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1 transition-all" title="Ver Prompt Socrático Oficial">
                  <span>📄</span>
                  <span>Prompt Socrático</span>
                </button>
                <select id="select-topic" class="text-xs font-medium px-3 py-1.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500">
                  ${AVAILABLE_TOPICS.map(t => `<option value="${t.id}" ${t.id === selectedTopic.id ? 'selected' : ''}>${t.subject}: ${t.name}</option>`).join('')}
                </select>
              </div>
            </div>

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
                <span id="flashcard-concept" class="text-xs font-bold text-brand-700 block">¿Cuál es el significado del discriminante (b² - 4ac) en una ecuación de segundo grado?</span>
                
                <div id="flashcard-answer" class="hidden text-xs text-slate-700 pt-2 border-t border-brand-200/50 space-y-1">
                  <p id="flashcard-explanation"><strong>Explicación:</strong> Indica cuántas soluciones reales existen:</p>
                  <p>• Si > 0: 2 soluciones reales distintas.</p>
                  <p>• Si = 0: 1 solución real (doble).</p>
                  <p>• Si < 0: No existen soluciones reales.</p>
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

            <!-- Card 2: Conceptos Clave del Tema -->
            <div class="glass-panel p-5 rounded-3xl border border-slate-200 space-y-3">
              <span class="text-xs font-bold uppercase tracking-wider text-slate-500">${t('study.conceptsTitle')}</span>
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
      const found = AVAILABLE_TOPICS.find(t => t.id === topicId);
      if (found) {
        selectedTopic = found;
        messages = [
          {
            id: `msg_${Date.now()}`,
            role: 'tutor',
            content: `¡Cambiamos a **${selectedTopic.subject}** (${selectedTopic.name})! ¿En qué concepto específico te gustaría que te guíe hoy?`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isSocraticQuestion: true
          }
        ];
        render();
      }
    });

    // Toggle flashcard answer
    container.querySelector('#btn-toggle-answer')?.addEventListener('click', () => {
      const ans = container.querySelector('#flashcard-answer');
      ans?.classList.toggle('hidden');
    });

    // View Socratic Prompt modal
    container.querySelector('#btn-view-socratic-prompt')?.addEventListener('click', () => {
      const modalRoot = document.getElementById('modal-root') || document.body;
      renderPromptViewerModal(
        modalRoot,
        'Prompt Estático: Tutor Socrático (socratic_tutor.md)',
        STATIC_PROMPTS.socratic,
        { onClose: () => { modalRoot.innerHTML = ''; } }
      );
    });

    // View Recall Prompt modal
    container.querySelector('#btn-view-recall-prompt')?.addEventListener('click', () => {
      const modalRoot = document.getElementById('modal-root') || document.body;
      renderPromptViewerModal(
        modalRoot,
        'Prompt Estático: Generador de Active Recall (active_recall_generator.md)',
        STATIC_PROMPTS.recall,
        { onClose: () => { modalRoot.innerHTML = ''; } }
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
      selectedTopic.name,
      messages
    );

    messages.push(response);
    render();
  }

  render();
}

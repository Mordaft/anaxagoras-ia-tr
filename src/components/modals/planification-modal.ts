import { db } from '../../services/storage';
import { aiClientService } from '../../services/ai-client';
import { googleAuthService } from '../../services/google-auth';
import type { StudyBlock, AgendaStats, PlanDialogMessage } from '../../types/agenda';

export interface PlanificationModalCallbacks {
  onApplied: () => void;
  onClose: () => void;
}

export async function renderPlanificationModal(
  container: HTMLElement, 
  callbacks: PlanificationModalCallbacks
): Promise<void> {
  const auth = googleAuthService.getState();
  const student = auth.user;
  const currentGrade = student?.gradeKey || '1eso';
  const studentName = student?.name || 'Estudiante';
  const gradeLevel = student?.gradeLevel || '1º de ESO';

  // Cargar bloques actuales de IndexedDB filtrados por curso
  const allBlocks = await db.studyBlocks.toArray();
  const currentBlocks = allBlocks.filter(b => b.gradeKey === currentGrade || b.gradeKey === 'both' || !b.gradeKey);

  let stats: AgendaStats = aiClientService.calculateAgendaStats(currentBlocks);
  let dialogueMessages: PlanDialogMessage[] = [];
  let suggestedBlocks: StudyBlock[] = [];
  let isThinking = true;

  // Render inicial con esqueleto de carga
  function render() {
    container.innerHTML = `
      <div class="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
        <div class="relative bg-white rounded-3xl shadow-2xl max-w-4xl w-full border border-slate-100 flex flex-col max-h-[90vh] overflow-hidden my-auto">
          
          <!-- Modal Header -->
          <div class="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/70">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-2xl bg-brand-500 text-white flex items-center justify-center text-xl shadow-md shadow-brand-500/20">
                🤖
              </div>
              <div>
                <div class="flex items-center gap-2 flex-wrap">
                  <h3 class="font-display font-bold text-base sm:text-lg text-slate-900">Planificador Socrático de Tiempo y Hábitos</h3>
                  <span class="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold border border-emerald-200">
                    🔒 100% Local (IndexedDB)
                  </span>
                </div>
                <p class="text-xs text-slate-500">
                  ${studentName} • ${gradeLevel} • Organización personal privada
                </p>
              </div>
            </div>
            <button id="btn-close-plan-modal" class="text-slate-400 hover:text-slate-600 p-2 rounded-xl hover:bg-slate-200/50 transition-colors">
              ✕
            </button>
          </div>

          <!-- Modal Scrollable Content -->
          <div class="p-6 overflow-y-auto space-y-6 flex-1 text-slate-800">
            
            <!-- Top Grid: 4 Ejes Fundamentales de Avance y Tiempo -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              
              <!-- 1. Prioridades Urgentes -->
              <div class="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/70 relative overflow-hidden">
                <div class="flex items-center justify-between text-amber-800">
                  <span class="text-[10px] font-bold uppercase tracking-wider">🎯 Prioridad Urgente</span>
                  <span class="text-sm">⚡</span>
                </div>
                <div class="mt-2">
                  ${
                    stats.urgentPriorities.length > 0
                      ? `
                      <span class="text-xs font-bold text-slate-900 block truncate" title="${stats.urgentPriorities[0].title}">
                        ${stats.urgentPriorities[0].subject}
                      </span>
                      <p class="text-[11px] text-amber-800 font-semibold mt-0.5">
                        ${stats.urgentPriorities[0].daysLeft === 0 ? '¡Vence hoy!' : stats.urgentPriorities[0].daysLeft === 1 ? 'Mañana' : `En ${stats.urgentPriorities[0].daysLeft} días`}
                      </p>
                    `
                      : `
                      <span class="text-xs font-bold text-emerald-700">Sin exámenes inmediatos</span>
                      <p class="text-[10px] text-slate-500 mt-0.5">Ritmo tranquilo</p>
                    `
                  }
                </div>
              </div>

              <!-- 2. Distribución Post-Clases (Tarde) -->
              <div class="p-4 rounded-2xl bg-brand-50/70 border border-brand-200/70 relative overflow-hidden">
                <div class="flex items-center justify-between text-brand-800">
                  <span class="text-[10px] font-bold uppercase tracking-wider">⏱️ Tu Tarde (Hoy)</span>
                  <span class="text-sm">🏖️</span>
                </div>
                <div class="mt-2">
                  <div class="flex items-baseline gap-1">
                    <span class="text-lg font-extrabold font-display text-brand-900">${stats.afternoonDistribution.freeTimeHours} h</span>
                    <span class="text-[10px] text-brand-700 font-medium">libres protegidas</span>
                  </div>
                  <p class="text-[11px] text-slate-600 mt-0.5">
                    Estudio: <strong class="text-slate-800">${stats.afternoonDistribution.todayStudyMinutes} min</strong> (tras las 15:00)
                  </p>
                </div>
              </div>

              <!-- 3. Balance por Asignatura -->
              <div class="p-4 rounded-2xl bg-purple-50/70 border border-purple-200/70 relative overflow-hidden">
                <div class="flex items-center justify-between text-purple-800">
                  <span class="text-[10px] font-bold uppercase tracking-wider">📊 Balance Materias</span>
                  <span class="text-sm">⚖️</span>
                </div>
                <div class="mt-2">
                  ${
                    stats.subjectBreakdown.length > 0
                      ? `
                      <span class="text-xs font-bold text-slate-900 block truncate">
                        ${stats.subjectBreakdown[0].subject} (${stats.subjectBreakdown[0].percentage}%)
                      </span>
                      <p class="text-[10px] text-purple-700 mt-0.5">
                        ${stats.subjectBreakdown.length} asignaturas con bloques
                      </p>
                    `
                      : `
                      <span class="text-xs text-slate-500">Sin datos de minutos</span>
                    `
                  }
                </div>
              </div>

              <!-- 4. Avance de Deberes -->
              <div class="p-4 rounded-2xl bg-cyan-50/70 border border-cyan-200/70 relative overflow-hidden">
                <div class="flex items-center justify-between text-cyan-800">
                  <span class="text-[10px] font-bold uppercase tracking-wider">📝 Avance Deberes</span>
                  <span class="text-sm">📋</span>
                </div>
                <div class="mt-2">
                  <div class="flex items-baseline gap-1">
                    <span class="text-lg font-extrabold font-display text-cyan-900">${stats.homeworkProgress.completed}/${stats.homeworkProgress.total}</span>
                    <span class="text-[10px] text-cyan-700 font-medium">completados</span>
                  </div>
                  <div class="w-full bg-cyan-200/50 rounded-full h-1.5 mt-1.5 overflow-hidden">
                    <div class="bg-cyan-600 h-1.5 rounded-full transition-all" style="width: ${stats.homeworkProgress.percentage}%"></div>
                  </div>
                </div>
              </div>

            </div>

            <!-- Diálogo con el Asistente Socrático -->
            <div class="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200/70 space-y-4">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <span class="text-lg">💬</span>
                  <span class="text-xs font-bold uppercase tracking-wider text-slate-700">Conversación y Negociación con el Tutor</span>
                </div>
                <span class="text-[11px] text-slate-400">Metodología Spaced Repetition</span>
              </div>

              <!-- Historial de Conversación -->
              <div class="space-y-3 max-h-56 overflow-y-auto pr-1" id="plan-dialog-history">
                ${
                  isThinking
                    ? `
                    <div class="p-4 rounded-2xl bg-white border border-slate-200 text-xs text-slate-600 flex items-center gap-3">
                      <span class="animate-spin text-base">⏳</span>
                      <span>Analizando tu agenda, horario escolar y balance de prioridades...</span>
                    </div>
                  `
                    : dialogueMessages
                        .map(
                          msg => `
                    <div class="flex gap-3 ${msg.role === 'assistant' ? 'items-start' : 'items-start flex-row-reverse'}">
                      <div class="w-7 h-7 rounded-xl flex items-center justify-center text-xs flex-shrink-0 ${
                        msg.role === 'assistant' ? 'bg-brand-500 text-white' : 'bg-slate-800 text-white'
                      }">
                        ${msg.role === 'assistant' ? '🤖' : '👤'}
                      </div>
                      <div class="max-w-[88%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                        msg.role === 'assistant'
                          ? 'bg-white text-slate-800 border border-slate-200/80 rounded-tl-sm shadow-sm'
                          : 'bg-brand-600 text-white rounded-tr-sm'
                      }">
                        ${formatMarkdownText(msg.content)}
                      </div>
                    </div>
                  `
                        )
                        .join('')
                }
              </div>

              <!-- Chips de Ajuste Rápido -->
              <div class="pt-2 border-t border-slate-200/60">
                <span class="text-[11px] font-semibold text-slate-500 block mb-1.5">Sugerencias de ajuste rápido:</span>
                <div class="flex flex-wrap gap-1.5">
                  <button type="button" class="plan-chip px-2.5 py-1 rounded-xl text-[11px] font-medium bg-white hover:bg-brand-50 text-slate-700 hover:text-brand-700 border border-slate-200 transition-colors" data-prompt="El profesor ha retrasado la entrega para más adelante, reajusta las fechas">
                    🔄 El profesor ha pospuesto la entrega
                  </button>
                  <button type="button" class="plan-chip px-2.5 py-1 rounded-xl text-[11px] font-medium bg-white hover:bg-brand-50 text-slate-700 hover:text-brand-700 border border-slate-200 transition-colors" data-prompt="Hoy estoy cansado, deja más tiempo libre y reduce el estudio a 30 minutos">
                    ⚖️ Dejar más tiempo libre hoy
                  </button>
                  <button type="button" class="plan-chip px-2.5 py-1 rounded-xl text-[11px] font-medium bg-white hover:bg-brand-50 text-slate-700 hover:text-brand-700 border border-slate-200 transition-colors" data-prompt="Prioriza un repaso activo para el examen más cercano">
                    🎯 Reforzar examen más cercano
                  </button>
                  <button type="button" class="plan-chip px-2.5 py-1 rounded-xl text-[11px] font-medium bg-white hover:bg-brand-50 text-slate-700 hover:text-brand-700 border border-slate-200 transition-colors" data-prompt="Añade 30 minutos de ejercicios de Matemáticas">
                    ➕ Añadir repaso de Matemáticas
                  </button>
                </div>
              </div>

              <!-- Input de diálogo interactivo -->
              <form id="plan-dialog-form" class="flex gap-2" autocomplete="off">
                <input 
                  type="text" 
                  id="plan-dialog-input" 
                  name="plan_dialog_query"
                  autocomplete="off"
                  autocorrect="off"
                  autocapitalize="off"
                  spellcheck="true"
                  data-lpignore="true"
                  placeholder="Escribe aquí un cambio (ej: 'El profe nos ha dicho que hagamos antes los problemas de Matemáticas')..."
                  class="flex-1 text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
                />
                <button 
                  type="submit" 
                  class="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 transition-colors flex items-center gap-1.5 flex-shrink-0"
                >
                  <span>Enviar</span>
                  <span>💬</span>
                </button>
              </form>
            </div>

            <!-- Previsualización de Bloques Sugeridos con Acciones Directas -->
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <div>
                  <h4 class="text-xs font-bold uppercase tracking-wider text-slate-700">Bloques de Estudio Recomendados</h4>
                  <p class="text-[11px] text-slate-500">Puedes retrasar fechas o cambiar duraciones directamente antes de guardarlos.</p>
                </div>
                <span class="text-xs font-bold text-brand-600 bg-brand-50 px-2.5 py-1 rounded-xl border border-brand-100">
                  ${suggestedBlocks.length} sesiones planificadas
                </span>
              </div>

              <div class="space-y-2.5" id="suggested-blocks-list">
                ${
                  suggestedBlocks.length === 0
                    ? `
                    <div class="p-6 text-center rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-400">
                      No hay nuevos bloques recomendados por ahora.
                    </div>
                  `
                    : suggestedBlocks
                        .map(
                          (b, idx) => `
                    <div class="p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm hover:border-brand-300 transition-all">
                      <div class="space-y-1">
                        <div class="flex items-center gap-2 flex-wrap">
                          <span class="font-bold text-xs text-slate-900">${b.title}</span>
                          <span class="text-[10px] font-bold px-2 py-0.5 rounded-md bg-brand-50 text-brand-700 border border-brand-200">
                            ${b.subject}
                          </span>
                        </div>
                        <p class="text-[11px] text-slate-500">${b.notes || ''}</p>
                      </div>

                      <div class="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100">
                        <div class="text-left sm:text-right pr-2">
                          <span class="block text-xs font-bold text-slate-800">${b.date} • ${b.startTime}</span>
                          <span class="text-[10px] text-slate-400">${b.durationMinutes} min</span>
                        </div>

                        <!-- Botón directo: Posponer / Retrasar +1 día -->
                        <button 
                          type="button" 
                          data-block-idx="${idx}" 
                          class="btn-postpone-suggested px-2.5 py-1.5 rounded-xl text-[11px] font-semibold text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200 transition-colors flex items-center gap-1"
                          title="Retrasar tarea 1 día (porque el profe lo ha indicado)"
                        >
                          <span>📅 +1d Retrasar</span>
                        </button>

                        <!-- Botón directo: Alternar Duración -->
                        <button 
                          type="button" 
                          data-block-idx="${idx}" 
                          class="btn-toggle-duration px-2.5 py-1.5 rounded-xl text-[11px] font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors flex items-center gap-1"
                          title="Alternar duración (30 min / 45 min / 60 min)"
                        >
                          <span>⏱️ ${b.durationMinutes}m</span>
                        </button>

                        <!-- Botón directo: Descartar bloque -->
                        <button 
                          type="button" 
                          data-block-idx="${idx}" 
                          class="btn-remove-suggested p-1.5 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Eliminar este bloque de la propuesta"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  `
                        )
                        .join('')
                }
              </div>
            </div>

          </div>

          <!-- Modal Footer: Guardado en IndexedDB -->
          <div class="px-6 py-4 border-t border-slate-100 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div class="flex items-center gap-1.5 text-xs text-slate-500">
              <span class="text-emerald-600 font-bold">🔒 Privacidad:</span>
              <span>Guardado en local (IndexedDB) • Tus hábitos son confidenciales</span>
            </div>

            <div class="flex items-center gap-2.5 w-full sm:w-auto justify-end">
              <button 
                type="button" 
                id="btn-cancel-plan-modal" 
                class="px-4 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-200/50 transition-colors"
              >
                Descartar
              </button>
              <button 
                type="button" 
                id="btn-apply-plan-modal" 
                class="px-5 py-2 rounded-xl text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 shadow-md shadow-brand-500/25 transition-all flex items-center gap-1.5"
              >
                <span>💾 Guardar en mi Agenda Personal (IndexedDB)</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    `;

    // Hook listeners
    container.querySelector('#btn-close-plan-modal')?.addEventListener('click', callbacks.onClose);
    container.querySelector('#btn-cancel-plan-modal')?.addEventListener('click', callbacks.onClose);

    // Formulario de diálogo interactivo
    const form = container.querySelector('#plan-dialog-form');
    form?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const input = container.querySelector('#plan-dialog-input') as HTMLInputElement;
      if (input && input.value.trim()) {
        const text = input.value.trim();
        input.value = '';
        await handleUserInstruction(text);
      }
    });

    // Chips interactivos
    const chips = container.querySelectorAll<HTMLButtonElement>('.plan-chip');
    chips.forEach(chip => {
      chip.addEventListener('click', async () => {
        const prompt = chip.dataset.prompt;
        if (prompt) {
          await handleUserInstruction(prompt);
        }
      });
    });

    // Posponer bloque sugerido (+1 día)
    const postponeBtns = container.querySelectorAll<HTMLButtonElement>('.btn-postpone-suggested');
    postponeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = Number(btn.dataset.blockIdx);
        if (suggestedBlocks[idx]) {
          const currentD = new Date(suggestedBlocks[idx].date);
          currentD.setDate(currentD.getDate() + 1);
          suggestedBlocks[idx].date = currentD.toISOString().split('T')[0];
          suggestedBlocks[idx].notes = `${suggestedBlocks[idx].notes || ''} (Poscurrido 1 día por indicación del profesor)`.trim();
          render();
        }
      });
    });

    // Alternar duración
    const durationBtns = container.querySelectorAll<HTMLButtonElement>('.btn-toggle-duration');
    durationBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = Number(btn.dataset.blockIdx);
        if (suggestedBlocks[idx]) {
          const currentDur = suggestedBlocks[idx].durationMinutes;
          suggestedBlocks[idx].durationMinutes = currentDur === 30 ? 45 : currentDur === 45 ? 60 : 30;
          render();
        }
      });
    });

    // Eliminar bloque sugerido
    const removeBtns = container.querySelectorAll<HTMLButtonElement>('.btn-remove-suggested');
    removeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = Number(btn.dataset.blockIdx);
        suggestedBlocks.splice(idx, 1);
        render();
      });
    });

    // Guardar en IndexedDB
    const applyBtn = container.querySelector('#btn-apply-plan-modal');
    applyBtn?.addEventListener('click', async () => {
      if (applyBtn) applyBtn.innerHTML = `<span>⏳ Guardando en IndexedDB...</span>`;
      try {
        for (const block of suggestedBlocks) {
          await db.studyBlocks.add({
            ...block,
            gradeKey: currentGrade,
            origin: block.origin || 'student',
            syncedWithGoogle: false
          });
        }
        callbacks.onApplied();
      } catch (err: any) {
        alert(err.message || 'Error al persistir en IndexedDB');
      }
    });

    // Auto-scroll del historial
    const historyEl = container.querySelector('#plan-dialog-history');
    if (historyEl) historyEl.scrollTop = historyEl.scrollHeight;
  }

  // Ejecución inicial del diálogo
  async function initDialogue() {
    isThinking = true;
    render();

    const result = await aiClientService.generatePlanificationDialogue(currentBlocks);
    dialogueMessages.push({
      id: `msg_plan_${Date.now()}`,
      role: 'assistant',
      content: result.message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
    suggestedBlocks = result.suggestedBlocks;
    isThinking = false;
    render();
  }

  // Interacción continua con el estudiante
  async function handleUserInstruction(text: string) {
    dialogueMessages.push({
      id: `msg_u_${Date.now()}`,
      role: 'student',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
    isThinking = true;
    render();

    const result = await aiClientService.generatePlanificationDialogue(
      currentBlocks, 
      text, 
      dialogueMessages
    );

    dialogueMessages.push({
      id: `msg_a_${Date.now()}`,
      role: 'assistant',
      content: result.message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

    // Actualizar propuesta si el asistente devolvió nuevos bloques adaptados
    if (result.suggestedBlocks && result.suggestedBlocks.length > 0) {
      suggestedBlocks = result.suggestedBlocks;
    }
    isThinking = false;
    render();
  }

  function formatMarkdownText(text: string): string {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n\n/g, '<br/><br/>')
      .replace(/\n/g, '<br/>');
  }

  initDialogue();
}

import { db, ensureGradeSpecificAgendaBlocks } from '../../services/storage';
import { googleCalendarService } from '../../services/google-calendar';
import { aiClientService, STATIC_PROMPTS } from '../../services/ai-client';
import { googleAuthService } from '../../services/google-auth';
import { educationalApiService } from '../../services/educational-api';
import { renderPromptViewerModal } from '../modals/prompt-viewer-modal';
import { t } from '../../services/i18n';
import type { StudyBlock, EventType } from '../../types/agenda';

export function renderAgendaView(container: HTMLElement): void {
  async function loadData() {
    await ensureGradeSpecificAgendaBlocks();
    const allBlocks = await db.studyBlocks.toArray();
    const auth = googleAuthService.getState();
    const currentGrade = auth.user?.gradeKey || '1eso';
    // Filter strictly by connected student grade (or 'both')
    const blocks = allBlocks.filter(b => b.gradeKey === currentGrade || b.gradeKey === 'both' || !b.gradeKey);
    renderContent(blocks);
  }

  function renderContent(blocks: StudyBlock[]) {
    const auth = googleAuthService.getState();
    const currentUser = auth.user;
    const currentGrade = currentUser?.gradeKey || '1eso';
    const totalBlocks = blocks.length;
    const completedBlocks = blocks.filter(b => b.completed).length;
    const syncedBlocks = blocks.filter(b => b.syncedWithGoogle).length;

    // Detect next exam or milestone dynamically
    const nextExam = blocks.find(b => b.type === 'exam') || blocks[0];
    const examTitle = nextExam ? `${nextExam.subject}: ${nextExam.title}` : 'Sin exámenes programados';

    container.innerHTML = `
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        <!-- Top Banner / Summary Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          <!-- Card 1: Próximos Exámenes -->
          <div class="glass-panel p-5 rounded-3xl glow-card relative overflow-hidden">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold uppercase tracking-wider text-slate-500">${t('agenda.nextMilestone')}</span>
              <span class="text-xl">🎯</span>
            </div>
            <div class="mt-3">
              <span class="text-2xl font-display font-extrabold text-slate-900">${t('agenda.inDays')}</span>
              <p class="text-xs text-slate-600 mt-1 font-medium truncate" title="${examTitle}">${examTitle}</p>
            </div>
            <div class="mt-3 flex items-center gap-1.5 text-[11px] font-semibold text-brand-600">
              <span>${t('agenda.recommendedToday')}</span>
            </div>
          </div>

          <!-- Card 2: Horas de Estudio Planificadas -->
          <div class="glass-panel p-5 rounded-3xl glow-card relative overflow-hidden">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold uppercase tracking-wider text-slate-500">${t('agenda.weeklyProgress')}</span>
              <span class="text-xl">⏱️</span>
            </div>
            <div class="mt-3">
              <div class="flex items-baseline gap-2">
                <span class="text-2xl font-display font-extrabold text-slate-900">${completedBlocks} / ${totalBlocks}</span>
                <span class="text-xs text-slate-500 font-medium">${t('agenda.blocksCompleted')}</span>
              </div>
              <div class="w-full bg-slate-100 rounded-full h-2 mt-2 overflow-hidden">
                <div class="bg-brand-500 h-2 rounded-full transition-all duration-500" style="width: ${totalBlocks ? (completedBlocks / totalBlocks) * 100 : 0}%"></div>
              </div>
            </div>
            <div class="mt-2 text-[11px] text-slate-500 flex justify-between">
              <span>${t('agenda.activeMethod')}</span>
              <span class="font-bold text-slate-700">${Math.round(totalBlocks ? (completedBlocks / totalBlocks) * 100 : 0)}%</span>
            </div>
          </div>

          <!-- Card 3: Google Calendar Sync -->
          <div class="glass-panel p-5 rounded-3xl glow-card relative overflow-hidden">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold uppercase tracking-wider text-slate-500">${t('agenda.googleCalendar')}</span>
              <span class="text-xl">📅</span>
            </div>
            <div class="mt-3">
              <span class="text-2xl font-display font-extrabold text-slate-900">${syncedBlocks} / ${totalBlocks}</span>
              <p class="text-xs text-slate-500 mt-1">${t('agenda.syncedEvents')}</p>
            </div>
            <div class="mt-3">
              <button id="btn-sync-calendar" class="w-full py-1.5 px-3 rounded-xl text-xs font-bold text-brand-700 bg-brand-50 hover:bg-brand-100 transition-colors flex items-center justify-center gap-1.5">
                <span>${t('agenda.syncAll')}</span>
              </button>
            </div>
          </div>

        </div>

        <!-- Section Header & Filter / Add Block -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
          <div>
            <div class="flex items-center gap-2 flex-wrap">
              <h2 class="text-xl font-display font-bold text-slate-900">
                ${t('agenda.title')}
              </h2>
              <span class="text-xs px-2.5 py-0.5 rounded-full ${currentGrade === '1eso' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-purple-100 text-purple-800 border border-purple-300'} font-bold">
                ${currentUser?.name || 'Estudiante'} • ${currentUser?.gradeLevel || '1º de ESO'}
              </span>
            </div>
            <p class="text-xs text-slate-500 mt-0.5">${t('agenda.subtitle')}</p>
          </div>

          <div class="flex items-center gap-2 flex-wrap">
            <button id="btn-view-agenda-prompt" class="px-3 py-2 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-all flex items-center gap-1.5" title="Ver Prompt de Sección: Planificador de Agenda">
              <span>📄</span>
              <span>Prompt Agenda</span>
            </button>
            <button id="btn-view-agenda-curricular" class="px-3 py-2 rounded-2xl bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 text-xs font-semibold transition-all flex items-center gap-1.5" title="Ver Directriz Curricular Departamental provista por la API educativa">
              <span>🏛️</span>
              <span>Directriz API Educativa</span>
            </button>
            <button id="btn-ai-plan" class="px-3.5 py-2 rounded-2xl bg-brand-50 hover:bg-brand-100 text-brand-700 border border-brand-200 text-xs font-bold transition-all flex items-center gap-1.5">
              <span>🤖</span>
              <span>Planificar con IA</span>
            </button>
            <button id="btn-new-block" class="px-4 py-2 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-md shadow-brand-500/20 transition-all flex items-center gap-1.5">
              <span>＋</span>
              <span>${t('agenda.addBlock')}</span>
            </button>
          </div>
        </div>

        <!-- Schedule Items List -->
        <div class="space-y-3" id="blocks-list">
          ${
            blocks.length === 0
              ? `
              <div class="p-12 text-center glass-panel rounded-3xl">
                <span class="text-4xl">📅</span>
                <p class="mt-2 text-sm font-semibold text-slate-700">${t('agenda.emptyTitle')}</p>
                <p class="text-xs text-slate-400">${t('agenda.emptyDesc')}</p>
              </div>
            `
              : blocks
                  .map(
                    block => `
              <div class="glass-panel p-4 sm:p-5 rounded-2xl glow-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-l-4 ${
                block.type === 'exam'
                  ? 'border-l-accent-amber'
                  : block.type === 'assignment_due'
                  ? 'border-l-accent-cyan'
                  : 'border-l-brand-500'
              } ${block.completed ? 'opacity-60 bg-slate-50/50' : ''}">
                
                <!-- Left Details -->
                <div class="flex items-start gap-3.5">
                  <input 
                    type="checkbox" 
                    data-id="${block.id}" 
                    class="block-checkbox mt-1 w-5 h-5 rounded-lg text-brand-600 focus:ring-brand-500 cursor-pointer border-slate-300"
                    ${block.completed ? 'checked' : ''} 
                  />
                  <div>
                    <div class="flex items-center gap-2 flex-wrap">
                      <span class="font-bold text-sm text-slate-900 ${block.completed ? 'line-through text-slate-500' : ''}">${block.title}</span>
                      <span class="px-2 py-0.5 rounded-md text-[10px] font-bold ${
                        block.type === 'exam'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : block.type === 'assignment_due'
                          ? 'bg-cyan-50 text-cyan-700 border border-cyan-200'
                          : 'bg-brand-50 text-brand-700 border border-brand-200'
                      }">
                        ${block.subject}
                      </span>
                      ${
                        block.syncedWithGoogle
                          ? `<span class="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                              <span>✓</span> ${t('agenda.synced')}
                            </span>`
                          : `<span class="inline-flex items-center gap-1 text-[10px] font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">
                              ${t('agenda.pendingSync')}
                            </span>`
                      }
                    </div>
                    <p class="text-xs text-slate-500 mt-1">${block.notes || ''}</p>
                  </div>
                </div>

                <!-- Right Timing & Actions -->
                <div class="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100">
                  <div class="text-left sm:text-right">
                    <span class="block text-xs font-bold text-slate-800">${block.date} • ${block.startTime}</span>
                    <span class="text-[11px] text-slate-400">${block.durationMinutes} ${t('agenda.minRecommended')}</span>
                  </div>

                  <button data-delete-id="${block.id}" class="btn-delete-block p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors" title="Eliminar">
                    🗑️
                  </button>
                </div>

              </div>
            `
                  )
                  .join('')
          }
        </div>

        <!-- Add Block Modal Container -->
        <div id="new-block-modal" class="hidden fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div class="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 border border-slate-100">
            <h3 class="font-display font-bold text-lg text-slate-900 mb-1">${t('agenda.modalTitle')}</h3>
            <p class="text-xs text-slate-500 mb-4">${t('agenda.modalSubtitle')}</p>

            <form id="new-block-form" class="space-y-3">
              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">${t('agenda.fieldActivity')}</label>
                <input type="text" id="nb-title" placeholder="Ej. Repaso de vocabulario" required class="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500" />
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-xs font-bold text-slate-700 mb-1">${t('agenda.fieldSubject')}</label>
                  <select id="nb-subject" class="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500">
                    <option value="Matemáticas">Matemáticas</option>
                    <option value="Biología">Biología</option>
                    <option value="Historia">Historia</option>
                    <option value="Física y Química">Física y Química</option>
                    <option value="Lengua y Literatura">Lengua y Literatura</option>
                    <option value="Inglés">Inglés</option>
                  </select>
                </div>
                <div>
                  <label class="block text-xs font-bold text-slate-700 mb-1">${t('agenda.fieldType')}</label>
                  <select id="nb-type" class="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500">
                    <option value="study_session">${t('agenda.types.study_session')}</option>
                    <option value="exam">${t('agenda.types.exam')}</option>
                    <option value="assignment_due">${t('agenda.types.assignment_due')}</option>
                  </select>
                </div>
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-xs font-bold text-slate-700 mb-1">${t('agenda.fieldDate')}</label>
                  <input type="date" id="nb-date" value="${new Date().toISOString().split('T')[0]}" required class="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500" />
                </div>
                <div>
                  <label class="block text-xs font-bold text-slate-700 mb-1">${t('agenda.fieldTime')}</label>
                  <input type="time" id="nb-time" value="17:00" required class="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500" />
                </div>
              </div>

              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">${t('agenda.fieldNotes')}</label>
                <input type="text" id="nb-notes" placeholder="Ej. Resolver 3 ejercicios de examen" class="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500" />
              </div>

              <div class="pt-3 flex justify-end gap-2 border-t border-slate-100">
                <button type="button" id="btn-cancel-nb" class="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100">${t('agenda.cancel')}</button>
                <button type="submit" class="px-4 py-1.5 rounded-xl text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 shadow-md shadow-brand-500/20">${t('agenda.save')}</button>
              </div>
            </form>
          </div>
        </div>

      </div>
    `;

    // Event listeners
    const checkboxes = container.querySelectorAll<HTMLInputElement>('.block-checkbox');
    checkboxes.forEach(cb => {
      cb.addEventListener('change', async () => {
        const id = Number(cb.dataset.id);
        await db.studyBlocks.update(id, { completed: cb.checked });
        loadData();
      });
    });

    const deleteBtns = container.querySelectorAll<HTMLButtonElement>('.btn-delete-block');
    deleteBtns.forEach(btn => {
      btn.addEventListener('click', async () => {
        const id = Number(btn.dataset.deleteId);
        await db.studyBlocks.delete(id);
        loadData();
      });
    });

    // Calendar sync button
    const syncBtn = container.querySelector('#btn-sync-calendar');
    syncBtn?.addEventListener('click', async () => {
      if (syncBtn) syncBtn.innerHTML = `<span>${t('agenda.syncing')}</span>`;
      try {
        await googleCalendarService.syncAllPendingBlocks();
        await loadData();
      } catch (err: any) {
        alert(err.message || 'Error al sincronizar con Google Calendar');
      }
    });

    // Prompt Viewer modal trigger (Section Prompt)
    container.querySelector('#btn-view-agenda-prompt')?.addEventListener('click', () => {
      const modalRoot = document.getElementById('modal-root') || document.body;
      renderPromptViewerModal(
        modalRoot, 
        'Prompt Estático: Planificador de Agenda (agenda_planner.md)', 
        STATIC_PROMPTS.agenda, 
        { 
          subtitle: 'Prompt Transversal de Sección (Metodología Spaced Repetition)',
          onClose: () => { modalRoot.innerHTML = ''; } 
        }
      );
    });

    // Curricular Prompt modal trigger (Institutional Educational API)
    container.querySelector('#btn-view-agenda-curricular')?.addEventListener('click', async () => {
      const modalRoot = document.getElementById('modal-root') || document.body;
      const curricularData = await educationalApiService.getDepartmentalPrompt('Lengua Castellana y Literatura', currentGrade);
      renderPromptViewerModal(
        modalRoot,
        curricularData.subject,
        curricularData.promptMarkdown,
        {
          subtitle: `Directriz Curricular Departamental para ${curricularData.gradeLevel}`,
          institution: curricularData.institution,
          sourceApi: curricularData.sourceApi,
          gradeLevel: curricularData.gradeLevel,
          onClose: () => { modalRoot.innerHTML = ''; }
        }
      );
    });

    // AI Study Plan Workflow trigger
    const aiPlanBtn = container.querySelector('#btn-ai-plan');
    aiPlanBtn?.addEventListener('click', async () => {
      if (aiPlanBtn) aiPlanBtn.innerHTML = `<span>⏳ Planificando...</span>`;
      try {
        const examSubject = currentGrade === '1eso' ? 'Ciencias Naturales' : 'Filosofía y Matemáticas II';
        const blocks = await aiClientService.generateStudyPlan(examSubject, 'Preparación de Hitos Semanales');
        for (const b of blocks) {
          await db.studyBlocks.add({
            ...b,
            gradeKey: currentGrade
          });
        }
        await loadData();
      } catch (err: any) {
        alert(err.message || 'Error al ejecutar flujo de planificación IA');
      } finally {
        if (aiPlanBtn) aiPlanBtn.innerHTML = `<span>🤖 Planificar con IA</span>`;
      }
    });

    // New block modal listeners
    const modal = container.querySelector('#new-block-modal');
    container.querySelector('#btn-new-block')?.addEventListener('click', () => {
      modal?.classList.remove('hidden');
    });
    container.querySelector('#btn-cancel-nb')?.addEventListener('click', () => {
      modal?.classList.add('hidden');
    });

    const form = container.querySelector('#new-block-form');
    form?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const title = (container.querySelector('#nb-title') as HTMLInputElement).value;
      const subject = (container.querySelector('#nb-subject') as HTMLSelectElement).value;
      const type = (container.querySelector('#nb-type') as HTMLSelectElement).value as EventType;
      const date = (container.querySelector('#nb-date') as HTMLInputElement).value;
      const startTime = (container.querySelector('#nb-time') as HTMLInputElement).value;
      const notes = (container.querySelector('#nb-notes') as HTMLInputElement).value;

      await db.studyBlocks.add({
        title,
        subject,
        type,
        date,
        startTime,
        durationMinutes: 45,
        completed: false,
        gradeKey: currentGrade,
        notes,
        syncedWithGoogle: true,
        googleEventId: `gcal_${Date.now()}`
      });

      modal?.classList.add('hidden');
      loadData();
    });
  }

  loadData();
}

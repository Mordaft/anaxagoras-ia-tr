import { db, ensureGradeSpecificAgendaBlocks } from '../../services/storage';
import { googleCalendarService } from '../../services/google-calendar';
import { aiClientService } from '../../services/ai-client';
import { googleAuthService } from '../../services/google-auth';
import { educationalApiService } from '../../services/educational-api';
import { promptOrchestratorService } from '../../services/prompt-orchestrator';
import { renderPromptViewerModal } from '../modals/prompt-viewer-modal';
import { renderPlanificationModal } from '../modals/planification-modal';
import { t } from '../../services/i18n';
import type { StudyBlock, EventType } from '../../types/agenda';

export function renderAgendaView(container: HTMLElement): void {
  let activeInstitutionalAlert: { message: string; title: string; subject: string } | null = null;

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
    const syncedBlocks = blocks.filter(b => b.syncedWithGoogle).length;

    // Métricas diagnósticas avanzadas
    const stats = aiClientService.calculateAgendaStats(blocks);
    const topUrgent = stats.urgentPriorities[0];

    const gradeSubjects = currentGrade === '2batx'
      ? ['Lengua Castellana', 'Historia de España', 'Matemáticas II', 'Filosofía', 'Química', 'Inglés']
      : ['Lengua Castellana', 'Matemáticas', 'Ciencias Naturales', 'Ciencias Sociales', 'Inglés'];

    container.innerHTML = `
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        <!-- Top Banner / Summary Cards: Los 4 pilares de avance y tiempo -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <!-- Card 1: Próximos Exámenes e Hitos Urgentes -->
          <div class="glass-panel p-5 rounded-3xl glow-card relative overflow-hidden flex flex-col justify-between">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold uppercase tracking-wider text-slate-500">🎯 Prioridad Urgente</span>
              <span class="text-xl">⚡</span>
            </div>
            <div class="mt-3">
              ${
                topUrgent
                  ? `
                  <span class="text-2xl font-display font-extrabold text-slate-900 block truncate" title="${topUrgent.title}">
                    ${topUrgent.subject}
                  </span>
                  <p class="text-xs text-amber-800 font-semibold mt-1">
                    ${topUrgent.type === 'exam' ? '📝 Examen' : '📦 Entrega'} • ${topUrgent.daysLeft === 0 ? '¡Hoy mismo!' : topUrgent.daysLeft === 1 ? 'Mañana' : `En ${topUrgent.daysLeft} días`}
                  </p>
                `
                  : `
                  <span class="text-xl font-display font-extrabold text-emerald-700">Sin urgencias</span>
                  <p class="text-xs text-slate-500 mt-1">Ritmo constante y espaciado</p>
                `
              }
            </div>
            <div class="mt-3 flex items-center gap-1.5 text-[11px] font-semibold text-brand-600 border-t border-slate-100 pt-2">
              <span>${topUrgent ? topUrgent.title : 'Organización autónoma al día'}</span>
            </div>
          </div>

          <!-- Card 2: Distribución de la Tarde (Post-Clases) -->
          <div class="glass-panel p-5 rounded-3xl glow-card relative overflow-hidden flex flex-col justify-between">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold uppercase tracking-wider text-slate-500">⏱️ Tu Tarde (Hoy)</span>
              <span class="text-xl">🏖️</span>
            </div>
            <div class="mt-3">
              <div class="flex items-baseline gap-1.5">
                <span class="text-2xl font-display font-extrabold text-slate-900">${stats.afternoonDistribution.freeTimeHours} h</span>
                <span class="text-xs text-brand-700 font-bold">tiempo libre</span>
              </div>
              <p class="text-xs text-slate-500 mt-1">
                Salida a las 15:00 • <strong>${stats.afternoonDistribution.todayStudyMinutes} min</strong> estudio hoy
              </p>
            </div>
            <div class="mt-3 text-[11px] text-slate-500 flex justify-between border-t border-slate-100 pt-2">
              <span class="text-emerald-700 font-semibold">✓ Descanso protegido</span>
              <span class="text-slate-400">Sin saturación</span>
            </div>
          </div>

          <!-- Card 3: Avance de Deberes y Entregas -->
          <div class="glass-panel p-5 rounded-3xl glow-card relative overflow-hidden flex flex-col justify-between">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold uppercase tracking-wider text-slate-500">📝 Avance de Deberes</span>
              <span class="text-xl">📋</span>
            </div>
            <div class="mt-3">
              <div class="flex items-baseline gap-2">
                <span class="text-2xl font-display font-extrabold text-slate-900">${stats.homeworkProgress.completed} / ${stats.homeworkProgress.total}</span>
                <span class="text-xs text-slate-500 font-medium">entregas listas</span>
              </div>
              <div class="w-full bg-slate-100 rounded-full h-2 mt-2 overflow-hidden">
                <div class="bg-cyan-500 h-2 rounded-full transition-all duration-500" style="width: ${stats.homeworkProgress.percentage}%"></div>
              </div>
            </div>
            <div class="mt-2 text-[11px] text-slate-500 flex justify-between border-t border-slate-100 pt-2">
              <span>Tasa de entrega</span>
              <span class="font-bold text-slate-700">${stats.homeworkProgress.percentage}%</span>
            </div>
          </div>

          <!-- Card 4: Sincronización Google Calendar & Privacidad Local -->
          <div class="glass-panel p-5 rounded-3xl glow-card relative overflow-hidden flex flex-col justify-between">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold uppercase tracking-wider text-slate-500">🔒 IndexedDB & Calendar</span>
              <span class="text-xl">📅</span>
            </div>
            <div class="mt-3">
              <div class="flex items-center gap-1.5">
                <span class="text-2xl font-display font-extrabold text-slate-900">${syncedBlocks} / ${totalBlocks}</span>
                <span class="text-xs text-slate-500">sincronizados</span>
              </div>
              <p class="text-[11px] text-emerald-700 font-semibold mt-1">100% guardado en tu navegador</p>
            </div>
            <div class="mt-3 border-t border-slate-100 pt-2">
              <button id="btn-sync-calendar" class="w-full py-1.5 px-3 rounded-xl text-xs font-bold text-brand-700 bg-brand-50 hover:bg-brand-100 transition-colors flex items-center justify-center gap-1.5">
                <span>${t('agenda.syncAll')}</span>
              </button>
            </div>
          </div>

        </div>

        <!-- Barra Visual de Balance de Repaso por Asignatura -->
        ${
          stats.subjectBreakdown.length > 0
            ? `
            <div class="glass-panel p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div class="flex items-center gap-2">
                <span class="text-base">📊</span>
                <span class="font-bold text-slate-800 uppercase tracking-wider text-[11px]">Dedicación por Asignatura:</span>
              </div>
              <div class="flex items-center gap-2 flex-wrap flex-1 sm:justify-end">
                ${stats.subjectBreakdown
                  .map(
                    (s, i) => `
                  <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-[11px] font-semibold border ${
                    i === 0
                      ? 'bg-brand-50 text-brand-700 border-brand-200'
                      : i === 1
                      ? 'bg-purple-50 text-purple-700 border-purple-200'
                      : 'bg-slate-100 text-slate-700 border-slate-200'
                  }">
                    <span>${s.subject}:</span>
                    <strong class="font-bold">${s.minutes} min</strong>
                    <span class="text-[10px] text-slate-400">(${s.percentage}%)</span>
                  </span>
                `
                  )
                  .join('')}
              </div>
            </div>
          `
            : ''
        }

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
            <button id="btn-view-agenda-prompt" class="px-3 py-2 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-all flex items-center gap-1.5" title="${t('agenda.tooltipPromptPlanner')}">
              <span>📄</span>
              <span>${t('agenda.btnPromptPlanner')}</span>
            </button>
            <button id="btn-view-agenda-curricular" class="px-3 py-2 rounded-2xl bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 text-xs font-semibold transition-all flex items-center gap-1.5" title="${t('agenda.tooltipCurricularDirective')}">
              <span>🏛️</span>
              <span>${t('agenda.btnCurricularDirective')}</span>
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

        <!-- Alerta colaborativa de avance comunicada por el centro educativo -->
        ${
          activeInstitutionalAlert
            ? `
            <div class="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-950 via-indigo-950 to-slate-900 p-5 text-white shadow-xl border border-purple-500/30 animate-fadeIn">
              <div class="absolute -right-6 -bottom-6 w-36 h-36 bg-purple-500/15 rounded-full blur-2xl pointer-events-none"></div>
              <div class="flex items-start justify-between gap-4 relative z-10">
                <div class="flex items-start gap-3.5">
                  <div class="w-10 h-10 rounded-2xl bg-purple-500/20 border border-purple-400/40 flex items-center justify-center text-xl flex-shrink-0 shadow-inner">
                    🏛️
                  </div>
                  <div>
                    <div class="flex items-center gap-2 flex-wrap">
                      <span class="text-xs uppercase tracking-wider font-extrabold text-purple-300">
                        Novedad Colaborativa Escolar • ${activeInstitutionalAlert.subject}
                      </span>
                      <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/30 text-purple-200 border border-purple-400/30">
                        Avance Curricular Docente
                      </span>
                    </div>
                    <p class="text-sm font-semibold text-white mt-1">
                      ${activeInstitutionalAlert.message}
                    </p>
                    <div class="mt-2.5 inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 text-xs text-purple-100">
                      <span>📌 Agendada nueva tarea en tu agenda escolar:</span>
                      <strong class="font-bold text-white">${activeInstitutionalAlert.title}</strong>
                    </div>
                  </div>
                </div>
                <button 
                  id="btn-dismiss-inst-alert" 
                  class="p-1.5 text-purple-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors flex-shrink-0 text-sm font-bold"
                  title="Cerrar notificación"
                >
                  ✕
                </button>
              </div>
            </div>
          `
            : ''
        }

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
                        block.origin === 'student'
                          ? `<span class="inline-flex items-center gap-1 text-[10px] font-semibold text-slate-600 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-md" title="Tarea planificada autónomamente por el alumno">
                              <span>👤</span> Personal
                            </span>`
                          : `<span class="inline-flex items-center gap-1 text-[10px] font-bold text-purple-700 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded-md" title="Comunicado por el centro educativo (Esfer@ / Departament d'Educació)">
                              <span>🏛️</span> Entidad Educativa
                            </span>`
                      }
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
                    ${
                      block.teacherNotes
                        ? `
                        <div class="mt-1.5 p-2 rounded-xl bg-purple-50/70 border border-purple-200/60 flex items-start gap-1.5 text-[11px] text-purple-900">
                          <span class="text-xs flex-shrink-0">📢</span>
                          <span><strong>Profesor:</strong> ${block.teacherNotes}</span>
                        </div>
                      `
                        : ''
                    }
                  </div>
                </div>

                <!-- Right Timing & Actions -->
                <div class="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100">
                  <div class="text-left sm:text-right pr-1">
                    <span class="block text-xs font-bold text-slate-800">${block.date} • ${block.startTime}</span>
                    <span class="text-[11px] text-slate-400">${block.durationMinutes} ${t('agenda.minRecommended')}</span>
                  </div>

                  <!-- Acción directa: Posponer +1 día -->
                  <button 
                    data-postpone-id="${block.id}" 
                    class="btn-postpone-block px-2.5 py-1.5 text-[11px] font-semibold text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-xl transition-colors flex items-center gap-1" 
                    title="Posponer / Retrasar 1 día en IndexedDB (si el profesor ha dado más margen)"
                  >
                    <span>📅 +1d</span>
                  </button>

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
                    ${gradeSubjects.map(s => `<option value="${s}">${s}</option>`).join('')}
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
    container.querySelector('#btn-dismiss-inst-alert')?.addEventListener('click', () => {
      activeInstitutionalAlert = null;
      loadData();
    });

    const checkboxes = container.querySelectorAll<HTMLInputElement>('.block-checkbox');
    checkboxes.forEach(cb => {
      cb.addEventListener('change', async () => {
        const id = Number(cb.dataset.id);
        const isChecked = cb.checked;
        await db.studyBlocks.update(id, { completed: isChecked });

        if (isChecked) {
          const updatedBlock = await db.studyBlocks.get(id);
          if (updatedBlock) {
            const progression = await educationalApiService.checkAndTriggerCollaborativeProgression(updatedBlock);
            if (progression) {
              activeInstitutionalAlert = {
                message: progression.notificationMessage,
                title: progression.block.title,
                subject: progression.sourceSubject
              };
            }
          }
        }

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

    const postponeBtns = container.querySelectorAll<HTMLButtonElement>('.btn-postpone-block');
    postponeBtns.forEach(btn => {
      btn.addEventListener('click', async () => {
        const id = Number(btn.dataset.postponeId);
        const block = await db.studyBlocks.get(id);
        if (block) {
          const d = new Date(block.date);
          d.setDate(d.getDate() + 1);
          const newDate = d.toISOString().split('T')[0];
          await db.studyBlocks.update(id, { 
            date: newDate,
            rescheduledCount: (block.rescheduledCount || 0) + 1,
            notes: `${block.notes ? block.notes + ' • ' : ''}📅 Pospuesto +1d`.trim()
          });
          loadData();
        }
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

    // Prompt Viewer modal trigger (Section Prompt & Multi-Layer Graph)
    container.querySelector('#btn-view-agenda-prompt')?.addEventListener('click', () => {
      const modalRoot = document.getElementById('modal-root') || document.body;
      const assembled = promptOrchestratorService.assemblePrompt({
        role: 'agenda',
        gradeKey: currentGrade,
        subject: 'Lengua Castellana y Literatura'
      });
      renderPromptViewerModal(
        modalRoot, 
        t('agenda.modalPlannerTitle'), 
        assembled.systemInstruction, 
        { 
          assembledPrompt: assembled,
          subtitle: t('agenda.modalPlannerSubtitle'),
          onClose: () => { modalRoot.innerHTML = ''; } 
        }
      );
    });

    // Curricular Prompt modal trigger (Institutional Educational API)
    container.querySelector('#btn-view-agenda-curricular')?.addEventListener('click', async () => {
      const modalRoot = document.getElementById('modal-root') || document.body;
      const assembled = promptOrchestratorService.assemblePrompt({
        role: 'agenda',
        gradeKey: currentGrade,
        subject: 'Lengua Castellana y Literatura'
      });
      renderPromptViewerModal(
        modalRoot,
        assembled.layers.level2BaseTopic.title,
        assembled.layers.level2BaseTopic.content,
        {
          assembledPrompt: assembled,
          subtitle: t('agenda.modalCurricularSubtitle', { grade: currentGrade === '2batx' ? '2º Bachillerato' : '1º de ESO' }),
          institution: "Departament d'Educació de la Generalitat de Catalunya (Esfer@)",
          sourceApi: `https://api.educacio.gencat.cat/v1/curriculum/guardrails?grade=${currentGrade}`,
          gradeLevel: currentGrade === '2batx' ? '2º de Bachillerato' : '1º de ESO',
          onClose: () => { modalRoot.innerHTML = ''; }
        }
      );
    });

    // AI Study Plan Workflow trigger -> Abre la pantalla de planificación socrática interactiva
    const aiPlanBtn = container.querySelector('#btn-ai-plan');
    aiPlanBtn?.addEventListener('click', () => {
      const modalRoot = document.getElementById('modal-root') || document.body;
      renderPlanificationModal(modalRoot, {
        onApplied: () => {
          modalRoot.innerHTML = '';
          loadData();
        },
        onClose: () => {
          modalRoot.innerHTML = '';
        }
      });
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
        origin: 'student',
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

import { db, ensureLenguaCastellanaTasks } from '../../services/storage';
import { googleDriveService } from '../../services/google-drive';
import { googleAuthService } from '../../services/google-auth';
import { promptOrchestratorService } from '../../services/prompt-orchestrator';
import { renderPromptViewerModal } from '../modals/prompt-viewer-modal';
import { t } from '../../services/i18n';
import type { ProjectTask, TaskPhase } from '../../types/tasks';
import type { StudentGrade } from '../../types/auth';

// Module-level persistent active detail task id
let currentDetailTaskId: number | null = null;

export function renderTasksView(container: HTMLElement): void {
  async function loadData() {
    await ensureLenguaCastellanaTasks();
    const tasks = await db.projectTasks.toArray();
    renderContent(tasks);
  }

  function calculateTaskScore(task: ProjectTask): number {
    if (!task.criteria || task.criteria.length === 0) return 100;
    const completed = task.criteria.filter(c => c.checked).length;
    return Math.round((completed / task.criteria.length) * 100);
  }

  function getFileIcon(mimeType: string): string {
    if (mimeType.includes('document')) return '📄';
    if (mimeType.includes('presentation') || mimeType.includes('slides')) return '📊';
    if (mimeType.includes('spreadsheet') || mimeType.includes('sheet')) return '📈';
    return '📑';
  }

  function getPhaseLabel(phase: TaskPhase): string {
    switch (phase) {
      case 'planning': return t('tasks.phases.planning');
      case 'research': return t('tasks.phases.research');
      case 'writing': return t('tasks.phases.writing');
      case 'review': return t('tasks.phases.review');
      default: return phase;
    }
  }

  function getPhaseBadgeColor(phase: TaskPhase): string {
    switch (phase) {
      case 'planning': return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'research': return 'bg-cyan-50 text-cyan-700 border-cyan-200';
      case 'writing': return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'review': return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      default: return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  }

  function renderPhaseBadge(taskId: number, phase: TaskPhase, label: string, currentPhase: TaskPhase): string {
    const isCurrent = currentPhase === phase;
    return `
      <button 
        data-task-id="${taskId}" 
        data-phase="${phase}" 
        class="phase-badge-btn py-2 px-3 rounded-xl text-xs font-bold text-center transition-all ${
          isCurrent
            ? 'bg-brand-600 text-white shadow-md shadow-brand-500/25 ring-2 ring-brand-500/20'
            : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
        }"
      >
        ${label}
      </button>
    `;
  }

  function renderContent(tasks: ProjectTask[]) {
    const auth = googleAuthService.getState();
    const currentStudent = auth.user;
    const currentGrade: StudentGrade = (currentStudent?.gradeKey === '2batx') ? '2batx' : '1eso';

    // Display tasks strictly for the connected student's grade
    const displayedTasks = tasks.filter(t => !t.gradeKey || t.gradeKey === currentGrade || t.gradeKey === 'both');

    // Comprobar si estamos en modo detalle
    if (currentDetailTaskId !== null) {
      const detailTask = displayedTasks.find(t => t.id === currentDetailTaskId) || tasks.find(t => t.id === currentDetailTaskId);
      if (detailTask) {
        renderDetailView(detailTask, tasks, currentGrade);
        return;
      } else {
        currentDetailTaskId = null;
      }
    }

    // Modo lista
    renderListView(displayedTasks, tasks, currentGrade, currentStudent);
  }

  // ==========================================
  // PANTALLA 1: MODO LISTA DE TRABAJOS
  // ==========================================
  function renderListView(displayedTasks: ProjectTask[], allTasks: ProjectTask[], currentGrade: StudentGrade, currentStudent: any) {
    const currentListEl = container.querySelector('#tasks-list');
    const prevScrollTop = currentListEl ? currentListEl.scrollTop : 0;

    container.innerHTML = `
      <div class="flex-1 flex flex-col min-h-0 h-full max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Cabecera fija de la vista de Trabajos -->
        <div id="tasks-view-header" class="flex-shrink-0 pt-4 pb-3">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
            <div>
              <div class="flex items-center gap-2 flex-wrap">
                <h2 class="text-lg sm:text-xl font-display font-bold text-slate-900">
                  ${t('tasks.title')}
                </h2>
                <span class="text-xs px-2.5 py-0.5 rounded-full ${currentGrade === '1eso' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-purple-100 text-purple-800 border border-purple-300'} font-bold">
                  ${currentStudent?.name || 'Estudiante'} • ${currentStudent?.gradeLevel || '1º de ESO'}
                </span>
                <span class="text-xs px-2.5 py-0.5 rounded-full bg-cyan-50 text-cyan-700 border border-cyan-200 font-semibold">${t('tasks.driveIntegration')}</span>
              </div>
              <p class="text-xs text-slate-500 mt-1">${t('tasks.subtitle')}</p>
            </div>

            <div class="flex items-center gap-2 flex-wrap self-start sm:self-auto">
              <button id="btn-view-project-prompt" class="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-all flex items-center gap-1.5" title="${t('tasks.tooltipPromptProject')}">
                <span>📄</span>
                <span>${t('tasks.btnPromptProject')}</span>
              </button>
              <button id="btn-view-project-curricular" class="px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 text-xs font-semibold transition-all flex items-center gap-1.5" title="${t('tasks.tooltipCurricularDirective')}">
                <span>🏛️</span>
                <span>${t('tasks.btnCurricularDirective')}</span>
              </button>
              <button id="btn-new-task" class="px-3.5 py-1.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-md shadow-brand-500/20 transition-all flex items-center gap-1.5 active:scale-95">
                <span>＋</span>
                <span>${t('tasks.newTask')}</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Task Deliverables List: Pastillas compactas en modo lista -->
        <div class="flex-1 min-h-0 overflow-y-auto space-y-4 pr-1 pb-16 pt-1" id="tasks-list">
          ${
            displayedTasks.length === 0
              ? `
              <div class="p-12 text-center glass-panel rounded-3xl">
                <span class="text-4xl">📝</span>
                <p class="mt-2 text-sm font-semibold text-slate-700">${t('tasks.emptyTitle')}</p>
                <p class="text-xs text-slate-400">${t('tasks.emptyDesc')}</p>
              </div>
            `
              : displayedTasks.map(task => renderTaskSummaryCard(task)).join('')
          }
        </div>

        <!-- Modal Nuevo Trabajo -->
        <div id="new-task-modal" class="hidden fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div class="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 border border-slate-100">
            <h3 class="font-display font-bold text-lg text-slate-900 mb-1">${t('tasks.modalTitle')}</h3>
            <p class="text-xs text-slate-500 mb-4">${t('tasks.modalSubtitle')}</p>

            <form id="new-task-form" class="space-y-3">
              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">${t('tasks.fieldTitle')}</label>
                <input type="text" id="nt-title" placeholder="Ej. Ensayo sobre la Generación del 27" required class="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500" />
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-xs font-bold text-slate-700 mb-1">${t('tasks.fieldSubject')}</label>
                  <select id="nt-subject" class="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500">
                    <option value="Lengua y Literatura">Lengua y Literatura</option>
                    <option value="Ciencias y Tecnología">Ciencias y Tecnología</option>
                    <option value="Historia y Filosofía">Historia y Filosofía</option>
                    <option value="Matemáticas">Matemáticas</option>
                    <option value="Inglés">Inglés</option>
                  </select>
                </div>
                <div>
                  <label class="block text-xs font-bold text-slate-700 mb-1">${t('tasks.fieldDue')}</label>
                  <input type="date" id="nt-due" value="${new Date(Date.now() + 86400000 * 10).toISOString().split('T')[0]}" required class="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500" />
                </div>
              </div>

              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">${t('tasks.fieldNotes')}</label>
                <textarea id="nt-notes" rows="2" placeholder="Objetivo de aprendizaje del trabajo..." class="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"></textarea>
              </div>

              <div class="pt-3 flex justify-end gap-2 border-t border-slate-100">
                <button type="button" id="btn-cancel-nt" class="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100">${t('tasks.cancel')}</button>
                <button type="submit" class="px-4 py-1.5 rounded-xl text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 shadow-md shadow-brand-500/20">${t('tasks.create')}</button>
              </div>
            </form>
          </div>
        </div>

      </div>
    `;

    hookListEventListeners(allTasks, currentGrade);

    const newListEl = container.querySelector('#tasks-list');
    if (newListEl && prevScrollTop > 0) {
      newListEl.scrollTop = prevScrollTop;
    }
  }

  function renderTaskSummaryCard(task: ProjectTask): string {
    const score = calculateTaskScore(task);
    const checkedCriteria = task.criteria ? task.criteria.filter(c => c.checked).length : 0;
    const totalCriteria = task.criteria ? task.criteria.length : 0;
    const isCompleted = score === 100 && task.currentPhase === 'review';
    const isInProgress = score > 0 || task.currentPhase !== 'planning';

    return `
      <div class="glass-panel p-5 sm:p-6 rounded-3xl border ${
        task.gradeKey === '1eso' 
          ? 'border-emerald-200/80 bg-emerald-50/15' 
          : task.gradeKey === '2batx' 
          ? 'border-purple-200/80 bg-purple-50/15' 
          : 'border-slate-200'
      } glow-card space-y-4 transition-all duration-300">
        
        <!-- Header row -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div class="space-y-1">
            <div class="flex items-center gap-2 flex-wrap">
              <h3 class="font-display font-bold text-base text-slate-900">${task.title}</h3>
              <span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-cyan-50 text-cyan-700 border border-cyan-200">
                ${task.subject}
              </span>
              ${
                task.gradeKey === '1eso'
                  ? `<span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                      ${t('tasks.grade1esoBadge')}
                    </span>`
                  : task.gradeKey === '2batx'
                  ? `<span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-100 text-purple-800 border border-purple-300">
                      ${t('tasks.grade2batxBadge')}
                    </span>`
                  : ''
              }
            </div>
            ${task.notes ? `<p class="text-xs text-slate-600 line-clamp-2 mt-1">${task.notes}</p>` : ''}
          </div>

          <!-- Actions -->
          <div class="flex items-center gap-2.5 flex-wrap sm:flex-nowrap">
            <div class="text-left sm:text-right">
              <span class="block text-xs font-bold text-slate-700">${t('tasks.dueDate')}: ${task.dueDate}</span>
              <span class="text-[11px] text-brand-600 font-semibold">${t('tasks.autonomy')}: ${score}%</span>
            </div>

            <button 
              data-task-prompt-id="${task.id}" 
              class="btn-view-task-prompt px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm whitespace-nowrap active:scale-95"
              title="${t('tasks.tooltipViewTaskPrompt', { title: task.title })}"
            >
              <span>🧩</span>
              <span>${t('tasks.btnViewTaskPrompt')}</span>
            </button>

            <button 
              data-open-task-id="${task.id}" 
              class="btn-open-task-detail px-4 py-2 rounded-2xl ${
                isCompleted 
                  ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/20' 
                  : 'bg-brand-600 hover:bg-brand-700 shadow-brand-500/20'
              } text-white text-xs font-bold shadow-md transition-all flex items-center gap-1.5 whitespace-nowrap active:scale-95"
            >
              <span>${isCompleted ? '👁️' : isInProgress ? '▶️' : '🚀'}</span>
              <span>${isCompleted ? t('tasks.btnReview') : isInProgress ? t('tasks.btnResume') : t('tasks.btnStart')}</span>
            </button>
          </div>
        </div>

        <!-- Meta status row -->
        <div class="flex items-center justify-between gap-3 pt-2 border-t border-slate-100/80 flex-wrap text-xs">
          <div class="flex items-center gap-2 flex-wrap">
            <span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${getPhaseBadgeColor(task.currentPhase)}">
              ${getPhaseLabel(task.currentPhase)}
            </span>
            <span class="text-[11px] font-semibold text-slate-600 flex items-center gap-1 bg-slate-50 px-2 py-0.5 rounded-lg border border-slate-200/80">
              <span>📁</span>
              <span>${task.driveFiles.length > 0 ? t('tasks.driveFilesCount', { count: task.driveFiles.length }) : t('tasks.noDriveFilesShort')}</span>
            </span>
            <span class="text-[11px] font-semibold text-brand-700 flex items-center gap-1 bg-brand-50/50 px-2 py-0.5 rounded-lg border border-brand-100">
              <span>🛡️</span>
              <span>${t('tasks.criteriaCompleted', { completed: checkedCriteria, total: totalCriteria })}</span>
            </span>
          </div>

          <div class="flex items-center gap-2">
            <span class="text-[10px] text-slate-400 font-mono">Autonomía</span>
            <div class="w-20 bg-slate-200 h-2 rounded-full overflow-hidden">
              <div class="bg-brand-600 h-full rounded-full transition-all duration-300" style="width: ${score}%"></div>
            </div>
            <span class="text-[11px] font-bold text-slate-700">${score}%</span>
          </div>
        </div>

      </div>
    `;
  }

  // ==========================================
  // PANTALLA 2: MODO DETALLE INDIVIDUAL DE TRABAJO
  // (Máxima concentración: Cero distracciones de otros trabajos)
  // ==========================================
  function renderDetailView(task: ProjectTask, allTasks: ProjectTask[], currentGrade: StudentGrade) {
    const score = calculateTaskScore(task);

    container.innerHTML = `
      <div class="flex-1 flex flex-col min-h-0 h-full max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Cabecera de navegación de la pantalla individual de trabajo -->
        <div id="task-detail-header" class="flex-shrink-0 pt-4 pb-3">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
            
            <!-- Botón Volver y Ruta / Título -->
            <div class="flex items-center gap-3 flex-wrap">
              <button 
                id="btn-back-to-tasks" 
                class="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
                title="${t('tasks.btnBackToList')}"
              >
                <span>←</span>
                <span>${t('tasks.btnBackToList')}</span>
              </button>

              <div class="h-4 w-px bg-slate-200 hidden sm:block"></div>

              <div class="flex items-center gap-2 flex-wrap">
                <h2 class="text-base sm:text-lg font-display font-bold text-slate-900">${task.title}</h2>
                <span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-cyan-50 text-cyan-700 border border-cyan-200">
                  ${task.subject}
                </span>
                ${
                  task.gradeKey === '1eso'
                    ? `<span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                        ${t('tasks.grade1esoBadge')}
                      </span>`
                    : task.gradeKey === '2batx'
                    ? `<span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-100 text-purple-800 border border-purple-300">
                        ${t('tasks.grade2batxBadge')}
                      </span>`
                    : ''
                }
                <span class="text-xs px-2.5 py-0.5 rounded-full bg-brand-50 text-brand-700 border border-brand-200 font-bold">
                  🛡️ ${score}% ${t('tasks.ownEffort')}
                </span>
              </div>
            </div>

            <!-- Acciones de cabecera -->
            <div class="flex items-center gap-2 flex-wrap self-start sm:self-auto">
              <span class="text-xs font-bold text-slate-600 mr-1">${t('tasks.dueDate')}: ${task.dueDate}</span>
              <button 
                data-task-prompt-id="${task.id}" 
                class="btn-view-task-prompt px-3.5 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm whitespace-nowrap active:scale-95"
                title="${t('tasks.tooltipViewTaskPrompt', { title: task.title })}"
              >
                <span>🧩</span>
                <span>${t('tasks.btnViewTaskPrompt')}</span>
              </button>
            </div>

          </div>
        </div>

        <!-- Área de trabajo individual (El scroll sólo se aplica a este trabajo específico) -->
        <div id="task-detail-scroll" class="flex-1 min-h-0 overflow-y-auto space-y-5 pr-1 pb-16 pt-1">
          
          <!-- Task Detail Overview Card -->
          <div class="glass-panel p-6 rounded-3xl border ${task.gradeKey === '1eso' ? 'border-emerald-200/80 bg-emerald-50/15' : task.gradeKey === '2batx' ? 'border-purple-200/80 bg-purple-50/15' : 'border-slate-200'} glow-card space-y-5">
            
            <div class="border-b border-slate-100 pb-3">
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="font-display font-bold text-base sm:text-lg text-slate-900">${task.title}</h3>
                  <p class="text-xs text-slate-600 mt-1">${task.notes || ''}</p>
                </div>
                <div class="text-right">
                  <span class="block text-xs font-bold text-slate-700">${t('tasks.dueDate')}: ${task.dueDate}</span>
                  <span class="text-xs text-brand-600 font-semibold">${t('tasks.autonomy')}: ${score}%</span>
                </div>
              </div>
            </div>

            ${
              task.pedagogicalNote
                ? `
              <!-- Pedagogical Stage Callout (Piaget TR Anchor) -->
              <div class="p-3.5 rounded-2xl ${task.gradeKey === '1eso' ? 'bg-emerald-50 border border-emerald-200 text-emerald-900' : 'bg-purple-50 border border-purple-200 text-purple-900'} text-xs flex items-start gap-2.5">
                <span class="text-base flex-shrink-0">🧠</span>
                <div>
                  <span class="font-bold block">${t('tasks.pedagogicalFoundation')}</span>
                  <span class="leading-relaxed">${task.pedagogicalNote}</span>
                </div>
              </div>
            `
                : ''
            }

            <!-- 4-Phases Progression Stepper -->
            <div>
              <span class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">${t('tasks.phasesTitle')}</span>
              <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
                ${renderPhaseBadge(task.id!, 'planning', t('tasks.phases.planning'), task.currentPhase)}
                ${renderPhaseBadge(task.id!, 'research', t('tasks.phases.research'), task.currentPhase)}
                ${renderPhaseBadge(task.id!, 'writing', t('tasks.phases.writing'), task.currentPhase)}
                ${renderPhaseBadge(task.id!, 'review', t('tasks.phases.review'), task.currentPhase)}
              </div>
            </div>

            <!-- Google Drive Resources & Autonomy Checklist Grid -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-5 pt-2">
              
              <!-- Left: Google Drive Attached Files -->
              <div class="p-4 rounded-2xl bg-slate-50/70 border border-slate-200/80 space-y-3">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <span class="text-base">📁</span>
                    <h4 class="font-bold text-xs text-slate-800">${t('tasks.driveDocs')}</h4>
                  </div>
                  <button data-task-drive="${task.id}" class="btn-attach-drive text-[11px] font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1 active:scale-95">
                    <span>${t('tasks.attachDrive')}</span>
                  </button>
                </div>

                <div class="space-y-2">
                  ${
                    task.driveFiles.length === 0
                      ? `<p class="text-xs text-slate-400 py-2">${t('tasks.noDriveFiles')}</p>`
                      : task.driveFiles
                          .map(
                            file => `
                      <div class="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200 text-xs">
                        <div class="flex items-center gap-2 overflow-hidden">
                          <span class="text-base flex-shrink-0">${getFileIcon(file.mimeType)}</span>
                          <div class="truncate">
                            <a href="${file.webViewLink || '#'}" target="_blank" rel="noopener noreferrer" class="font-semibold text-slate-800 hover:text-brand-600 block truncate transition-colors">${file.name}</a>
                            <span class="text-[10px] text-slate-400 font-mono">${file.lastModified || 'Sincronizado'}</span>
                          </div>
                        </div>
                        <a href="${file.webViewLink || '#'}" target="_blank" rel="noopener noreferrer" class="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors">
                          ${t('tasks.driveSync')} ↗
                        </a>
                      </div>
                    `
                          )
                          .join('')
                  }
                </div>
              </div>

              <!-- Right: Autonomy Guarantee Checklist -->
              <div class="p-4 rounded-2xl bg-brand-50/30 border border-brand-100 space-y-3">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <span class="text-base">🛡️</span>
                    <h4 class="font-bold text-xs text-brand-900">${t('tasks.autonomyMeter')}</h4>
                  </div>
                  <span class="text-[11px] font-bold px-2 py-0.5 rounded-full bg-brand-100 text-brand-700">
                    ${score}% ${t('tasks.ownEffort')}
                  </span>
                </div>

                <div class="space-y-2">
                  ${task.criteria
                    .map(
                      crit => `
                    <label class="flex items-start gap-2.5 p-2 rounded-xl hover:bg-white/80 cursor-pointer transition-colors text-xs">
                      <input 
                        type="checkbox" 
                        data-task-id="${task.id}" 
                        data-crit-id="${crit.id}" 
                        class="crit-checkbox mt-0.5 w-4 h-4 rounded text-brand-600 focus:ring-brand-500 border-slate-300"
                        ${crit.checked ? 'checked' : ''} 
                      />
                      <div>
                        <span class="font-semibold text-slate-800 block ${crit.checked ? 'line-through text-slate-400' : ''}">${crit.label}</span>
                        <span class="text-[11px] text-slate-500">${crit.explanation}</span>
                      </div>
                    </label>
                  `
                    )
                    .join('')}
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    `;

    hookDetailEventListeners(task, allTasks, currentGrade);
  }

  // ==========================================
  // EVENT LISTENERS: MODO LISTA
  // ==========================================
  function hookListEventListeners(allTasks: ProjectTask[], currentGrade: StudentGrade) {
    // 1. Abrir detalle individual de la tarea
    container.querySelectorAll<HTMLButtonElement>('.btn-open-task-detail').forEach(btn => {
      btn.addEventListener('click', () => {
        const taskId = Number(btn.dataset.openTaskId);
        if (taskId) {
          currentDetailTaskId = taskId;
          renderContent(allTasks);
        }
      });
    });

    // 2. Ver prompt específico de cada tarea
    container.querySelectorAll('.btn-view-task-prompt').forEach(btn => {
      btn.addEventListener('click', () => {
        const taskId = Number((btn as HTMLElement).dataset.taskPromptId);
        openTaskPromptModal(taskId, allTasks, currentGrade);
      });
    });

    // 3. Ver prompt global del proyecto
    container.querySelector('#btn-view-project-prompt')?.addEventListener('click', () => {
      const modalRoot = document.getElementById('modal-root') || document.body;
      const assembled = promptOrchestratorService.assemblePrompt({
        role: 'project',
        gradeKey: currentGrade,
        subject: 'Lengua Castellana y Literatura'
      });
      renderPromptViewerModal(
        modalRoot,
        t('tasks.modalProjectTitle'),
        assembled.systemInstruction,
        { 
          assembledPrompt: assembled,
          subtitle: t('tasks.modalProjectSubtitle'),
          onClose: () => { modalRoot.innerHTML = ''; } 
        }
      );
    });

    // 4. Ver directriz curricular
    container.querySelector('#btn-view-project-curricular')?.addEventListener('click', async () => {
      const modalRoot = document.getElementById('modal-root') || document.body;
      const assembled = promptOrchestratorService.assemblePrompt({
        role: 'project',
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

    // 5. Modal Nueva Tarea
    const modal = container.querySelector('#new-task-modal');
    container.querySelector('#btn-new-task')?.addEventListener('click', () => {
      modal?.classList.remove('hidden');
    });
    container.querySelector('#btn-cancel-nt')?.addEventListener('click', () => {
      modal?.classList.add('hidden');
    });

    const form = container.querySelector('#new-task-form');
    form?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const title = (container.querySelector('#nt-title') as HTMLInputElement).value;
      const subject = (container.querySelector('#nt-subject') as HTMLSelectElement).value;
      const dueDate = (container.querySelector('#nt-due') as HTMLInputElement).value;
      const notes = (container.querySelector('#nt-notes') as HTMLTextAreaElement).value;

      const newId = await db.projectTasks.add({
        title,
        subject,
        gradeKey: currentGrade,
        dueDate,
        currentPhase: 'planning',
        autonomyScore: 25,
        notes,
        driveFiles: [
          {
            fileId: `drive_${Date.now()}`,
            name: `${title.replace(/\s+/g, '_')}_Borrador.gdoc`,
            mimeType: 'application/vnd.google-apps.document',
            lastModified: 'Recién creado'
          }
        ],
        criteria: [
          {
            id: 'c1',
            label: 'Formulación y alcance del proyecto con mis palabras',
            checked: true,
            explanation: 'Definido el objetivo inicial de manera autónoma.'
          },
          {
            id: 'c2',
            label: 'Búsqueda activa y contraste de fuentes fiables',
            checked: false,
            explanation: 'Seleccionar fuentes antes de escribir.'
          },
          {
            id: 'c3',
            label: 'Redacción propia evitando generación automática por IA',
            checked: false,
            explanation: 'El texto debe ser fruto de la reflexión del estudiante.'
          },
          {
            id: 'c4',
            label: 'Revisión crítica de estructura y conclusiones',
            checked: false,
            explanation: 'Validar que las conclusiones responden a la hipótesis.'
          }
        ]
      });

      modal?.classList.add('hidden');
      currentDetailTaskId = typeof newId === 'number' ? newId : null;
      loadData();
    });

    // 6. Reenvío suave de scroll desde la cabecera fija hacia la lista
    const headerEl = container.querySelector('#tasks-view-header');
    const scrollListEl = container.querySelector('#tasks-list');
    if (headerEl && scrollListEl) {
      headerEl.addEventListener('wheel', (e: Event) => {
        const we = e as WheelEvent;
        scrollListEl.scrollTop += we.deltaY;
      }, { passive: true });
    }
  }

  // ==========================================
  // EVENT LISTENERS: MODO DETALLE INDIVIDUAL
  // ==========================================
  function hookDetailEventListeners(task: ProjectTask, allTasks: ProjectTask[], currentGrade: StudentGrade) {
    // 1. Botón Volver a la lista de trabajos
    container.querySelector('#btn-back-to-tasks')?.addEventListener('click', () => {
      currentDetailTaskId = null;
      renderContent(allTasks);
    });

    // 2. Checkboxes de autonomía
    const critCheckboxes = container.querySelectorAll<HTMLInputElement>('.crit-checkbox');
    critCheckboxes.forEach(cb => {
      cb.addEventListener('change', async () => {
        const critId = cb.dataset.critId;
        const crit = task.criteria.find(c => c.id === critId);
        if (crit) {
          crit.checked = cb.checked;
          task.autonomyScore = calculateTaskScore(task);
          await db.projectTasks.update(task.id!, {
            criteria: task.criteria,
            autonomyScore: task.autonomyScore
          });
          loadData();
        }
      });
    });

    // 3. Botones de cambio de fase
    const phaseBtns = container.querySelectorAll<HTMLButtonElement>('.phase-badge-btn');
    phaseBtns.forEach(btn => {
      btn.addEventListener('click', async () => {
        const newPhase = btn.dataset.phase as TaskPhase;
        await db.projectTasks.update(task.id!, { currentPhase: newPhase });
        loadData();
      });
    });

    // 4. Vincular archivo de Drive
    const attachBtns = container.querySelectorAll<HTMLButtonElement>('.btn-attach-drive');
    attachBtns.forEach(btn => {
      btn.addEventListener('click', async () => {
        try {
          const available = await googleDriveService.getAvailableFiles();
          if (available.length > 0) {
            const nextFile = available.find(f => !task.driveFiles.some(df => df.fileId === f.fileId)) || available[0];
            const updated = [...task.driveFiles, nextFile];
            await db.projectTasks.update(task.id!, { driveFiles: updated });
            loadData();
          }
        } catch (err: any) {
          alert(err.message || 'Error al conectar con Google Drive');
        }
      });
    });

    // 5. Ver prompt específico de esta tarea
    container.querySelectorAll('.btn-view-task-prompt').forEach(btn => {
      btn.addEventListener('click', () => {
        openTaskPromptModal(task.id!, allTasks, currentGrade);
      });
    });

    // 6. Reenvío suave de scroll desde la cabecera fija hacia el contenedor del detalle
    const headerEl = container.querySelector('#task-detail-header');
    const scrollDetailEl = container.querySelector('#task-detail-scroll');
    if (headerEl && scrollDetailEl) {
      headerEl.addEventListener('wheel', (e: Event) => {
        const we = e as WheelEvent;
        scrollDetailEl.scrollTop += we.deltaY;
      }, { passive: true });
    }
  }

  function openTaskPromptModal(taskId: number, allTasks: ProjectTask[], currentGrade: StudentGrade) {
    const task = allTasks.find(t => t.id === taskId);
    if (!task) return;

    const taskGrade: StudentGrade = (task.gradeKey === '2batx' || task.gradeKey === '1eso') ? task.gradeKey : currentGrade;
    const taskTopic = task.topicId 
      ? promptOrchestratorService.findTopicById(task.topicId) 
      : promptOrchestratorService.findTopicBySubjectOrKeyword(task.subject, taskGrade, task.title);
    const taskActivity = task.activityId 
      ? promptOrchestratorService.findActivityById(task.activityId) 
      : (taskTopic ? promptOrchestratorService.getActivitiesForTopic(taskTopic.id)[0] : undefined);

    const assembled = promptOrchestratorService.assemblePrompt({
      role: 'project',
      gradeKey: taskGrade,
      subject: task.subject,
      topicId: taskTopic?.id,
      activityId: taskActivity?.id
    });

    const modalRoot = document.getElementById('modal-root') || document.body;
    renderPromptViewerModal(
      modalRoot,
      t('tasks.modalTaskPromptTitle', { title: task.title }),
      assembled.systemInstruction,
      {
        assembledPrompt: assembled,
        subtitle: t('tasks.modalTaskPromptSubtitle', { subject: task.subject }),
        onClose: () => { modalRoot.innerHTML = ''; }
      }
    );
  }

  loadData();
}

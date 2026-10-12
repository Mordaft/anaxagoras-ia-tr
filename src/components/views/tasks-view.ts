import { db, ensureLenguaCastellanaTasks } from '../../services/storage';
import { googleDriveService } from '../../services/google-drive';
import { googleAuthService } from '../../services/google-auth';
import { STATIC_PROMPTS } from '../../services/ai-client';
import { renderPromptViewerModal } from '../modals/prompt-viewer-modal';
import { t } from '../../services/i18n';
import type { ProjectTask, TaskPhase } from '../../types/tasks';

export function renderTasksView(container: HTMLElement): void {
  let activeGradeFilter: 'all' | '1eso' | '2batx' = 'all';

  async function loadData() {
    await ensureLenguaCastellanaTasks();
    const tasks = await db.projectTasks.toArray();
    renderContent(tasks);
  }

  function renderContent(tasks: ProjectTask[]) {
    const auth = googleAuthService.getState();
    const currentStudent = auth.user;
    const currentGrade = currentStudent?.gradeKey || '1eso';

    // Filter tasks if not in 'all' view
    const displayedTasks = activeGradeFilter === 'all'
      ? tasks
      : tasks.filter(t => !t.gradeKey || t.gradeKey === activeGradeFilter || t.gradeKey === 'both');

    container.innerHTML = `
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        <!-- Section Header -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 class="text-xl font-display font-bold text-slate-900 flex items-center gap-2">
              <span>${t('tasks.title')}</span>
              <span class="text-xs px-2.5 py-0.5 rounded-full bg-cyan-50 text-cyan-700 border border-cyan-200 font-semibold">${t('tasks.driveIntegration')}</span>
            </h2>
            <p class="text-xs text-slate-500 mt-0.5">${t('tasks.subtitle')}</p>
          </div>

          <div class="flex items-center gap-2 flex-wrap self-start sm:self-auto">
            <button id="btn-view-project-prompt" class="px-3 py-2 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-all flex items-center gap-1.5" title="Ver Prompt Estático de Trabajos">
              <span>📄</span>
              <span>Prompt Trabajos</span>
            </button>
            <button id="btn-new-task" class="px-4 py-2 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-md shadow-brand-500/20 transition-all flex items-center gap-1.5">
              <span>＋</span>
              <span>${t('tasks.newTask')}</span>
            </button>
          </div>
        </div>

        <!-- Comparative Presentation Banner (1º ESO vs 2º Bachillerato) -->
        <div class="glass-panel p-5 rounded-3xl border border-brand-200/80 bg-gradient-to-r from-brand-50/70 via-white to-cyan-50/60 space-y-3.5 shadow-sm">
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div class="flex items-center gap-3">
              <span class="text-2xl p-2 rounded-2xl bg-brand-100/60 border border-brand-200/60">⚖️</span>
              <div>
                <h3 class="font-display font-bold text-sm text-slate-900 flex items-center gap-2">
                  <span>Demostración de Niveles: Caso de Estudio Lengua Castellana</span>
                  <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${currentGrade === '1eso' ? 'bg-emerald-100 text-emerald-800' : 'bg-purple-100 text-purple-800'}">
                    Perfil Activo: ${currentStudent?.gradeLevel || '1º de ESO'}
                  </span>
                </h3>
                <p class="text-xs text-slate-600 mt-0.5">
                  Compara cómo cambia la exigencia ante la misma oración (<em>"El tren llegó puntual a la estación"</em>): en 1º de ESO el complemento verbal solo se identifica en bloque; en 2º de Bachillerato se exige clasificar la tipología (CPred vs CCL) con pruebas sintácticas formales.
                </p>
              </div>
            </div>

            <!-- Grade Filter Selector for Live TR Defense -->
            <div class="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl self-start md:self-auto flex-wrap">
              <button id="btn-filter-1eso" class="px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${activeGradeFilter === '1eso' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'}">
                🟢 1º ESO (Demo)
              </button>
              <button id="btn-filter-2batx" class="px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${activeGradeFilter === '2batx' ? 'bg-white text-purple-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'}">
                🟣 2º Bachillerato
              </button>
              <button id="btn-filter-all" class="px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${activeGradeFilter === 'all' ? 'bg-white text-brand-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'}">
                🔍 Ambos Grados
              </button>
            </div>
          </div>
        </div>

        <!-- Task Deliverables List -->
        <div class="space-y-6">
          ${
            displayedTasks.length === 0
              ? `
              <div class="p-12 text-center glass-panel rounded-3xl">
                <span class="text-4xl">📝</span>
                <p class="mt-2 text-sm font-semibold text-slate-700">${t('tasks.emptyTitle')}</p>
                <p class="text-xs text-slate-400">${t('tasks.emptyDesc')}</p>
              </div>
            `
              : displayedTasks
                  .map(
                    task => `
              <div class="glass-panel p-6 rounded-3xl border ${task.gradeKey === '1eso' ? 'border-emerald-200/80 bg-emerald-50/15' : task.gradeKey === '2batx' ? 'border-purple-200/80 bg-purple-50/15' : 'border-slate-200'} glow-card space-y-5">
                
                <!-- Task Header -->
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                  <div>
                    <div class="flex items-center gap-2 flex-wrap">
                      <h3 class="font-display font-bold text-base text-slate-900">${task.title}</h3>
                      <span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-cyan-50 text-cyan-700 border border-cyan-200">
                        ${task.subject}
                      </span>
                      ${
                        task.gradeKey === '1eso'
                          ? `<span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                              🟢 1º de ESO • Operaciones Concretas
                            </span>`
                          : task.gradeKey === '2batx'
                          ? `<span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-100 text-purple-800 border border-purple-300">
                              🟣 2º de Bachillerato • Operaciones Formales (PAU)
                            </span>`
                          : ''
                      }
                    </div>
                    <p class="text-xs text-slate-600 mt-1">${task.notes}</p>
                  </div>

                  <div class="flex items-center gap-3">
                    <div class="text-left sm:text-right">
                      <span class="block text-xs font-bold text-slate-700">${t('tasks.dueDate')}: ${task.dueDate}</span>
                      <span class="text-[11px] text-brand-600 font-semibold">${t('tasks.autonomy')}: ${calculateTaskScore(task)}%</span>
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
                      <span class="font-bold block">Fundamento Pedagógico (Piaget & Guardrails):</span>
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
                      <button data-task-drive="${task.id}" class="btn-attach-drive text-[11px] font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1">
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
                        ${calculateTaskScore(task)}% ${t('tasks.ownEffort')}
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
            `
                  )
                  .join('')
          }
        </div>

        <!-- New Task Modal -->
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

    // Hook listeners
    // Autonomy criteria checkboxes
    const critCheckboxes = container.querySelectorAll<HTMLInputElement>('.crit-checkbox');
    critCheckboxes.forEach(cb => {
      cb.addEventListener('change', async () => {
        const taskId = Number(cb.dataset.taskId);
        const critId = cb.dataset.critId;
        const task = tasks.find(t => t.id === taskId);
        if (task) {
          const crit = task.criteria.find(c => c.id === critId);
          if (crit) {
            crit.checked = cb.checked;
            task.autonomyScore = calculateTaskScore(task);
            await db.projectTasks.update(taskId, {
              criteria: task.criteria,
              autonomyScore: task.autonomyScore
            });
            loadData();
          }
        }
      });
    });

    // Phase badges
    const phaseBtns = container.querySelectorAll<HTMLButtonElement>('.phase-badge-btn');
    phaseBtns.forEach(btn => {
      btn.addEventListener('click', async () => {
        const taskId = Number(btn.dataset.taskId);
        const newPhase = btn.dataset.phase as TaskPhase;
        await db.projectTasks.update(taskId, { currentPhase: newPhase });
        loadData();
      });
    });

    // Attach Drive file button
    const attachBtns = container.querySelectorAll<HTMLButtonElement>('.btn-attach-drive');
    attachBtns.forEach(btn => {
      btn.addEventListener('click', async () => {
        const taskId = Number(btn.dataset.taskDrive);
        try {
          const available = await googleDriveService.getAvailableFiles();
          const task = tasks.find(t => t.id === taskId);
          if (task && available.length > 0) {
            const nextFile = available.find(f => !task.driveFiles.some(df => df.fileId === f.fileId)) || available[0];
            const updated = [...task.driveFiles, nextFile];
            await db.projectTasks.update(taskId, { driveFiles: updated });
            loadData();
          }
        } catch (err: any) {
          alert(err.message || 'Error al conectar con Google Drive');
        }
      });
    });

    // Modal open/close
    const modal = container.querySelector('#new-task-modal');
    container.querySelector('#btn-new-task')?.addEventListener('click', () => {
      modal?.classList.remove('hidden');
    });
    container.querySelector('#btn-cancel-nt')?.addEventListener('click', () => {
      modal?.classList.add('hidden');
    });

    // Grade Filter and Profile Switches for TR Live Defense
    container.querySelector('#btn-filter-1eso')?.addEventListener('click', () => {
      googleAuthService.setGradeProfile('1eso');
      activeGradeFilter = '1eso';
      renderContent(tasks);
    });

    container.querySelector('#btn-filter-2batx')?.addEventListener('click', () => {
      googleAuthService.setGradeProfile('2batx');
      activeGradeFilter = '2batx';
      renderContent(tasks);
    });

    container.querySelector('#btn-filter-all')?.addEventListener('click', () => {
      activeGradeFilter = 'all';
      renderContent(tasks);
    });

    // View Project Guide Prompt modal
    container.querySelector('#btn-view-project-prompt')?.addEventListener('click', () => {
      const modalRoot = document.getElementById('modal-root') || document.body;
      renderPromptViewerModal(
        modalRoot,
        'Prompt Estático: Mentor de Trabajos y Proyectos (project_guide.md)',
        STATIC_PROMPTS.project,
        { onClose: () => { modalRoot.innerHTML = ''; } }
      );
    });

    // Form submit
    const form = container.querySelector('#new-task-form');
    form?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const title = (container.querySelector('#nt-title') as HTMLInputElement).value;
      const subject = (container.querySelector('#nt-subject') as HTMLSelectElement).value;
      const dueDate = (container.querySelector('#nt-due') as HTMLInputElement).value;
      const notes = (container.querySelector('#nt-notes') as HTMLTextAreaElement).value;

      await db.projectTasks.add({
        title,
        subject,
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
      loadData();
    });
  }

  function calculateTaskScore(task: ProjectTask): number {
    if (!task.criteria || task.criteria.length === 0) return 100;
    const completed = task.criteria.filter(c => c.checked).length;
    return Math.round((completed / task.criteria.length) * 100);
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

  function getFileIcon(mimeType: string): string {
    if (mimeType.includes('document')) return '📄';
    if (mimeType.includes('presentation') || mimeType.includes('slides')) return '📊';
    if (mimeType.includes('spreadsheet') || mimeType.includes('sheet')) return '📈';
    return '📑';
  }

  loadData();
}

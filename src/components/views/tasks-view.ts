import { db } from '../../services/storage';
import { googleDriveService } from '../../services/google-drive';
import type { ProjectTask, TaskPhase } from '../../types/tasks';

export function renderTasksView(container: HTMLElement): void {
  async function loadData() {
    const tasks = await db.projectTasks.toArray();
    renderContent(tasks);
  }

  function renderContent(tasks: ProjectTask[]) {
    container.innerHTML = `
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        <!-- Section Header -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 class="text-xl font-display font-bold text-slate-900 flex items-center gap-2">
              <span>Trabajos y Proyectos Escolares</span>
              <span class="text-xs px-2.5 py-0.5 rounded-full bg-cyan-50 text-cyan-700 border border-cyan-200 font-semibold">Integración Google Drive</span>
            </h2>
            <p class="text-xs text-slate-500 mt-0.5">Asistente por fases para elaborar trabajos rigurosos garantizando tu autoría e ideas propias.</p>
          </div>

          <button id="btn-new-task" class="px-4 py-2 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-md shadow-brand-500/20 transition-all flex items-center gap-1.5 self-start sm:self-auto">
            <span>＋</span>
            <span>Nuevo Trabajo</span>
          </button>
        </div>

        <!-- Task Deliverables List -->
        <div class="space-y-6">
          ${
            tasks.length === 0
              ? `
              <div class="p-12 text-center glass-panel rounded-3xl">
                <span class="text-4xl">📝</span>
                <p class="mt-2 text-sm font-semibold text-slate-700">No tienes trabajos activos registrados.</p>
                <p class="text-xs text-slate-400">Pulsa en "Nuevo Trabajo" para empezar a estructurar un entregable.</p>
              </div>
            `
              : tasks
                  .map(
                    task => `
              <div class="glass-panel p-6 rounded-3xl border border-slate-200 glow-card space-y-6">
                
                <!-- Task Header -->
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                  <div>
                    <div class="flex items-center gap-2 flex-wrap">
                      <h3 class="font-display font-bold text-base text-slate-900">${task.title}</h3>
                      <span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-cyan-50 text-cyan-700 border border-cyan-200">
                        ${task.subject}
                      </span>
                    </div>
                    <p class="text-xs text-slate-500 mt-1">${task.notes}</p>
                  </div>

                  <div class="flex items-center gap-3">
                    <div class="text-left sm:text-right">
                      <span class="block text-xs font-bold text-slate-700">Fecha Límite: ${task.dueDate}</span>
                      <span class="text-[11px] text-brand-600 font-semibold">Autonomía: ${calculateTaskScore(task)}%</span>
                    </div>
                  </div>
                </div>

                <!-- 4-Phases Progression Stepper -->
                <div>
                  <span class="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Fases de Elaboración</span>
                  <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
                    ${renderPhaseBadge(task.id!, 'planning', '1. Planificación', task.currentPhase)}
                    ${renderPhaseBadge(task.id!, 'research', '2. Investigación', task.currentPhase)}
                    ${renderPhaseBadge(task.id!, 'writing', '3. Redacción Propia', task.currentPhase)}
                    ${renderPhaseBadge(task.id!, 'review', '4. Revisión Final', task.currentPhase)}
                  </div>
                </div>

                <!-- Google Drive Resources & Autonomy Checklist Grid -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-5 pt-2">
                  
                  <!-- Left: Google Drive Attached Files -->
                  <div class="p-4 rounded-2xl bg-slate-50/70 border border-slate-200/80 space-y-3">
                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-2">
                        <span class="text-base">📁</span>
                        <h4 class="font-bold text-xs text-slate-800">Documentos en Google Drive</h4>
                      </div>
                      <button data-task-drive="${task.id}" class="btn-attach-drive text-[11px] font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1">
                        <span>＋ Vincular Archivo</span>
                      </button>
                    </div>

                    <div class="space-y-2">
                      ${
                        task.driveFiles.length === 0
                          ? `<p class="text-xs text-slate-400 py-2">No hay archivos vinculados de Drive todavía.</p>`
                          : task.driveFiles
                              .map(
                                file => `
                          <div class="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200 text-xs">
                            <div class="flex items-center gap-2 overflow-hidden">
                              <span class="text-base flex-shrink-0">${getFileIcon(file.mimeType)}</span>
                              <div class="truncate">
                                <span class="font-semibold text-slate-800 block truncate">${file.name}</span>
                                <span class="text-[10px] text-slate-400 font-mono">${file.lastModified || 'Sincronizado'}</span>
                              </div>
                            </div>
                            <span class="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700">Drive Sync</span>
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
                        <h4 class="font-bold text-xs text-brand-900">Medidor de Autonomía del Estudiante</h4>
                      </div>
                      <span class="text-[11px] font-bold px-2 py-0.5 rounded-full bg-brand-100 text-brand-700">
                        ${calculateTaskScore(task)}% propio
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
            <h3 class="font-display font-bold text-lg text-slate-900 mb-1">Nuevo Trabajo o Entregable</h3>
            <p class="text-xs text-slate-500 mb-4">Crea una ficha para organizar tu investigación y documentos.</p>

            <form id="new-task-form" class="space-y-3">
              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">Título del Proyecto / Trabajo</label>
                <input type="text" id="nt-title" placeholder="Ej. Ensayo sobre la Generación del 27" required class="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500" />
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-xs font-bold text-slate-700 mb-1">Asignatura</label>
                  <select id="nt-subject" class="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500">
                    <option value="Lengua y Literatura">Lengua y Literatura</option>
                    <option value="Ciencias y Tecnología">Ciencias y Tecnología</option>
                    <option value="Historia y Filosofía">Historia y Filosofía</option>
                    <option value="Matemáticas">Matemáticas</option>
                    <option value="Inglés">Inglés</option>
                  </select>
                </div>
                <div>
                  <label class="block text-xs font-bold text-slate-700 mb-1">Fecha de Entrega</label>
                  <input type="date" id="nt-due" value="${new Date(Date.now() + 86400000 * 10).toISOString().split('T')[0]}" required class="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500" />
                </div>
              </div>

              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">Descripción u objetivo</label>
                <textarea id="nt-notes" rows="2" placeholder="Objetivo de aprendizaje del trabajo..." class="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"></textarea>
              </div>

              <div class="pt-3 flex justify-end gap-2 border-t border-slate-100">
                <button type="button" id="btn-cancel-nt" class="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100">Cancelar</button>
                <button type="submit" class="px-4 py-1.5 rounded-xl text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 shadow-md shadow-brand-500/20">Crear Trabajo</button>
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

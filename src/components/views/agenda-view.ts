import { db } from '../../services/storage';
import { googleCalendarService } from '../../services/google-calendar';
import type { StudyBlock, EventType } from '../../types/agenda';

export function renderAgendaView(container: HTMLElement): void {
  async function loadData() {
    const blocks = await db.studyBlocks.toArray();
    renderContent(blocks);
  }

  function renderContent(blocks: StudyBlock[]) {
    const totalBlocks = blocks.length;
    const completedBlocks = blocks.filter(b => b.completed).length;
    const syncedBlocks = blocks.filter(b => b.syncedWithGoogle).length;

    container.innerHTML = `
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        <!-- Top Banner / Summary Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          <!-- Card 1: Próximos Exámenes -->
          <div class="glass-panel p-5 rounded-3xl glow-card relative overflow-hidden">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold uppercase tracking-wider text-slate-500">Próximo Hito Lectivo</span>
              <span class="text-xl">🎯</span>
            </div>
            <div class="mt-3">
              <span class="text-2xl font-display font-extrabold text-slate-900">En 3 días</span>
              <p class="text-xs text-slate-500 mt-1">Biología: La Célula y Fotosíntesis</p>
            </div>
            <div class="mt-3 flex items-center gap-1.5 text-[11px] font-semibold text-brand-600">
              <span>⚡ Sesión recomendada: 45 min hoy</span>
            </div>
          </div>

          <!-- Card 2: Horas de Estudio Planificadas -->
          <div class="glass-panel p-5 rounded-3xl glow-card relative overflow-hidden">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold uppercase tracking-wider text-slate-500">Progreso Semanal</span>
              <span class="text-xl">⏱️</span>
            </div>
            <div class="mt-3">
              <div class="flex items-baseline gap-2">
                <span class="text-2xl font-display font-extrabold text-slate-900">${completedBlocks} / ${totalBlocks}</span>
                <span class="text-xs text-slate-500 font-medium">bloques completados</span>
              </div>
              <div class="w-full bg-slate-100 rounded-full h-2 mt-2 overflow-hidden">
                <div class="bg-brand-500 h-2 rounded-full transition-all duration-500" style="width: ${totalBlocks ? (completedBlocks / totalBlocks) * 100 : 0}%"></div>
              </div>
            </div>
            <div class="mt-2 text-[11px] text-slate-500 flex justify-between">
              <span>Metodología activa</span>
              <span class="font-bold text-slate-700">${Math.round(totalBlocks ? (completedBlocks / totalBlocks) * 100 : 0)}%</span>
            </div>
          </div>

          <!-- Card 3: Google Calendar Sync -->
          <div class="glass-panel p-5 rounded-3xl glow-card relative overflow-hidden">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold uppercase tracking-wider text-slate-500">Google Calendar</span>
              <span class="text-xl">📅</span>
            </div>
            <div class="mt-3">
              <span class="text-2xl font-display font-extrabold text-slate-900">${syncedBlocks} / ${totalBlocks}</span>
              <p class="text-xs text-slate-500 mt-1">Eventos sincronizados en tu cuenta</p>
            </div>
            <div class="mt-3">
              <button id="btn-sync-calendar" class="w-full py-1.5 px-3 rounded-xl text-xs font-bold text-brand-700 bg-brand-50 hover:bg-brand-100 transition-colors flex items-center justify-center gap-1.5">
                <span>🔄 Sincronizar Todo con Calendar</span>
              </button>
            </div>
          </div>

        </div>

        <!-- Section Header & Filter / Add Block -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
          <div>
            <h2 class="text-xl font-display font-bold text-slate-900 flex items-center gap-2">
              <span>Planificación Semanal de Estudio</span>
              <span class="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-normal">Organización autónoma</span>
            </h2>
            <p class="text-xs text-slate-500 mt-0.5">Distribuye el esfuerzo en bloques cortos para garantizar la asimilación a largo plazo.</p>
          </div>

          <div class="flex items-center gap-2.5">
            <button id="btn-new-block" class="px-4 py-2 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-md shadow-brand-500/20 transition-all flex items-center gap-1.5">
              <span>＋</span>
              <span>Añadir Bloque de Estudio</span>
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
                <p class="mt-2 text-sm font-semibold text-slate-700">No hay bloques de estudio programados.</p>
                <p class="text-xs text-slate-400">Pulsa en "Añadir Bloque de Estudio" para empezar a organizar tu tiempo.</p>
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
                              <span>✓</span> Google Calendar
                            </span>`
                          : `<span class="inline-flex items-center gap-1 text-[10px] font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">
                              Pendiente sync
                            </span>`
                      }
                    </div>
                    <p class="text-xs text-slate-500 mt-1">${block.notes || 'Sin observaciones adicionales'}</p>
                  </div>
                </div>

                <!-- Right Timing & Actions -->
                <div class="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100">
                  <div class="text-left sm:text-right">
                    <span class="block text-xs font-bold text-slate-800">${block.date} • ${block.startTime}</span>
                    <span class="text-[11px] text-slate-400">${block.durationMinutes} minutos recomendados</span>
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
            <h3 class="font-display font-bold text-lg text-slate-900 mb-1">Añadir Bloque de Estudio</h3>
            <p class="text-xs text-slate-500 mb-4">Planifica un hito para organizar tu tiempo de aprendizaje.</p>

            <form id="new-block-form" class="space-y-3">
              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">Título de la actividad</label>
                <input type="text" id="nb-title" placeholder="Ej. Repaso de vocabulario en Inglés" required class="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500" />
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-xs font-bold text-slate-700 mb-1">Asignatura</label>
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
                  <label class="block text-xs font-bold text-slate-700 mb-1">Tipo de Hito</label>
                  <select id="nb-type" class="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500">
                    <option value="study_session">Sesión de estudio (45 min)</option>
                    <option value="exam">Examen lectivo</option>
                    <option value="assignment_due">Entrega de trabajo</option>
                  </select>
                </div>
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-xs font-bold text-slate-700 mb-1">Fecha</label>
                  <input type="date" id="nb-date" value="${new Date().toISOString().split('T')[0]}" required class="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500" />
                </div>
                <div>
                  <label class="block text-xs font-bold text-slate-700 mb-1">Hora Inicio</label>
                  <input type="time" id="nb-time" value="17:00" required class="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500" />
                </div>
              </div>

              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">Notas u objetivo personal</label>
                <input type="text" id="nb-notes" placeholder="Ej. Resolver 3 ejercicios sin mirar la solución" class="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500" />
              </div>

              <div class="pt-3 flex justify-end gap-2 border-t border-slate-100">
                <button type="button" id="btn-cancel-nb" class="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100">Cancelar</button>
                <button type="submit" class="px-4 py-1.5 rounded-xl text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 shadow-md shadow-brand-500/20">Guardar Bloque</button>
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
      if (syncBtn) syncBtn.innerHTML = `<span>⏳ Sincronizando...</span>`;
      try {
        await googleCalendarService.syncAllPendingBlocks();
        await loadData();
      } catch (err: any) {
        alert(err.message || 'Error al sincronizar con Google Calendar');
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

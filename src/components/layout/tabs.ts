export type ActiveTab = 'agenda' | 'study' | 'tasks';

export interface TabsCallbacks {
  onTabChange: (tab: ActiveTab) => void;
}

export function renderTabs(container: HTMLElement, activeTab: ActiveTab, callbacks: TabsCallbacks): void {
  container.innerHTML = `
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2">
      <div class="flex items-center justify-between border-b border-slate-200">
        
        <!-- Tab Navigation Buttons -->
        <div class="flex space-x-1 sm:space-x-3 -mb-px">
          
          <!-- Tab 1: Agenda -->
          <button data-tab="agenda" class="tab-btn group relative flex items-center gap-2.5 py-3 px-3 sm:px-5 font-medium text-sm transition-all border-b-2 ${
            activeTab === 'agenda'
              ? 'border-brand-600 text-brand-600 font-semibold'
              : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'
          }">
            <span class="text-base sm:text-lg">📅</span>
            <span>Agenda</span>
            <span class="ml-1 px-1.5 py-0.5 text-[11px] font-bold rounded-full ${
              activeTab === 'agenda' ? 'bg-brand-100 text-brand-700' : 'bg-slate-100 text-slate-600'
            }">3</span>
          </button>

          <!-- Tab 2: Estudio / Repaso -->
          <button data-tab="study" class="tab-btn group relative flex items-center gap-2.5 py-3 px-3 sm:px-5 font-medium text-sm transition-all border-b-2 ${
            activeTab === 'study'
              ? 'border-brand-600 text-brand-600 font-semibold'
              : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'
          }">
            <span class="text-base sm:text-lg">💡</span>
            <span>Estudio / Repaso</span>
            <span class="ml-1 px-1.5 py-0.5 text-[11px] font-bold rounded-full bg-accent-emerald/10 text-accent-emerald">
              Tutor IA
            </span>
          </button>

          <!-- Tab 3: Trabajos -->
          <button data-tab="tasks" class="tab-btn group relative flex items-center gap-2.5 py-3 px-3 sm:px-5 font-medium text-sm transition-all border-b-2 ${
            activeTab === 'tasks'
              ? 'border-brand-600 text-brand-600 font-semibold'
              : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'
          }">
            <span class="text-base sm:text-lg">📝</span>
            <span>Trabajos</span>
            <span class="ml-1 px-1.5 py-0.5 text-[11px] font-bold rounded-full ${
              activeTab === 'tasks' ? 'bg-brand-100 text-brand-700' : 'bg-slate-100 text-slate-600'
            }">1</span>
          </button>
        </div>

        <!-- Right Quick Tip / Slogan -->
        <div class="hidden md:flex items-center gap-2 text-xs text-slate-500">
          <span class="w-2 h-2 rounded-full bg-accent-cyan"></span>
          <span>Pensamiento crítico activo • Sin trampas de IA</span>
        </div>
      </div>
    </nav>
  `;

  const buttons = container.querySelectorAll<HTMLButtonElement>('.tab-btn');
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const tab = button.dataset.tab as ActiveTab;
      callbacks.onTabChange(tab);
    });
  });
}

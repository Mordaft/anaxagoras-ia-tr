import './styles/index.css';
import { initializeStarterData } from './services/storage';
import { renderNavbar } from './components/layout/navbar';
import { renderTabs, type ActiveTab } from './components/layout/tabs';
import { renderAISettingsModal } from './components/modals/ai-settings-modal';
import { renderAuthModal } from './components/modals/auth-modal';
import { renderAgendaView } from './components/views/agenda-view';
import { renderStudyView } from './components/views/study-view';
import { renderTasksView } from './components/views/tasks-view';

class AnaxagorasApp {
  private activeTab: ActiveTab = 'agenda';
  private navbarRoot: HTMLElement;
  private tabsRoot: HTMLElement;
  private viewContainer: HTMLElement;
  private modalRoot: HTMLElement;

  constructor() {
    this.navbarRoot = document.getElementById('navbar-root')!;
    this.tabsRoot = document.getElementById('tabs-root')!;
    this.viewContainer = document.getElementById('app-view-container')!;
    this.modalRoot = document.getElementById('modal-root')!;
  }

  public async start(): Promise<void> {
    // 1. Initialize local IndexedDB starter dataset
    await initializeStarterData();

    // 2. Render layout
    this.renderHeaderAndTabs();

    // 3. Render initial view
    this.switchView(this.activeTab);
  }

  private renderHeaderAndTabs(): void {
    renderNavbar(this.navbarRoot, {
      onOpenAISettings: () => this.openAISettingsModal(),
      onOpenAuth: () => this.openAuthModal(),
      onLanguageChange: (lang) => {
        console.log(`[Anaxagoras AI] Idioma seleccionado: ${lang}`);
      }
    });

    renderTabs(this.tabsRoot, this.activeTab, {
      onTabChange: (newTab) => {
        this.activeTab = newTab;
        this.renderHeaderAndTabs();
        this.switchView(this.activeTab);
      }
    });
  }

  private switchView(tab: ActiveTab): void {
    this.viewContainer.innerHTML = '';
    switch (tab) {
      case 'agenda':
        renderAgendaView(this.viewContainer);
        break;
      case 'study':
        renderStudyView(this.viewContainer);
        break;
      case 'tasks':
        renderTasksView(this.viewContainer);
        break;
    }
  }

  private openAISettingsModal(): void {
    renderAISettingsModal(this.modalRoot, {
      onSaved: () => {
        this.modalRoot.innerHTML = '';
        this.renderHeaderAndTabs();
      },
      onClose: () => {
        this.modalRoot.innerHTML = '';
      }
    });
  }

  private openAuthModal(): void {
    renderAuthModal(this.modalRoot, {
      onClose: () => {
        this.modalRoot.innerHTML = '';
      },
      onStateChanged: () => {
        this.renderHeaderAndTabs();
        this.switchView(this.activeTab);
      }
    });
  }
}

// Bootstrap application on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  const app = new AnaxagorasApp();
  app.start().catch(err => {
    console.error('[Anaxagoras AI] Error al inicializar la aplicación:', err);
  });
});

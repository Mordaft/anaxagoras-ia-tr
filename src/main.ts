import './styles/index.css';
import { i18n } from './services/i18n';
import { pwaService } from './services/pwa-service';
import { initializeStarterData } from './services/storage';
import { googleAuthService } from './services/google-auth';
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
  private isReady = false;

  constructor() {
    this.navbarRoot = document.getElementById('navbar-root')!;
    this.tabsRoot = document.getElementById('tabs-root')!;
    this.viewContainer = document.getElementById('app-view-container')!;
    this.modalRoot = document.getElementById('modal-root')!;
  }

  public async start(): Promise<void> {
    // 1. Initialize standard i18n system first
    await i18n.init();

    // 2. Initialize local IndexedDB starter dataset
    await initializeStarterData();

    // 3. Register PWA Service Worker with update detection
    await pwaService.register();

    // 4. Listen for language changes and re-render entire interface reactively
    i18n.subscribe(() => {
      if (this.isReady) {
        this.renderHeaderAndTabs();
        this.switchView(this.activeTab);
      }
    });

    // 5. Listen for student profile changes (1º ESO vs 2º Bachillerato) reactively
    googleAuthService.subscribe(() => {
      if (this.isReady) {
        this.renderHeaderAndTabs();
        this.switchView(this.activeTab);
      }
    });

    // 6. Render layout
    this.renderHeaderAndTabs();

    // 7. Render initial view
    this.switchView(this.activeTab);
    this.isReady = true;
  }

  private renderHeaderAndTabs(): void {
    renderNavbar(this.navbarRoot, {
      onOpenAISettings: () => this.openAISettingsModal(),
      onOpenAuth: () => this.openAuthModal(),
      onLanguageChange: () => {
        // Handled reactively by i18n subscriber
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

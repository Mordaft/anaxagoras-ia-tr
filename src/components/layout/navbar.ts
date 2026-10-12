import { googleAuthService } from '../../services/google-auth';
import { aiClientService } from '../../services/ai-client';
import { i18n, t } from '../../services/i18n';
import type { SupportedLanguage } from '../../types/ai';

export interface NavbarCallbacks {
  onOpenAISettings: () => void;
  onOpenAuth: () => void;
  onLanguageChange: (lang: SupportedLanguage) => void;
}

export function renderNavbar(container: HTMLElement, callbacks: NavbarCallbacks): void {
  const currentLang = i18n.getCurrentLanguage();

  container.innerHTML = `
    <header class="sticky top-0 z-40 w-full glass-panel border-b border-slate-200/80 shadow-sm transition-all duration-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        <!-- Logo & Branding -->
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-600 via-brand-500 to-accent-cyan flex items-center justify-center text-white shadow-md shadow-brand-500/25">
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <div class="flex items-center gap-2">
              <span class="font-display font-bold text-xl tracking-tight text-slate-900">${t('app.title')}</span>
              <span class="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-brand-50 text-brand-700 border border-brand-200">
                ${t('app.badge')}
              </span>
            </div>
            <p class="text-xs text-slate-500 hidden sm:block">${t('app.tagline')}</p>
          </div>
        </div>

        <!-- Global Action Controls -->
        <div class="flex items-center space-x-2 sm:space-x-3">
          
          <!-- Standard i18n Language Selector -->
          <div class="relative">
            <select id="lang-selector" class="text-xs font-semibold bg-slate-100 hover:bg-slate-200/80 text-slate-700 border-none rounded-xl py-1.5 px-2.5 cursor-pointer focus:ring-2 focus:ring-brand-500 focus:outline-none transition-colors">
              <option value="es" ${currentLang === 'es' ? 'selected' : ''}>🇪🇸 Castellano</option>
              <option value="ca" ${currentLang === 'ca' ? 'selected' : ''}>Català</option>
              <option value="ga" ${currentLang === 'ga' ? 'selected' : ''}>Galego</option>
              <option value="eu" ${currentLang === 'eu' ? 'selected' : ''}>Euskera</option>
              <option value="va" ${currentLang === 'va' ? 'selected' : ''}>Valencià</option>
            </select>
          </div>

          <!-- AI Model Status Pill -->
          <button id="btn-ai-settings" class="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-brand-50 hover:text-brand-700 border border-slate-200 transition-all text-slate-700 hover:border-brand-300">
            <span class="w-2 h-2 rounded-full bg-accent-emerald animate-soft-pulse"></span>
            <span id="ai-model-label" class="hidden md:inline">Ollama (${t('nav.local')})</span>
            <span class="text-[11px] text-slate-400">⚙️</span>
          </button>

          <!-- Google Auth / Profile Pill -->
          <div id="auth-container"></div>
        </div>
      </div>
    </header>
  `;

  // Language selector listener with i18n
  const langSelect = container.querySelector<HTMLSelectElement>('#lang-selector');
  langSelect?.addEventListener('change', async (e) => {
    const lang = (e.target as HTMLSelectElement).value as SupportedLanguage;
    await i18n.changeLanguage(lang);
    callbacks.onLanguageChange(lang);
  });

  // AI settings modal trigger
  const aiBtn = container.querySelector('#btn-ai-settings');
  aiBtn?.addEventListener('click', () => callbacks.onOpenAISettings());

  // Subscribe to Auth State
  const authContainer = container.querySelector('#auth-container');
  if (authContainer) {
    googleAuthService.subscribe((state) => {
      if (state.isAuthenticated && state.user) {
        authContainer.innerHTML = `
          <button id="btn-user-profile" class="flex items-center gap-2 pl-2 pr-3 py-1 rounded-xl bg-slate-100 hover:bg-slate-200/80 border border-slate-200 transition-all">
            <img src="${state.user.avatarUrl}" alt="${state.user.name}" class="w-6 h-6 rounded-full object-cover border border-brand-200" />
            <div class="text-left hidden sm:block">
              <span class="block text-xs font-semibold text-slate-800 leading-none">${state.user.name}</span>
              <span class="text-[10px] text-slate-500 leading-none">${state.user.gradeLevel}</span>
            </div>
            <span class="w-2 h-2 rounded-full ${state.mode === 'real' ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'} ml-1" title="${state.mode === 'real' ? 'Cuenta Google Real' : 'Modo Demo Activo'}"></span>
          </button>
        `;
        authContainer.querySelector('#btn-user-profile')?.addEventListener('click', callbacks.onOpenAuth);
      } else {
        authContainer.innerHTML = `
          <button id="btn-connect-google" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 shadow-sm hover:shadow transition-all">
            <svg class="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            <span class="hidden sm:inline">${t('nav.connectGoogle')}</span>
          </button>
        `;
        authContainer.querySelector('#btn-connect-google')?.addEventListener('click', callbacks.onOpenAuth);
      }
    });
  }

  // Update AI status label dynamically
  aiClientService.getSettings().then(settings => {
    const label = container.querySelector('#ai-model-label');
    if (label) {
      label.textContent = settings.provider === 'local' 
        ? `${settings.modelName} (${t('nav.local')})` 
        : `${settings.modelName} (${t('nav.cloud')})`;
    }
  });
}

import { googleAuthService } from '../../services/google-auth';
import { pwaService } from '../../services/pwa-service';
import { t } from '../../services/i18n';

export interface AuthModalCallbacks {
  onClose: () => void;
  onStateChanged: () => void;
}

export function renderAuthModal(container: HTMLElement, callbacks: AuthModalCallbacks): void {
  const auth = googleAuthService.getState();

  container.innerHTML = `
    <div class="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div class="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 sm:p-8 border border-slate-100 transition-all">
        
        <!-- Header -->
        <div class="flex items-center justify-between pb-4 border-b border-slate-100">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center border border-slate-200">
              <svg class="w-6 h-6" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
            </div>
            <div>
              <h3 class="font-display font-bold text-lg text-slate-900">${t('authModal.title')}</h3>
              <p class="text-xs text-slate-500">${t('authModal.subtitle')}</p>
            </div>
          </div>
          <button id="btn-close-auth" class="text-slate-400 hover:text-slate-600 p-2 rounded-xl hover:bg-slate-100 transition-colors">
            ✕
          </button>
        </div>

        <!-- Body -->
        <div class="mt-6 space-y-5">
          ${
            auth.isAuthenticated && auth.user
              ? `
              <!-- User Profile Card -->
              <div class="p-4 rounded-2xl bg-brand-50/50 border border-brand-100 flex items-center justify-between gap-4">
                <div class="flex items-center gap-3.5 overflow-hidden">
                  <img src="${auth.user.avatarUrl}" alt="${auth.user.name}" class="w-12 h-12 rounded-2xl object-cover border-2 border-white shadow-md flex-shrink-0" />
                  <div class="truncate">
                    <h4 class="font-bold text-sm text-slate-900 truncate">${auth.user.name}</h4>
                    <p class="text-xs text-slate-500 font-mono truncate">${auth.user.email}</p>
                    <span class="inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-brand-100 text-brand-800">
                      ${auth.user.gradeLevel}
                    </span>
                  </div>
                </div>

                <!-- Mode Badge -->
                <div class="flex-shrink-0">
                  ${
                    auth.mode === 'real'
                      ? `<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                          <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                          ${t('authModal.realBadge')}
                        </span>`
                      : `<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">
                          <span>⚡</span>
                          ${t('authModal.demoBadge')}
                        </span>`
                  }
                </div>
              </div>

              <!-- Grade Switcher for TR Live Defense -->
              <div class="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-2">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <span>🎓</span>
                    <span>Nivel Escolar (Demostración TR):</span>
                  </span>
                  <span class="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-200 text-slate-700">
                    ${auth.user.stageName || 'Piaget'}
                  </span>
                </div>
                <div class="grid grid-cols-2 gap-2">
                  <button id="btn-modal-set-1eso" class="py-2 px-3 rounded-xl text-xs font-bold transition-all ${auth.user.gradeKey === '1eso' ? 'bg-emerald-600 text-white shadow-sm' : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'}">
                    🟢 1º ESO (12 años)
                  </button>
                  <button id="btn-modal-set-2batx" class="py-2 px-3 rounded-xl text-xs font-bold transition-all ${auth.user.gradeKey === '2batx' ? 'bg-purple-600 text-white shadow-sm' : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'}">
                    🟣 2º Bachillerato (17-18)
                  </button>
                </div>
                <p class="text-[11px] text-slate-500 leading-tight">
                  ${auth.user.gradeKey === '1eso' 
                    ? '• 1º de ESO: Operaciones Concretas. El complemento verbal se identifica en bloque sin exigir tipos.' 
                    : '• 2º de Bachillerato: Operaciones Formales. Obligatorio indicar el tipo de complemento verbal (CPred vs CCL) y justificar con pruebas.'}
                </p>
              </div>

              <!-- Connected Services Status -->
              <div class="space-y-2">
                <h5 class="text-xs font-bold uppercase tracking-wider text-slate-400">${t('authModal.authorizedResources')}</h5>
                
                <div class="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div class="flex items-center gap-2.5">
                    <span class="text-base">📅</span>
                    <div>
                      <p class="text-xs font-bold text-slate-800">${t('authModal.calendarTitle')}</p>
                      <p class="text-[11px] text-slate-500">${t('authModal.calendarDesc')}</p>
                    </div>
                  </div>
                  <span class="text-xs font-bold ${auth.mode === 'real' ? 'text-emerald-700 bg-emerald-50 border border-emerald-200' : 'text-amber-700 bg-amber-50 border border-amber-200'} px-2.5 py-0.5 rounded-md">
                    ${auth.mode === 'real' ? t('authModal.statusReal') : t('authModal.statusDemo')}
                  </span>
                </div>

                <div class="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div class="flex items-center gap-2.5">
                    <span class="text-base">📁</span>
                    <div>
                      <p class="text-xs font-bold text-slate-800">${t('authModal.driveTitle')}</p>
                      <p class="text-[11px] text-slate-500">${t('authModal.driveDesc')}</p>
                    </div>
                  </div>
                  <span class="text-xs font-bold ${auth.mode === 'real' ? 'text-emerald-700 bg-emerald-50 border border-emerald-200' : 'text-amber-700 bg-amber-50 border border-amber-200'} px-2.5 py-0.5 rounded-md">
                    ${auth.mode === 'real' ? t('authModal.statusReal') : t('authModal.statusDemo')}
                  </span>
                </div>
              </div>

              <!-- PWA Version and Update Management -->
              <div class="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div class="flex items-center gap-2.5">
                  <span class="text-base">📱</span>
                  <div>
                    <span class="block text-xs font-bold text-slate-800">Actualizaciones de la Aplicación</span>
                    <span class="text-[10px] text-slate-500">PWA instalable • Caché Network-First</span>
                  </div>
                </div>
                <div class="flex items-center gap-2">
                  <button id="btn-manual-check-update" class="px-3 py-1.5 rounded-xl text-[11px] font-bold text-brand-700 bg-brand-50 hover:bg-brand-100 border border-brand-200 transition-colors flex items-center gap-1.5 cursor-pointer">
                    <span>🔄</span>
                    <span>Buscar actualización</span>
                  </button>
                  <button id="btn-force-hard-reset" class="px-2.5 py-1.5 rounded-xl text-[11px] font-semibold text-slate-600 hover:text-rose-700 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-colors" title="Limpiar caché local y forzar descarga limpia">
                    🧹 Limpiar
                  </button>
                </div>
              </div>

              <!-- Switch or Disconnect Actions -->
              <div class="pt-3 border-t border-slate-100 flex flex-col gap-2">
                ${
                  auth.mode === 'demo'
                    ? `
                    <button id="btn-show-real-connect" class="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors flex items-center justify-center gap-2">
                      <span>🔐</span>
                      <span>${t('authModal.realOptionTitle')}</span>
                    </button>
                  `
                    : `
                    <button id="btn-switch-to-demo" class="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200 transition-colors flex items-center justify-center gap-2">
                      <span>⚡</span>
                      <span>${t('authModal.demoButton')}</span>
                    </button>
                  `
                }

                <button id="btn-disconnect-google" class="w-full py-2 px-4 rounded-xl text-xs font-bold text-rose-600 bg-white hover:bg-rose-50 border border-rose-200 transition-colors">
                  ${t('authModal.disconnect')}
                </button>
              </div>
            `
              : ''
          }

          <!-- Real OAuth Connection Form (Visible if unauthenticated or explicitly requested) -->
          <div id="real-connect-box" class="${auth.isAuthenticated ? 'hidden' : 'block'} space-y-4 pt-1">
            
            <div class="p-4 rounded-2xl bg-brand-50/40 border border-brand-100 space-y-2">
              <h5 class="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <span>🔐</span>
                <span>${t('authModal.realOptionTitle')}</span>
              </h5>
              <p class="text-xs text-slate-600 leading-relaxed">${t('authModal.realOptionDesc')}</p>
            </div>

            <!-- Client ID Input -->
            <div>
              <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">${t('authModal.clientIdLabel')}</label>
              <input 
                type="text" 
                id="input-client-id" 
                value="${auth.clientId || ''}" 
                placeholder="${t('authModal.clientIdPlaceholder')}"
                class="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 focus:outline-none transition-all font-mono text-slate-800"
              />
              <span class="text-[11px] text-slate-400 mt-1 block">${t('authModal.clientIdHelp')}</span>
            </div>

            <!-- Error message container -->
            <div id="auth-error-box" class="hidden p-3 rounded-xl text-xs font-medium bg-rose-50 text-rose-700 border border-rose-200"></div>

            <!-- Real Connect Button -->
            <button id="btn-do-connect-real" class="w-full py-3 px-4 rounded-2xl text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 flex items-center justify-center gap-2 shadow-md shadow-brand-500/25 transition-all">
              <svg class="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#ffffff" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#ffffff" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#ffffff" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#ffffff" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>${t('authModal.realButton')}</span>
            </button>

            <!-- Demo Mode Alternative Button -->
            <div class="relative flex py-2 items-center">
              <div class="flex-grow border-t border-slate-200"></div>
              <span class="flex-shrink mx-3 text-[11px] text-slate-400 uppercase font-semibold">o bien</span>
              <div class="flex-grow border-t border-slate-200"></div>
            </div>

            <button id="btn-activate-demo" class="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors flex items-center justify-center gap-2">
              <span>⚡</span>
              <span>${t('authModal.demoButton')}</span>
            </button>

          </div>

        </div>
      </div>
    </div>
  `;

  // Close button
  container.querySelector('#btn-close-auth')?.addEventListener('click', callbacks.onClose);

  // Toggle real connect box if in demo mode
  container.querySelector('#btn-show-real-connect')?.addEventListener('click', () => {
    container.querySelector('#real-connect-box')?.classList.remove('hidden');
  });

  // Grade Profile Switchers (1º ESO vs 2º Bachillerato)
  container.querySelector('#btn-modal-set-1eso')?.addEventListener('click', () => {
    googleAuthService.setGradeProfile('1eso');
    callbacks.onStateChanged();
    renderAuthModal(container, callbacks);
  });

  container.querySelector('#btn-modal-set-2batx')?.addEventListener('click', () => {
    googleAuthService.setGradeProfile('2batx');
    callbacks.onStateChanged();
    renderAuthModal(container, callbacks);
  });

  // PWA manual update check & hard reset
  container.querySelector('#btn-manual-check-update')?.addEventListener('click', async () => {
    await pwaService.checkForUpdates(true);
  });

  container.querySelector('#btn-force-hard-reset')?.addEventListener('click', async () => {
    if (confirm('¿Deseas limpiar la caché del navegador y recargar la última versión desde el servidor? Tus datos de estudio se mantendrán seguros.')) {
      await pwaService.forceHardReset();
    }
  });

  // Switch to demo mode
  container.querySelector('#btn-switch-to-demo')?.addEventListener('click', async () => {
    await googleAuthService.connectDemo();
    callbacks.onStateChanged();
    callbacks.onClose();
  });

  container.querySelector('#btn-activate-demo')?.addEventListener('click', async () => {
    await googleAuthService.connectDemo();
    callbacks.onStateChanged();
    callbacks.onClose();
  });

  // Disconnect button
  container.querySelector('#btn-disconnect-google')?.addEventListener('click', () => {
    googleAuthService.disconnect();
    callbacks.onStateChanged();
    callbacks.onClose();
  });

  // Real connect button
  const connectRealBtn = container.querySelector('#btn-do-connect-real');
  const errorBox = container.querySelector('#auth-error-box');

  connectRealBtn?.addEventListener('click', async () => {
    const clientIdInput = container.querySelector('#input-client-id') as HTMLInputElement;
    const clientId = clientIdInput?.value.trim();

    if (!clientId) {
      if (errorBox) {
        errorBox.classList.remove('hidden');
        errorBox.textContent = 'Por favor, introduce tu Google OAuth Client ID.';
      }
      return;
    }

    if (connectRealBtn) connectRealBtn.innerHTML = `<span>⏳ Conectando con Google...</span>`;

    try {
      await googleAuthService.connectRealGoogle(clientId);
      callbacks.onStateChanged();
      callbacks.onClose();
    } catch (err: any) {
      if (connectRealBtn) {
        connectRealBtn.innerHTML = `<span>${t('authModal.realButton')}</span>`;
      }
      if (errorBox) {
        errorBox.classList.remove('hidden');
        errorBox.textContent = err.message || 'Error al conectar con Google OAuth 2.0.';
      }
    }
  });
}

import { googleAuthService } from '../../services/google-auth';

export interface AuthModalCallbacks {
  onClose: () => void;
  onStateChanged: () => void;
}

export function renderAuthModal(container: HTMLElement, callbacks: AuthModalCallbacks): void {
  const auth = googleAuthService.getState();

  container.innerHTML = `
    <div class="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div class="relative bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 sm:p-8 border border-slate-100 transition-all">
        
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
              <h3 class="font-display font-bold text-lg text-slate-900">Cuenta de Google</h3>
              <p class="text-xs text-slate-500">Google OAuth 2.0 • Calendar & Drive</p>
            </div>
          </div>
          <button id="btn-close-auth" class="text-slate-400 hover:text-slate-600 p-2 rounded-xl hover:bg-slate-100 transition-colors">
            ✕
          </button>
        </div>

        <!-- Body -->
        <div class="mt-6 space-y-4">
          ${
            auth.isAuthenticated && auth.user
              ? `
              <!-- User Profile Card -->
              <div class="p-4 rounded-2xl bg-brand-50/50 border border-brand-100 flex items-center gap-4">
                <img src="${auth.user.avatarUrl}" alt="${auth.user.name}" class="w-14 h-14 rounded-2xl object-cover border-2 border-white shadow-md" />
                <div>
                  <h4 class="font-bold text-sm text-slate-900">${auth.user.name}</h4>
                  <p class="text-xs text-slate-500 font-mono">${auth.user.email}</p>
                  <span class="inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-brand-100 text-brand-800">
                    ${auth.user.gradeLevel}
                  </span>
                </div>
              </div>

              <!-- Connected Services Status -->
              <div class="space-y-2">
                <h5 class="text-xs font-bold uppercase tracking-wider text-slate-400">Recursos autorizados</h5>
                
                <div class="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div class="flex items-center gap-2.5">
                    <span class="text-base">📅</span>
                    <div>
                      <p class="text-xs font-bold text-slate-800">Google Calendar</p>
                      <p class="text-[11px] text-slate-500">Sincronización de bloques de estudio</p>
                    </div>
                  </div>
                  <span class="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">Activo</span>
                </div>

                <div class="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div class="flex items-center gap-2.5">
                    <span class="text-base">📁</span>
                    <div>
                      <p class="text-xs font-bold text-slate-800">Google Drive</p>
                      <p class="text-[11px] text-slate-500">Vinculación de documentos de entregables</p>
                    </div>
                  </div>
                  <span class="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">Activo</span>
                </div>
              </div>

              <!-- Disconnect Action -->
              <div class="pt-4 border-t border-slate-100">
                <button id="btn-disconnect-google" class="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors">
                  Desconectar Cuenta de Google
                </button>
              </div>
            `
              : `
              <!-- Connect Flow Explanation -->
              <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <p class="text-xs text-slate-600 leading-relaxed">
                  Conectar tu cuenta educativa o personal de Google permite:
                </p>
                <ul class="text-xs text-slate-600 space-y-2 pl-2">
                  <li class="flex items-center gap-2">
                    <span class="text-emerald-500">✓</span> Exportar tus sesiones de estudio a <strong>Google Calendar</strong>.
                  </li>
                  <li class="flex items-center gap-2">
                    <span class="text-emerald-500">✓</span> Adjuntar tus apuntes y borradores desde <strong>Google Drive</strong>.
                  </li>
                  <li class="flex items-center gap-2">
                    <span class="text-emerald-500">✓</span> Garantizar que tus datos permanezcan privados y bajo tu control.
                  </li>
                </ul>
              </div>

              <!-- Connect Button -->
              <div class="pt-2">
                <button id="btn-do-connect-google" class="w-full py-3 px-4 rounded-2xl text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 flex items-center justify-center gap-2 shadow-lg shadow-slate-900/10 transition-all">
                  <svg class="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                  <span>Iniciar Sesión con Google</span>
                </button>
              </div>
            `
          }
        </div>
      </div>
    </div>
  `;

  container.querySelector('#btn-close-auth')?.addEventListener('click', callbacks.onClose);

  container.querySelector('#btn-disconnect-google')?.addEventListener('click', () => {
    googleAuthService.disconnect();
    callbacks.onStateChanged();
    callbacks.onClose();
  });

  container.querySelector('#btn-do-connect-google')?.addEventListener('click', async () => {
    await googleAuthService.connectGoogle();
    callbacks.onStateChanged();
    callbacks.onClose();
  });
}

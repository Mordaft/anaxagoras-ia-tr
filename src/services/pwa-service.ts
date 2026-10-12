export interface PWAUpdateCallback {
  onUpdateAvailable: (applyUpdate: () => void) => void;
}

class PWAService {
  private registration: ServiceWorkerRegistration | null = null;
  private updateWaiting = false;

  public hasUpdateWaiting(): boolean {
    return this.updateWaiting;
  }

  public async register(callbacks?: PWAUpdateCallback): Promise<void> {
    if (!('serviceWorker' in navigator)) {
      console.log('[PWA] Service Worker no soportado en este navegador.');
      return;
    }

    try {
      const swUrl = './sw.js';
      // CRITICAL: updateViaCache 'none' ensures the browser always checks the network for sw.js byte changes
      const registration = await navigator.serviceWorker.register(swUrl, { 
        scope: './',
        updateViaCache: 'none'
      });
      this.registration = registration;

      // Handle updates if a service worker is already waiting in background
      if (registration.waiting) {
        this.updateWaiting = true;
        this.notifyUpdate(callbacks);
      }

      // Detect newly installed service worker waiting
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (!newWorker) return;

        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              this.updateWaiting = true;
              this.notifyUpdate(callbacks);
            }
          }
        });
      });

      // Reload page when new service worker claims and takes control
      let refreshing = false;
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (!refreshing) {
          refreshing = true;
          window.location.reload();
        }
      });

      // 1. Immediately check for updates upon startup
      registration.update().catch(() => {});

      // 2. Check for updates whenever the application is brought to foreground
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
          registration.update().catch(() => {});
        }
      });

      // 3. Check for updates on window focus and reconnection
      window.addEventListener('focus', () => {
        registration.update().catch(() => {});
      });
      window.addEventListener('online', () => {
        registration.update().catch(() => {});
      });

      // 4. Periodically check for updates every 5 minutes
      setInterval(() => {
        registration.update().catch(() => {});
      }, 1000 * 60 * 5);

    } catch (err) {
      console.warn('[PWA] Error registrando Service Worker:', err);
    }
  }

  private notifyUpdate(callbacks?: PWAUpdateCallback): void {
    if (callbacks?.onUpdateAvailable) {
      callbacks.onUpdateAvailable(() => this.applyUpdate());
    } else {
      this.showDefaultUpdateToast();
    }
  }

  public applyUpdate(): void {
    if (this.registration && this.registration.waiting) {
      this.registration.waiting.postMessage({ type: 'SKIP_WAITING' });
    } else {
      window.location.reload();
    }
  }

  /**
   * Comprueba manualmente si existe una versión más reciente desplegada en el servidor
   */
  public async checkForUpdates(isUserInitiated = false): Promise<void> {
    if (!this.registration) {
      if (isUserInitiated) {
        alert('El servicio de actualización no está activo en este navegador.');
      }
      return;
    }

    let statusToast: HTMLElement | null = null;
    if (isUserInitiated) {
      statusToast = document.createElement('div');
      statusToast.className = 'fixed bottom-5 right-5 z-50 glass-panel p-3.5 rounded-2xl shadow-xl border border-brand-200 text-xs text-slate-800 flex items-center gap-2 animate-pulse';
      statusToast.innerHTML = '<span>🔍</span><span>Buscando actualizaciones en el servidor...</span>';
      document.body.appendChild(statusToast);
    }

    try {
      // 1. Trigger service worker update check
      await this.registration.update();

      // 2. Also check remote version.json with anti-cache timestamp
      const res = await fetch(`./version.json?t=${Date.now()}`, { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        console.log('[PWA] Versión desplegada en servidor:', data);
      }

      // Small delay for user perception
      if (isUserInitiated) {
        await new Promise(r => setTimeout(r, 900));
        statusToast?.remove();

        if (this.updateWaiting) {
          this.showDefaultUpdateToast();
        } else {
          const successToast = document.createElement('div');
          successToast.className = 'fixed bottom-5 right-5 z-50 glass-panel p-3.5 rounded-2xl shadow-xl border border-emerald-300 text-xs text-emerald-900 flex items-center gap-2';
          successToast.innerHTML = '<span>✅</span><span>Tu aplicación está actualizada a la última versión.</span>';
          document.body.appendChild(successToast);
          setTimeout(() => successToast.remove(), 3500);
        }
      }
    } catch {
      statusToast?.remove();
      if (isUserInitiated) {
        alert('No se pudo verificar el servidor de actualizaciones. Revisa tu conexión a internet.');
      }
    }
  }

  /**
   * Limpia toda la caché de service worker y recarga forzosamente (en caso de caché atascada)
   */
  public async forceHardReset(): Promise<void> {
    try {
      const registrations = await navigator.serviceWorker.getRegistrations();
      for (const reg of registrations) {
        await reg.unregister();
      }
      const keys = await caches.keys();
      for (const key of keys) {
        await caches.delete(key);
      }
    } catch (err) {
      console.warn('[PWA] Error en hard reset:', err);
    }
    window.location.reload();
  }

  public showDefaultUpdateToast(): void {
    // Evitar banners duplicados
    if (document.getElementById('pwa-update-toast')) return;

    const toast = document.createElement('div');
    toast.id = 'pwa-update-toast';
    toast.className = 'fixed bottom-5 right-5 z-50 max-w-sm glass-panel p-4 rounded-3xl shadow-2xl border-2 border-brand-300 animate-bounce flex items-center justify-between gap-3 bg-white/95 backdrop-blur-md';
    toast.innerHTML = `
      <div class="flex items-center gap-3">
        <span class="text-2xl p-2 rounded-2xl bg-brand-50 border border-brand-100 flex-shrink-0">🚀</span>
        <div>
          <h4 class="font-bold text-xs text-slate-900 leading-tight">¡Nueva versión disponible!</h4>
          <p class="text-[11px] text-slate-500 mt-0.5">Se han desplegado mejoras en Anaxagoras AI.</p>
        </div>
      </div>
      <div class="flex items-center gap-1.5 flex-shrink-0">
        <button id="btn-pwa-apply" class="px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 shadow-md shadow-brand-500/25 transition-all whitespace-nowrap">
          Actualizar
        </button>
        <button id="btn-pwa-dismiss" class="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors" title="Descartar">
          ✕
        </button>
      </div>
    `;

    document.body.appendChild(toast);

    toast.querySelector('#btn-pwa-apply')?.addEventListener('click', () => {
      this.applyUpdate();
    });

    toast.querySelector('#btn-pwa-dismiss')?.addEventListener('click', () => {
      toast.remove();
    });
  }
}

export const pwaService = new PWAService();

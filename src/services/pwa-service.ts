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
      const registration = await navigator.serviceWorker.register(swUrl, { scope: './' });
      this.registration = registration;

      // Handle updates if service worker is already waiting
      if (registration.waiting) {
        this.updateWaiting = true;
        this.notifyUpdate(callbacks);
      }

      // Detect newly installed service worker waiting
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (!newWorker) return;

        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            this.updateWaiting = true;
            this.notifyUpdate(callbacks);
          }
        });
      });

      // Reload page when new service worker takes control
      let refreshing = false;
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (!refreshing) {
          refreshing = true;
          window.location.reload();
        }
      });

      // Periodically check for updates (every 30 minutes)
      setInterval(() => {
        registration.update().catch(() => {});
      }, 1000 * 60 * 30);

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

  public showDefaultUpdateToast(): void {
    // Avoid duplicate banners
    if (document.getElementById('pwa-update-toast')) return;

    const toast = document.createElement('div');
    toast.id = 'pwa-update-toast';
    toast.className = 'fixed bottom-5 right-5 z-50 max-w-sm glass-panel p-4 rounded-2xl shadow-xl border border-brand-200 animate-bounce flex items-center justify-between gap-3';
    toast.innerHTML = `
      <div class="flex items-center gap-2.5">
        <span class="text-xl">🚀</span>
        <div>
          <h4 class="font-bold text-xs text-slate-900 leading-tight">¡Nueva versión disponible!</h4>
          <p class="text-[11px] text-slate-500">Actualiza para recibir las últimas mejoras.</p>
        </div>
      </div>
      <button id="btn-pwa-apply" class="px-3 py-1.5 rounded-xl text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 shadow-sm transition-all whitespace-nowrap">
        Actualizar
      </button>
    `;

    document.body.appendChild(toast);

    toast.querySelector('#btn-pwa-apply')?.addEventListener('click', () => {
      this.applyUpdate();
    });
  }
}

export const pwaService = new PWAService();

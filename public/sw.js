const CACHE_VERSION = 'v1.1.1';
const CACHE_NAME = `anaxagoras-ai-${CACHE_VERSION}`;

const PRECACHE_ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './favicon-32x32.png'
];

// Install: Pre-cache static core and activate immediately
self.addEventListener('install', (event) => {
  console.log('[SW] Instalando nueva versión:', CACHE_NAME);
  self.skipWaiting(); // No esperar a que se cierren las pestañas activas
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS).catch((err) => {
        console.warn('[SW] Fallo al precachear algunos assets:', err);
      });
    })
  );
});

// Activate: Purge old version caches and take immediate control of clients
self.addEventListener('activate', (event) => {
  console.log('[SW] Activando nueva versión:', CACHE_NAME);
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME && key.startsWith('anaxagoras-ai-')) {
            console.log('[SW] Purgando caché obsoleta:', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch: Strategy depending on request type
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Bypass API / LLM requests
  if (
    url.pathname.includes('/v1/') || 
    url.hostname.includes('googleapis.com') ||
    url.hostname.includes('openai.com') ||
    url.hostname.includes('educacio.gencat.cat') ||
    event.request.method !== 'GET'
  ) {
    return;
  }

  // 1. Navigation / HTML Requests: Network-First with Cache Fallback
  // Esto garantiza que los usuarios online reciban SIEMPRE la última versión desplegada de index.html
  const isNavigation = 
    event.request.mode === 'navigate' ||
    event.request.destination === 'document' ||
    url.pathname.endsWith('.html') ||
    url.pathname === '/' ||
    url.pathname.endsWith('/');

  if (isNavigation) {
    event.respondWith(
      fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const copy = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          }
          return networkResponse;
        })
        .catch(() => {
          // Si no hay red, servir desde caché offline
          return caches.match(event.request).then((cached) => cached || caches.match('./index.html'));
        })
    );
    return;
  }

  // 2. Static Assets (JS, CSS, Images, Icons, Fonts): Stale-While-Revalidate
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }
          return networkResponse;
        })
        .catch(() => cachedResponse);

      return cachedResponse || fetchPromise;
    })
  );
});

// Message listener for skipWaiting / manual version refresh
self.addEventListener('message', (event) => {
  if (event.data && (event.data.type === 'SKIP_WAITING' || event.data.type === 'FORCE_REFRESH')) {
    self.skipWaiting();
  }
});

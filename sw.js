// =============================================
// GAMESTORE V2 — Service Worker
// Estrategia: Cache First para assets, Network First para datos
// =============================================

const CACHE_NAME = 'gamestore-v2-1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/view.html',
  '/profile.html',
  '/css/main.css',
  '/js/data.js',
  '/js/app.js',
  '/js/view.js',
  '/img/NEOCRAFT.png',
  '/img/profile/NEOMC11.png',
];

// Install: cachear assets estáticos
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS.map(url => new Request(url, { cache: 'reload' })));
    }).catch(() => {})
  );
  self.skipWaiting();
});

// Activate: limpiar caches viejos
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch: estrategia stale-while-revalidate para HTML, cache-first para assets
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Solo manejar mismo origen
  if (url.origin !== location.origin) return;

  // Ignorar chrome-extension y otros
  if (!request.url.startsWith('http')) return;

  event.respondWith(
    caches.match(request).then((cached) => {
      const networkFetch = fetch(request).then((response) => {
        if (response && response.status === 200 && response.type === 'basic') {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
        }
        return response;
      }).catch(() => cached);

      return cached || networkFetch;
    })
  );
});

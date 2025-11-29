const CACHE_NAME = 'gamestore-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/NEOCRAFT.png',  // Tu ícono
  // Agrega más si quieres: '/port/craftsman.png', etc.
];

// Instalación: Cachea los archivos
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

// Fetch: Sirve desde cache o red
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});

// Actualización: Borra caches viejos
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
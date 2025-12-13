const CACHE_NAME = 'GAMESTORE-3';
  const urlsToCache = [
    '/',
    '/index.html',
    '/css/main.css',
    '/css/lisc.css',
    '/css/view.css',
    '/css/pwa-install.css',
    '/js/main.js',
    '/js/functions.js',
    '/js/complements.js',
    '/js/view.js',
    '/js/pwa-install.js',
    '/img/NEOCRAFT.png',
    '/img/NEOCRAFTss.png'
  ];
  
  self.addEventListener('install', event => {
    event.waitUntil(
      caches.open(CACHE_NAME)
        .then(cache => {
          console.log('Cache abierto');
          return cache.addAll(urlsToCache);
        })
    );
    self.skipWaiting();
  });
  self.addEventListener('activate', event => {
    event.waitUntil(
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE_NAME) {
              console.log('Eliminando cache antiguo:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
    self.clients.claim();
  });
  
  // Estrategia: Network First, fallback to Cache
  self.addEventListener('fetch', event => {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // Si la respuesta es válida, la guardamos en cache
          if (response && response.status === 200) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, responseClone);
            });
          }
          return response;
        })
        .catch(() => {
          // Si falla la red, intentamos obtener del cache
          return caches.match(event.request);
        })
    );
  });
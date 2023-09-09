swimportScripts('https://storage.googleapis.com/workbox-cdn/releases/7.2.3/workbox-sw.js');

// Cache routes
workbox.routing.registerRoute(
  '/menu',
  new workbox.strategies.CacheFirst({
    cacheName: 'menu-cache',
  })
);

workbox.routing.registerRoute(
  '/reservation',
  new workbox.strategies.CacheFirst({
    cacheName: 'reservation-cache',
  })
);

// Cache API responses
workbox.routing.registerRoute(
  'https://backb.onrender.com/api/category/get-categories',
  new workbox.strategies.NetworkFirst({
    cacheName: 'api-cache',
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 50, // Max cache entries
        maxAgeSeconds: 7 * 24 * 60 * 60, // 7 days
      }),
    ],
  })
);

// Precache files during installation
workbox.precaching.precacheAndRoute([
  // Add your static files here
]);

// Handle cleanup of old caches during activation
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (
            cacheName.startsWith('menu-cache') ||
            cacheName.startsWith('reservation-cache') ||
            cacheName.startsWith('api-cache')
          ) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

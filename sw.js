// SufferBuffer© — Service Worker
// Caches the app shell on first successful load so every later load,
// online or offline, is served from cache. Cache-first, network as fallback
// (only relevant for the very first install).

const CACHE_NAME = "sufferbuffer-v13";
const URLS_TO_CACHE = ["./", "./index.html"];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(URLS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (names) {
      return Promise.all(
        names
          .filter(function (name) { return name !== CACHE_NAME; })
          .map(function (name) { return caches.delete(name); })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (cached) {
      if (cached) return cached;
      return fetch(event.request)
        .then(function (response) {
          // best-effort: keep the cache fresh if a later online load fetches something new
          var copy = response.clone();
          caches.open(CACHE_NAME).then(function (cache) { cache.put(event.request, copy); });
          return response;
        })
        .catch(function () {
          // offline and not cached (e.g. first-ever load with no connection) — nothing we can do
          return cached;
        });
    })
  );
});

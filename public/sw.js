/* eslint-disable no-restricted-globals */
const SW_VERSION = "william-v4";

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((key) => caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener("message", (event) => {
  if (event.data?.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

// Network-only: never serve stale HTML, JS, or CSS from cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  const isDocument =
    event.request.mode === "navigate" ||
    event.request.destination === "document";
  const isMutableAsset =
    isDocument ||
    url.pathname.startsWith("/api/") ||
    url.pathname.startsWith("/image/") ||
    url.pathname.startsWith("/_next/") ||
    url.pathname === "/sw.js";

  if (isMutableAsset) {
    event.respondWith(
      fetch(event.request).catch(() =>
        caches.match(event.request).then((cached) => cached || caches.match("/"))
      )
    );
  }
});

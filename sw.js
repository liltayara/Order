// Service Worker لتطبيق Order
// يخزّن "هيكل التطبيق" فقط (order.html / order.css / order.js / الأيقونات) ليعمل
// بلا اتصال أو عند ضعف الشبكة، ويستخدم استراتيجية "الشبكة أولاً" لهذا الهيكل —
// أي تحديث تنشره يصل للمستخدم فوراً ما دام متصلاً، والنسخة المخزَّنة تُستخدم فقط
// كخط رجوع عند انقطاع الاتصال فعلياً.
//
// أي طلب آخر (Firestore، Auth، خرائط، خطوط، مكتبات CDN) يمرّ للشبكة مباشرة كأنّ
// الـ Service Worker غير موجود إطلاقاً — لا نخزّن أو نعترض بيانات حية أبداً.

const CACHE_NAME = "order-shell-v1";
const SHELL_PATHS = [
  "./order.html",
  "./order.css",
  "./order.js",
  "./manifest.json",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
];
const SHELL_URLS = SHELL_PATHS.map((p) => new URL(p, self.location).href);

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(SHELL_URLS))
      .catch(() => {}) // فشل التخزين المسبق (مثلاً أول تحميل بلا اتصال) لا يوقف التثبيت
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET" || !SHELL_URLS.includes(req.url)) return;

  event.respondWith(
    fetch(req)
      .then((res) => {
        const copy = res.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(req, copy));
        return res;
      })
      .catch(() => caches.match(req))
  );
});

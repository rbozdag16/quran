var cacheName = 'quran-v1';
var staticContentToCache = [
	'/',
	'/favicon.ico',
	'/css/fonts.css',
	'/css/rb_quran.css',
	'/css/quran.css',
	'/css/fonts/amiri.ttf',
	'/css/fonts/hamdullah.ttf',
	'/css/fonts/katibeh.ttf',
	'/css/fonts/kufi.ttf',
	'/css/fonts/lateef.ttf',
	'/css/fonts/markazi.ttf',
	'/css/fonts/mirza.ttf',
	'/css/fonts/myriad.ttf',
	'/css/fonts/rb_quran.ttf',
	'/css/fonts/saleem.ttf',
	'/css/fonts/seherezade.ttf',
	'/css/fonts/uthmani.woff',
	'/css/icons/quran-32x32.png',
	'/css/icons/quran-48x48.png',
	'/css/icons/quran-64x64.png',
	'/css/icons/quran-72x72.png',
	'/css/icons/quran-96x96.png',
	'/css/icons/quran-128x128.png',
	'/css/icons/quran-144x144.png',
	'/css/icons/quran-152x152.png',
	'/css/icons/quran-192x192.png',
	'/css/icons/quran-384x384.png',
	'/css/icons/quran-512x512.png',
	'/app.js',
	'/js/swipe.js',
	'/js/lang.js',
	'/js/quran.js',
	// '/index.html',
];

// Installing Service Worker
self.addEventListener('install', evt => {
	console.log('[Service Worker] Installed');
	evt.waitUntil(
		caches.open(cacheName).then(cache => {
			staticContentToCache.forEach(function(file){cache.add(file).catch(err=>console.err(err))});
		})
	);
});

// Fetching content using Service Worker
self.addEventListener('fetch', evt => {
	evt.respondWith(
		caches.match(evt.request).then(
			cacheResponse => {
				return cacheResponse || fetch(evt.request);
		}));
});

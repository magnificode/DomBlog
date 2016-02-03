this.addEventListener('install', function(event) {
	event.waitUntil(
		caches.open('offline').then(function(cache) {
			return cache.addAll([
				'/offline/',
				'/offline/index.html',
				'app.js',
				'sw.js'
			]);
		})
	);
});
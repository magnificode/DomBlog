this.addEventListener('install', function(event) {
	event.waitUntil(
		caches.open('offline').then(function(cache) {
			return cache.addAll([
				'/',
				'/index.html',
				'/update/2015/12/29/2015.html',
				'/css',
				'/css/main.css',
				'/app.js',
				'/serviceworker.js'
			]);
		})
	);
});

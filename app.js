if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('/serviceworker.js').then(function(reg) {
		console.log('Registration succeeded.');
	}).catch(function(error) {
		console.log('Registration failed with ' + error);
	});
}
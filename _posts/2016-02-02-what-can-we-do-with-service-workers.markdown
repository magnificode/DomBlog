---
layout: post
title:  What can we do with ServiceWorker
date:   2016-02-02 16:44:00
categories: update
---

Before you read on, be sure to check out [my first blog post](/update/2015/12/20/service-workin-for-the-weekend.html) about the Service Worker API. Service workers require a secure connection, and that post will show you how to set your site up with CloudFlare in order to serve your site via https.

##First things First

Regardless of our end game, we need to register our service worker. We're essentially going to be working in two javascript files. The first one we'll call `app.js` which is where the initial scripts for your site are housed. That is where this first snippet below will be housed.

{% highlight javascript %}
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/your-site/serviceworker.js').then(function(reg) {
    console.log('Registration succeeded.');
  }).catch(function(error) {
    console.log('Registration failed with ' + error);
  });
}
{% endhighlight %}

Lets break this down and establish what is happening here.

{% highlight javascript %}
//Check to see if service worker is supported in the current browser
if ('serviceWorker' in navigator) {
  // Register our service worker. The register function relates
  // to the javascript file within your site containing the
  // service worker directives.
  navigator.serviceWorker.register('/your-site/serviceworker.js').then(function(reg) {
  // If the registration worked, success!
    console.log('Registration succeeded.');
  }).catch(function(error) {
    // Registration failed.
    console.log('Registration failed with ' + error);
  });
}
{% endhighlight %}

The code above is not the service worker itself, rather it is registering our service worker within a scope. That being said, once a page within the scope is loaded, the service worker will run. This happens individually on each page load so long as it is within scope.

##Cache Rules Everything Around Me

Now we get to the juicy stuff. Now that we have registered a service worker, let's look at how we can utilize the cache to grab the files you'd like to utilize for offline mode on your site. In our second file, which I'm calling `serviceworker.js` place this next snippet.

{% highlight javascript %}
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
{% endhighlight %}

Since we are within the the registered service worker the scope allows us to utilize `this`. The first line of this snippet adds an install event listener. We then chain the `waitUntil` method which delays the proceeding code from running until the ES6 promise has been fulfilled. Then, utilizing the `caches.open` method, we open a new cache titled offline. This is where our cached files will be stored. This returns a promise for the cache, and once that is fulfilled we utilize the `addAll` function which adds the specified files to the cache.

I've added myself the homepage of my site, along with the latest post.

Lastly we're going to need to tell the browser that when it detects that it's offline, to access the cache that we created with the service worker and utilize the files found there.

{% highlight javascript %}
this.addEventListener('fetch', function(event) {
  var response;
  event.respondWith(caches.match(event.request).catch(function() {
    return fetch(event.request);
  }).then(function(r) {
    response = r;
    caches.open('offline').then(function(cache) {
      cache.put(event.request, response);
    });
    return response.clone();
  }));
});
{% endhighlight %}

We do this by utilizing the fetch event listener which tells the browser to respond with the cache. The first `.catch` function detects if the promise rejects, and returns the default server response. We then utilize the `.then` method to open our offline cache and put the response onto the page.

You can check out my versions of both the [app.js](https://github.com/magnificode/magnificode.github.io/blob/master/app.js) and the [serviceworker.js](https://github.com/magnificode/magnificode.github.io/blob/master/serviceworker.js) files.
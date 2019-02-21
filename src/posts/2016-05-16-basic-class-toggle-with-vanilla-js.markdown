---
layout: post
title:  Basic Class Toggle with Vanilla JS
date:   2016-05-16 16:44:00
categories: update
redirect_from:
  - /update/2016/05/16/basic-class-toggle-with-vanilla-js.html
---

One of my [goals for this year](/update/2015/12/29/2015.html) was to start to grasp vanilla JS a little bit more. While I was in school, Javascript and jQuery pretty much went hand in hand. Little was taught about vanilla JS, beyond the basics of course, in favor of the glory that was jQuery. It's understandable, that syntactic sugar is pretty irresistible.

I'm going to walk through a pretty common desire when writing Javascript, the class toggle.

Let's take a look at how we would generally do this with jQuery. Beware though, you're going to see this next snippet and think "Why are we even trying to do this in vanilla JS?!". I know...but check out [all](http://alistapart.com/blog/post/choosing-vanilla-javascript) [these](http://gomakethings.com/ditching-jquery-for-vanilla-js/) [posts](https://teamtreehouse.com/community/pure-javascript-vs-jquery-2) that advocate for the performance benefits of vanilla JS. I won't get into that here, this is purely intended to be a reference for when you decide to make the switch.

Alright, so the basic jQuery class toggling function would look something like this:

```javascript
$('.toggle-me').click( function() {
  $(this).toggleClass('active');
});
```

Pretty straight forward. We'll take this apart piece by piece. The first thing we need to do with vanilla JS is to actually target the element. Now as I'm sure you know there is always the option of utilizing `getElementByID`. But in this case, we're trying to target a class. In reality, we probably want to avoid using an ID if we can since the specificity could cause issues down the road.

## Enter querySelector

MDN [states that](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector) querySelector:

>Returns the first element within the document hat matches the specified group of selectors.

This is perfect for our case, we currently only have one element on the page with a class name of `.toggle-me`. If you have multiple elements on the page with the same class name, you'll need to look into [querySelectorAll](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll), which I'll dive into in another blog post.

So, lets set our classname to a variable to make it easy to reference.

```javascript
var el = document.querySelector('.toggle-me');
```

Perfect, now we need some sort of way to detect when that element is clicked. If you were lucky enough to see the days when folks used the inline `onclick` function, then you'll have probably guessed where we're headed.

## The Click

The `onclick` property allows us to utilize a function expression, or a named function defined elsewhere right within it. For this example I'll utilize a function expression just to keep things brief.

```javascript
var el = document.querySelector('.toggle-me');

el.onclick = function() {
  console.log('clicked!');
}
```

Sweet! If you check your console you should see our 'clicked!' logging.

## classList

The last bit of code that we'll need will do the actual toggling of the class. If you've done some searching you'll have noticed that there's not an independent toggle property in Javascript. Luckily, [classList](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList) comes to the rescue.

The `classList` property by itself is pretty self explanatory. It outputs a collection of the class attributes of the passed element. If we were to run that on our `.toggle-me` class:

```javascript
var el = document.querySelector('.toggle-me');

el.onclick = function() {
  console.log(el.classList);
}
```

You'll notice that the output in the console provides us with a DOMTokenList object. Expanding that object will show that the first value in the object, is "toggle-me".

With this object we can now use the `toggle()` method associated with the `classList` property. Much like with jQuery, in addition to `toggle()`, the `classList` property gives us access to the `add()`, `remove()`, and `item()` methods. For our purposes, we'll just stick with `toggle()`.

## Result

Unfortunately, with vanilla JS the `$(this)` property doesn't exist. However, since we are caching the the element we are manipulating, all we need to do is attach the `classList` property to our element, and then chain our `toggle()` method, passing on our active class like so:

```javascript
var el = document.querySelector('.toggle-me');

el.onclick = function() {
  el.classList.toggle('active');
}
```

And voilà! You're now accomplishing a simple class toggle on an element utilizing pure Javascript. Pat yourself on the back for saving that extra HTTP request and removing your dependency on jQuery.
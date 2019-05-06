---
layout: post
title:  Basic ES6 Vanilla JS Class Toggle
date:   2019-05-06 16:44:00
categories: update
---

Wow, almost three years after I posted a [lil' blog post](/2016-05-16-basic-class-toggle-with-vanilla-js/) about a basic class toggle with Vanilla JS, I suppose I could write out how to do this same thing with ES6.

Since we last visited our class toggle task in 2016, quite a few things have changed. Let's take what we have where we left off and refactor it a bit to be more up to the current standard.

```javascript
var el = document.querySelector('.toggle-me');

el.onclick = function() {
  el.classList.toggle('active');
}
```

Ahh yes. Nothing better than looking at your own old code...🤦‍. First things first, let's update how we're caching the DOM element using `const`.

```javascript
const el = document.querySelector('.toggle-me');

el.onclick = function() {
  el.classList.toggle('active');
}
```

Super small change here, but keep in mind, when using `const` you want to be sure that whatever you're referencing is not something that will be mutated further down the line. We know that the `.toggle-me` DOM node won't be mutated into something completely different, so `const` is appropriate here.

Next, let's take a look at the function. Currently we're using the `onclick` event handler to detect when a user clicks on our defined element. Now this will work just fine out of the box, but let's pepper in an ES6 arrow function!

As a primer, arrow functions are just a more compact way of writing a regular function like we have in the snippet above. It's worth noting however that `this` behaves quite differently within an arrow function. Tyler McGinnis has a [wonderful post](https://tylermcginnis.com/arrow-functions/) that goes into depth about the ins and outs of the arrow function. Feel free to pop over there if you want to dive a little deeper.

For our sake, we can utilize an arrow function to condense our code just a bit:

```javascript
const el = document.querySelector('.toggle-me');

el.onclick = () => el.classList.toggle('active');
```

Nice! We're able to trim that down to two very succinct lines of javascript. With our arrow function, we're implicitly running the toggle method on our element. No need to add curly braces around our one line function. This will work perfectly, and remain accessible if the class toggle is a `<button>` or `<input type="submit">` element. The `onclick` listener also accounts for users who utilize the keyboard to navigate. The `enter` and `space` keys will trigger a click on these elements. But what about if we need to toggle a class on a `<div>`, `<span>` or another element that is not interactive by default?

## Class toggles on non-interactive elements

**Big ol' disclaimer here. If you have an element on your page that does a thing when you interact with it, you will _ALMOST ALWAYS_ use a button. It's the standard for saying "Hey when you click this thing, something is going to happen on the page you're currently viewing". But, if you have a case where you absolutely cannot use a button or submit input, it's imperative that you make that element accessible for keyboard users.**

For non interactive elements like `<div>` and `<span>`, an extra step must be taken to ensure that the interaction is accessible to keyboard users. We're going to add a new event listener to our snippet that will ensure usability for all.

```javascript
const el = document.querySelector('.toggle-me');

el.onclick = () => el.classList.toggle('active');
el.addEventListener('keyup', (event) => {
  if(event.keyCode === 13 || event.keyCode === 32) {
    el.classList.toggle('active');
  }
});
```

Please also don't forget, that because these elements are not interactive by default, we need to ensure that users can focus the item properly in the DOM. Let's assume that our element is a `<div>`. By adding a `tabindex` attribute to that div, we are able to ensure that keyboard users are able to focus the element.

```html
<div class="toggle-me" tabindex="0">Hi!</div>
```

**Note here as well, when using `tabindex` you very rarely will want to take elements out of the tab flow of the document. Using `tabindex="0"` makes the element focusable, but keeps it in the normal tab flow. A value of anything other than 0 will take it out of the flow, and could potentially cause confusion for keyboard users. Only do this if it's absolutely necessary, and you have a plan to ensure that keyboard users know exactly what's happening**.

The `keyup` event listener will listen for when a keyboard user hits, and releases a key. Within our arrow function, we now need to pass that keyup event so that we can capture the event, and only trigger the class toggle if the enter, or space keys are hit (these are the keyboard keys that indicate a user is trying to perform an action on our element). With that event captured, we can then run our class toggle!

Because we're running the toggle twice, let's consolidate again.

```javascript
const el = document.querySelector('.toggle-me');
const handleToggle = () => el.classList.toggle('active');

el.onclick = () => handleToggle();
el.addEventListener('keyup', (event) => {
  if(event.keyCode === 13 || event.keyCode === 32) {
    handleToggle();
  }
});
```

With ES6 we can assign our arrow function to a `const`, and call that function in multiple places.

Spectacular! With that, you should now be able to level up your CSS class toggle to ES6 fairly painlessly for both interactive, and non-interactive elements.
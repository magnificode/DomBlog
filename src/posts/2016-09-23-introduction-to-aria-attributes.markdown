---
layout: post
title:  Introduction to ARIA Attributes
date:   2016-09-23 16:44:00
categories: update
---

Making the web accessible for all who use it is a massively important part of our job. Recently I was able to work on a component library that had an emphasis on accessibility, and I got to learn a pretty decent amount about ARIA roles and attributes that help browsers and screen readers to properly identify and define various components.

### What is ARIA?
>"WAI-ARIA, the Accessible Rich Internet Applications Suite, defines a way to make Web content and Web applications more accessible to people with disabilities. It especially helps with dynamic content and advanced user interface controls developed with Ajax, HTML, JavaScript, and related technologies."
— [https://www.w3.org/WAI/intro/aria.php](https://www.w3.org/WAI/intro/aria.php)

At it's core ARIA aims to help folks with disabilities, particularly people that rely on a screen reader or cannot use a mouse. Tab targeting and properly defined components on the page help accomplish this.

### How do you use it?

The spec linked above goes into great detail about the vast spectrum of ARIA roles and attributes. These attributes are added to various DOM nodes just as any other attribute is added. A relatively common example is that of the icon. When you're utilizing some sort of technique that you wouldn't want a screen reader to attempt to decipher, you would tell that screen reader to essentially skip the node.

```html
<i className="super-fancy-icon" aria-hidden="true"></i>
```

All the various ARIA attributes are implemented this way. Some of these attributes require an ID to reference back to, others don't come across with the `aria-` prefix. Lets get into some examples to see that in action.

### `role`
[https://www.w3.org/TR/wai-aria-1.1/#usage_intro](https://www.w3.org/TR/wai-aria-1.1/#usage_intro)

The ARIA `role` attribute is set on an element in the DOM that normal HTML5 implied semantics are not applied to (the `<nav>` element for example has a 'nav' role implied with it). For more complex pieces of functionality, a `role` must be applied in order for assistive technologies to be able to correctly interpret, and so as to not confuse that element with similar elements. Here's an example:

```html
<ul role="menubar">
  <li role="menuitem">About</li>
  <li role="menuitem">Work</li>
  <li role="menuitem">Contact</li>
</ul>
```

There are various roles that an element cat have, which are [listed here](https://www.w3.org/TR/wai-aria/roles#widget_roles). The ones above are explained by the following:

#### `menubar`
[https://www.w3.org/TR/wai-aria/roles#menubar](https://www.w3.org/TR/wai-aria/roles#menubar)

>A presentation of menu that usually remains visible and is usually presented horizontally.

#### `menuitem`
[https://www.w3.org/TR/wai-aria/roles#menuitem](https://www.w3.org/TR/wai-aria/roles#menuitem)

>An option in a set of choices contained by a menu or menubar.

There are quite a few other ARIA attributes that can help to define a navigation or a menu on attributes that assistive technologies do not traditionally identify as such.

### `aria-hidden`
[https://www .w3.org/TR/wai-aria-1.1/#aria-hidden](https://www.w3.org/TR/wai-aria-1.1/#aria-hidden)

This one is relatively common. I'm sure you have seen a technique or a methodology that utilizes this ARIA attribute. Especially in cases that require the hiding of visibly rendered content. This commonly pops up when you're employing some sort of icon system (SVGs can be made [very accessible](https://css-tricks.com/accessible-svgs/)), or image replacement and things of that nature.

```html
<span className="screen-reader-text icon-codepen" aria-hidden="true" >CodePen</span>
```

The spec recommends caution when utilizing this attribute because you're choosing to hide the visibly rendered content from assistive technologies. So be absolutely sure that the content that is output is accessible by those technologies elsewhere on the site.

### `aria-selected`
[https://www.w3.org/TR/wai-aria-1.1/#aria-selected](https://www.w3.org/TR/wai-aria-1.1/#aria-selected)

With `aria-selected`, you're telling assistive technologies that a component (or multiple components) on the page are selected. A relatively common use case here is with something like tabs or accordions.

```html
  <div className="accordion">
    <a href="#" className="accordion-header" aria-selected="true">Selected Accordion Header</a>
    <p className="accordion-content">Super fancy tab content!</p>
  </div>
  <div className="accordion">
    <a href="#" className="accordion-header" aria-selected="false">Not Selected Accordion Header</a>
    <p className="accordion-content">Super fancy tab content!</p>
  </div>
  <div className="accordion">
    <a href="#" className="accordion-header" aria-selected="false">Not Selected Accordion Header</a>
    <p className="accordion-content">Super fancy tab content!</p>
  </div>
```

In the snippet above, the first accordion item is selected, and likely expanded (check out the next section for an explanation of aria-expanded). As the user navigates through the accordion, the `aria-selected` attribute should be toggled.

### `aria-expanded`
[https://www.w3.org/TR/wai-aria-1.1/#aria-expanded](https://www.w3.org/TR/wai-aria-1.1/#aria-expanded)

Much like selected, this one is pretty self explainitory. `aria-expanded` indicates to assistive technologies wether or not an item is expanded or collapsed. We'll expand on our above example.

```html
  <div className="accordion">
    <a href="#" className="accordion-header" aria-selected="true" aria-expanded="true">Selected Accordion Header</a>
    <p className="accordion-content">Super fancy tab content!</p>
  </div>
  <div className="accordion">
    <a href="#" className="accordion-header" aria-selected="false" aria-expanded="false">Not Selected Accordion Header</a>
    <p className="accordion-content">Super fancy tab content!</p>
  </div>
  <div className="accordion">
    <a href="#" className="accordion-header" aria-selected="false" aria-expanded="false">Not Selected Accordion Header</a>
    <p className="accordion-content">Super fancy tab content!</p>
  </div>
```

Similarly, the `aria-expanded` attribute should be toggled as the assistive technology navigates through the accordion.

### `aria-labelledby`
[https://www.w3.org/TR/wai-aria-1.1/#aria-labelledby](https://www.w3.org/TR/wai-aria-1.1/#aria-labelledby)

`aria-labelledby` and the next item, `aria-describedby` are very similar. Both ARIA attributes tell a screen reader how to describe an element on the page. The value passed into this attribute is a space separated list of IDs that link to static text on the page that will be referenced to help describe the element.

```html
<main className="main-content" aria-labelledby="main-content-title">
  <h1 id="main-content-title">How to get started with accessibility.</h1>
  <p>WAI-ARIA is a technical specification that provides a framework to improve the accessibility and interoperability of web content and applications. This docu...</p>
</main>
```

In the above example, the `aria-labelledby` attribute value points to the `#main-content-title` which would be a solid short snippet of static text that describes the content in the related element.

*A note of caution*, don't use `aria-labelledby` in the event that you're trying to describe things like an icon, or an individual element. The [aria-label](https://www.w3.org/TR/wai-aria-1.1/#aria-label) attribute is used to define a string that labels the current element, whereas the `aria-labelledby` attribute references an ID.

### `aria-describedby`
[https://www.w3.org/TR/wai-aria-1.1/#aria-describedby](https://www.w3.org/TR/wai-aria-1.1/#aria-describedby)

Much like the `aria-labelledby` attribute, `aria-describedby` gives the screen reader even further detail about the content associated with a certain element. It works exactly like the former by parsing a space separated list of IDs that describe the element.

```html
<main className="main-content" aria-labelledby="main-content-title" aria-describedby="main-content-excerpt">
  <h1 id="main-content-title">How to get started with accessibility.</h1>
  <p id="main-content-excerpt">In this article we'll explore the basics regarding accessibility, and some of the fancy attributes you can start using today.</p>
  <p>WAI-ARIA is a technical specification that provides a framework to improve the accessibility and interoperability of web content and applications. This docu...</p>
</main>
```

As you can see, quite similar, but just identified as a longer description.

### ARIA Done yet?

Yep! That's a pretty solid start when it comes to the basic ARIA attributes I've run across recently. Next time you're building out a component on your site, give a second to think about how a screen reader would interpret that element, and perhaps these ARIA attributes will help you go forth and make a more accessible web!

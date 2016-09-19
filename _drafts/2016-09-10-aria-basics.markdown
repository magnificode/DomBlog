---
layout: post
title:  ARIA 
date:   2016-09-10 16:44:00
categories: update
---

## ARIA Curious About Accessibility?

Great! If you're a Front-End Developer then you absolutely should be. Making the web accessible for all who use it is a massively important part of our job. Recently I was able to work on a component library that had an emphasis on accessibility, and I got to learn a pretty decent amount about ARIA roles and attributes that help browsers and screen readers to properly identify and define various components.

### What is ARIA?
>"WAI-ARIA, the Accessible Rich Internet Applications Suite, defines a way to make Web content and Web applications more accessible to people with disabilities. It especially helps with dynamic content and advanced user interface controls developed with Ajax, HTML, JavaScript, and related technologies."
— [https://www.w3.org/WAI/intro/aria.php](https://www.w3.org/WAI/intro/aria.php)

At it's core ARIA aims to help folks with disabilities, particularly people that rely on a screen reader or cannot use a mouse. Tab targeting and properly defined components on the page help accomplish this.

### How do you use it?

The spec linked above goes into great detail about the vast spectrum of ARIA roles and attributes. I'll touch on the main ones that I encountered in the creation of this component library.

- Apply various ARIA attributes to HTML elements.
- Some of these attributes reference each other, for example `aria-controls` and `aria-labelledby`. Those same elements also may require an ID to reference each other.
- Not all ARIA attributes are prefixed with aria (see `role` - https://www.w3.org/TR/wai-aria-1.1/#usage_intro)

Some Examples and what they do.

- `aria-hidden` - https://www .w3.org/TR/wai-aria-1.1/#aria-hidden
- `aria-selected` - https://www.w3.org/TR/wai-aria-1.1/#aria-selected
- `aria-expanded` - https://www.w3.org/TR/wai-aria-1.1/#aria-expanded
- `aria-labelledby` - https://www.w3.org/TR/wai-aria-1.1/#aria-labelledby
- `aria-controls` - https://www.w3.org/TR/wai-aria-1.1/#aria-controls
- `aria-describedby` - https://www.w3.org/TR/wai-aria-1.1/#aria-describedby
- `role` - https://www.w3.org/TR/wai-aria-1.1/#usage_intro
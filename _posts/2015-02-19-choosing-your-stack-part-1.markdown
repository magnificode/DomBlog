---
layout: post
title:  "Choosing Your Stack: Part 1"
date:   2015-02-19 15:51:00
categories: update
---
Ah yes. The question that plagues every developer looking to break into the Web App development field. A question that I have had to ask myself recently as well. Everyone knows there's a million frameworks out there that will lead you down a particular path. Some are all encompassing stacks, like [MEAN](http://mean.io/#!/), and of course you can mix and match your own. But how the heck are you supposed to choose between [Ember](http://emberjs.com/), [Backbone](http://backbonejs.org/), [Angular](https://angularjs.org/), or [Laravel](http://laravel.com/) or the countless thousand other frameworks that exist.

Through the next few posts, I'm going to walk you through the process that lead to the team I work with to choose our stack.

##Choosing Your Projects

The first and clearly most important step to this process is choosing which types of projects you want to work on. Are they single page apps? Or as the [Wikipedia](http://en.wikipedia.org/wiki/Single-page_application) page puts it...

>...a web application or web site that fits on a single web page with the goal of providing a more fluid user experience akin to a desktop application.

Or are you looking to build apps that adhere to the MVC (Model - View - Controller) principle, again, defined by [Wikipedia](http://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) as...

>...a software architectural pattern for implementing user interfaces. It divides a given software application into three interconnected parts, so as to separate internal representations of information from the ways that information is presented to or accepted from the user

The team I am working with landed on the single page app approach. After further research we established that this title of "single page" does not directly translate to a literal one page application, but actually describes an app that uses AJAX and api calls to render page content fluidly without a page load. Thus giving the illusion of a "single page" application.

So far so good, we've established what type of apps we want to build. Currently we are in the phase of choosing actual tools to help us build the thing we want. I don't have too much more info at the moment, but let me show you the tools we are looking into.

- [Ember](http://emberjs.com/)
- [Angular](https://angularjs.org/)
- [Meteor.js](https://www.meteor.com/)
- [React.js](http://facebook.github.io/react/)
- [Node](http://nodejs.org/)
- [io.js](https://iojs.org/en/index.html)
- [Symfony](http://symfony.com/)
- [Backbone](http://backbonejs.org/)

Obviously some of these are front end, others are backend. We are looking at all of these options and how they pair together. Each has their pros and cons but at the moment we need to figure out what set of tools will not only be most effective for the project, but we need to also figure out which tools play to the skills we currently have. Zenman is primarily a wordpress shop. That being said we have a pretty solid understanding of PHP, which makes us lean towards utilizing symfony as a the backend framework. We are still in the process but I think we have a good start. Updates to come as they develop.

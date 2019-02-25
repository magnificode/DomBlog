---
layout: post
title: React for People Who Think Things Like React are Weird and Hard
date:   2019-02-24 16:44:00
---

_Title shamelessly derived from [Chris Coyier's fantastic post about Grunt.](https://24ways.org/2013/grunt-is-not-weird-and-hard/)_

In the world of Engineering we tend to get caught up in the technical aspects of things. I wanted to write a intro post concerning react to give a little insight to the folks we work with, Project Manages, Account Managers, Marketing folks etc. who may not be as privvy to the technical aspects of React, but who are still curious to understand what it is, what problems it solves, or doesn't solve.

## A Little History First

![Falling asleep](https://media.giphy.com/media/HlqvH9JrahLZ6/giphy.gif)

Yes yes, I know, history is super boring, but I think it's important that we understand a little bit of where React came from. This will provide us with useful insight into what problems React was _designed_ to solve. Let's first use Reacts definition of itself to provide some context:

From the React documentation:

> React is a declarative, efficient, and flexible JavaScript library for
> building user interfaces. It lets you compose complex UIs from small and
> isolated pieces of code called “components”.

Before moving on, let me explain what declarative programming means using this very succinct quote from Tyler McGinnis' blog.

> Declarative programming is “the act of programming in languages that conform to
> the mental model of the developer rather than the operational model of the
> machine”.

This library was built by the team at Facebook. Specifically within Facebook, their application that handled targeting ads at users became so unwieldy that developers there built a system to make their code more maintainable. This, coupled with Facebook's acquisition of Instagram, pushed the developers to decouple this technology from Facebook, so that it could be open sourced.

React was initially proposed as a response to the emerging MVC (model view controller) methodology that many web applications were heading towards. Angular was super popular, Backbone.js which some of you may remember had it's tentacles reaching into WordPress at various points. React decided to take those methodologies, and focus on being a declarative way for engineers to build User Interfaces.

## Cool, so what is it?

Now that we know what the developers who build React intended for it, we can explore what it is in practice.

What sets React apart from things like Angular, or Backbone, or any of the other million frameworks is what sets any framework from any other. Adoption. React is incredibly actively maintained, with features coming out frequently that continue to help folks make declarative, dynamic, user interfaces.

Without getting too far into the weeds, React by itself does not inherently provide any performance, or security benefits to a given website. But in conjunction with many other engineering practices, React _can_ help to create a far more maintainable application when complex interactions and data storage are required by the user interface.

Early on in our discovery process, we always sit down with the client and try to understand their business objectives, key performance indicators, and other metrics that we can use to measure success. Let's look at two different scenarios, one where React may not be the best fit, and another where it will.

### Scenario 1: The "Oohhh Shiny" Scenario

![Man distracted by something shiny](https://media.giphy.com/media/81MHl1DY9kxMI/giphy.gif)

You're encountered by Company X. Company X has a large amount of content. Company X wants to utilize our amazing UX and Design teams to find creative ways to display and share that content. They have complex post layouts, some different post types, videos, editorials, maybe a gallery. They approach you and say "Hey! We have all this content, we want a beautiful User Experience, an easy way to edit, publish and share our content. Oh, and also we've heard of React, we like how snappy and fast sites that use React are, let's make sure you build this in React for us!"

Here we find ourselves in a situation where Company X knows just enough about the development ecosystem to recommend React. Which is awesome, and super cool from a community standpoint that a JavaScript framework has such wide name recognition that folks outside of our sphere are even interested in it. It's worth noting that a client recommending a framework or technology should never be scoffed at. It's just our job to help them understand why they're right, or why there's a better solution.

In our case with Company X, React is not the best solution for a few reasons.

- React by itself does not make a website snappy. There are dozens of other far more nuanced pieces of technology that are being used under the hood to get applications like Facebook, or Instagram, or Pinterest, or Grubhub to be so seemingly snappy.
- None of the requirements presented by this client lends itself to needing a framework to build a declarative and dynamic user interface. All of what was described by Client X can be done within WordPress itself, likely with the help of some fancy technology like AJAX, or the Web History API. Site speed, or page transitions, do not inherently mean a website should lean on React.

### Scenario 2: The "I don't have a clever name for this" Scenario

Company Y approaches you. They're a business with similar needs of Company X. Large amounts of content, multiple post layouts and types. The thing that separates Company Y here is that they also allow users to sign up for their website, which gives those users the ability to favorite, react to, organize and even post their own content.

Company Y requires a website where users fundamentally interact with various aspects of their product, which changes the shape of the data that exists within that website. Post #1 has 100 likes, User A has saved Post #1 to their "Awesome Posts" folder that is unique to that user. This data is highly dynamic, and is shaped by the users of the site.

We're now into territory where React, which is a declarative JavaScript library, that can take this dynamic, ever-changing data, and display it on the front end via well designed interface components. Company Y has a _possible_ use case for React. It's important to note here, that we can **absolutely** build these features in a WordPress only context. The question becomes; Will React create a more maintainable, extensible and reactive application than WordPress alone will?

- React will create an easily manageable way for developers to pass data between various parts of the site without making multiple calls to the database to retrieve that data.
- React will make it easy for engineers to build components that are shared between multiple views on the front end. For example, card for each individual post that shows the title, author, number of likes, and reactions to that post that shows up on the home page, in the User's specific "Awesome Posts" folder, and in search results.
- React will help developers to use **the same templates for various views while only changing the data when necessary**.

## What React **doesn't** do.

React by itself is just a JavaScript library that makes it easier for developers to build declarative, dynamic user interfaces. It does NOT do the following:

- Inherently increase site performance
- React does not come with a way to easily transition between pages. Consider how WordPress handles navigating between pages. When building a React app, or headless WordPress with React on the front end, the developers _must_ build out the functionality to navigate between pages, posts, custom post types etc. **separately**.
- React does not come with a way, by default to consume data. Connections must be made to feed the React application data from a source, whether that's the WP API, or another REST API endpoint. Connections must be made, and the data must be shaped and passed to various parts of the application.
- React is not inherently more secure than alternative X. Regardless of the library or framework we choose to use, security can always be improved.

All the points above contribute to why, in most cases, estimates for a React application tend to be higher than a WordPress build. There are many aspects of WP that come baked into WP itself. Whereas with a React application, these things we take for granted must be built from (near) scratch.

## Why use React at all?

From an engineering standpoint, React allows us to much more easily envision a component within the larger whole of the project, abstract out the functionality and the styles, and get that component build in a clean logical way. React, in all reality is more of a gateway into a bunch of other technologies that can provide performance benefits for applications that request, consume and create _massive_ amounts of data.

React is a tool, that helps us developers develop applications with complex logic, and nuanced interactions from the user easier.

## TLDR; How do I know React is right for me?

I think it's important that before we sell a project we _consider_ the technologies that _might_ help to solve the issue for any given client. Instead of being prescriptive before we're able to do a full discovery, we need to understand the business objectives and full functional requirements for the project. Then, and only then can we prescribe the technology, or set of technologies that we can utilize to make Engineering more efficient, and the site the best it can be. In any case, here are a couple of very broad guidelines that explain where it would be safe to *consider* React..

- Does the clients business model dictate that many users will be directly interacting with their data (reactions, likes, account specific sections where users curate their own content)? - Consider React.
- Is the User Interface sufficiently complex, reliant and directly affected by data (number of likes or reactions, graphs, charts, content created by users)? - Consider React.

Resources used for this post:

- https://blog.risingstack.com/the-history-of-react-js-on-a-timeline/
- https://reactjs.org/docs/getting-started
- https://overreacted.io/react-as-a-ui-runtime/
- https://tylermcginnis.com/imperative-vs-declarative-programming/
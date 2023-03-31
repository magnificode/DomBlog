---
layout: post
title: Server Components in Next 13
description: >
  Exploration of the new server component behavior in next 13 with basic example.
date: 2023-03-31 16:44:00
categories: update
---

I just got back from the labs at [House of Giants](https://houseofgiants.com) where I was able to take a look at some of the cool new features in Next 13. One of these promising new features is server components. This new capability promises to change the way we build NextJS applications for the better. In this post, we'll take a closer look at server components, explore their benefits, and discuss best practices for using them in real-world scenarios.

## What are server components?

Server components allow us to isolate the specific parts of our application that depend on server-side rendered data. By breaking down our pages into smaller, more manageable components, we can load them independently for improved modularity and easier maintenance. Additionally, server components help improve performance by reducing the amount of unnecessary data that needs to be loaded.

## An alternative to existing solutions

Before we dive into how to create server components, let's take a look at how they compare to other server-side rendering options in NextJS:

- **getStaticProps/getServerSideProps**: These functions allow you to fetch data at build time or request time, respectively. However, they only work for the entire page, not individual components.
- **API routes**: API routes allow you to fetch data from the server, but they require you to make an extra network request from the client.
- **Hydration**: Hydration is a technique that allows the client to take over rendering from the server after the initial page load. While this approach can work well for smaller applications, it can become unwieldy as your application grows.

Server components offer a more flexible and powerful approach to server-side rendering, allowing you to load only the components you need when you need them.

## What are the benefits

Server components are a significant improvement over the old way of rendering server side data in NextJS. They provide a more modular approach to managing server side rendering, allowing for better isolation of components that rely on server side data. This not only makes it easier to manage your application, but also reduces bundle sizes by only loading the necessary server components. Additionally, server components can be loaded independently, which leads to faster load times and improved performance overall.

## Show me the code 👨‍💻

Let's dive into creating a basic server component:

```jsx
// components/SWPlanets.js

async function getPlanets() {
  const res = await fetch("https://swapi.dev/api/planets");
  const data = await res.json();

  return { data };
}

export default async function ServerPlanets() {
  const { data } = await getPlanets();

  return (
    <div>
      <ul>
        {data.results.map((planet) => (
          <li key={planet.name}>{planet.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

This component is unique because it uses server-side rendering to fetch the data. It is not tied to any specific page, but rather can be used as a standalone component to retrieve and display the data on the server. By doing so, we can avoid unnecessary network requests from the client and provide a more optimized bundle. Additionally, because server components are isolated, they can be composed together to create more complex features within our application, improving modularity and maintainability. Pretty slick!

## **Real-world use cases and best practices for using server components**

Besides obtaining the diameter, population and orbital period of Dagobah, here are a few other real world use cases for server components.

- **Lazy loading**: Use server components to load parts of the page only when they are needed, reducing the initial page load time.
- **A/B testing**: Use server components to test different variations of a component or page and track user engagement.
- **Server-side analytics**: Use server components to send data to your analytics platform directly from the server, bypassing the need to track events on the client.

When using server components, it's important to follow best practices to ensure optimal performance and maintainability. Keep these tips in mind as you build:

- **Keep components small**: Divide your page into small, reusable components that can be loaded independently.
- **Cache data**: Use caching strategies to avoid making unnecessary API calls and improve performance.
  - To this point, we could optimize our example further by leveraging `getServerSideProps` to cache our planet data. See if you can work out how to add that to our example above!
- **Test thoroughly**: Test your server components thoroughly to ensure they work as expected and don't introduce new bugs.

## Wrap it up

It’s pretty clear that the folks at Next are doing their level best to optimize the amount of JavaScript that is output in our applications in an attempt to reduce the massive weight of web applications these days. Server components and their counterpart client components are a pretty cool step in that direction. Very much looking forward to testing and implementing these features in future builds at [House of Giants](https://houseofgiants.com)!

### Post resources:

- [https://beta.nextjs.org/docs/rendering/server-and-client-components](https://beta.nextjs.org/docs/rendering/server-and-client-components)
- [https://swapi.dev/](https://swapi.dev/)

---
layout: post
title:  Toggle State With React Hooks
description: >
  Create a basic toggle function using React Hooks
date:   2020-12-03 16:44:00
categories: update
---

Creating a toggle function is probably one thing that you'll always need to know how to do effectively and efficiently in any app that you build. Let's dive down the rabbit hole a bit and see what we can explore when it comes to this seemingly simple task.

## What will we need?

We're going to assume that you've run through the process of setting up your React project. If not, take a second and run through [Create React App](https://reactjs.org/docs/create-a-new-react-app.html#create-react-app).

From there, we're going to create a new component to test our basic toggle!

### React Hooks

![](https://media.giphy.com/media/UhFZggMF6xGWk/giphy.gif)

Hooks provide us a super easy way to set the local state of a component within our application. [Hooks solve a variety of different problems](https://reactjs.org/docs/hooks-intro.html). Specifically in our case it allows us to pair state with a function component. Traditionally you'd need to leverage a Class component in order to make your component stateful. With hooks we can define our state like so using `useState`.

```javascript
import React, { useState } from 'react'

const MyComponent = () => {
  const [toggle, setToggle] = useState(false)

  return(
    <>
      The Component
    </>
  )
}
```

Let's break down line four a bit.

`const [toggle, setToggle] = useState(false)`

`toggle` is our state variable. This is what we'll reference when we want to get the current state of `toggle`.

`setToggle` is the function that we'll use to actually update the state of our component.

`useState(false)` this is how we 'hook' into the React feature itself. When we pass something in to this function as an argument (in our case `false` is our argument), React will use that passed argument as the initial state.

All together we have a way to get the current state, set the state, and an initial state for our toggle.

### A Trigger

We'll now need to define a DOM element that can trigger a state change using our hooks.

```javascript
import React, { useState } from 'react'

const MyComponent = () => {
  const [toggle, setToggle] = useState(false)

  return(
    <>
      <button onClick={() => setToggle(true)}>Toggle State</button>
    </>
  )
}
```

I didn't really think about it too much before writing this post, but I was curious as to why `setToggle` needed to be called within an inline function. Turns out that the inline function is necessary to set the state after the component has rendered. This ensures that the new state we're passing to `setToggle` as an argument is actually applied to the component itself.

Now, when we test this, we should see our state change from `false` to `true` once the button is clicked. Great! However, this is not a toggle just yet. Let's introduce the last piece of the puzzle...

### Setting The State Using The Logical Not (!) or Double Not (!!) Operators

There are a couple of options that we can leverage to toggle the state, let's understand what these options actually do before we settle on one.

**The Logical Not (!)**

A single `!` operator in JavaScript gives us the ability to set the opposite of the value immediately adjacent to the operator. We can use this operator to return `true` or `false` depending on whether or not a value is defined. [From MDN:](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_NOT#:~:text=The%20logical%20NOT%20(%20!%20),true%20%3B%20otherwise%2C%20returns%20true%20.)

```javascript
n1 = !true               // !t returns false (the opposite of true)
n2 = !false              // !f returns true (the opposite of false)
n3 = !''                 // !f returns true (in JavaScript, an empty string is falsey, thus the opposite of a falsey value here is truthy.)
n4 = !'Cat'              // !t returns false (non empty string is truthy, thus opposite is falsy)
```

Check out more on [truthy](https://developer.mozilla.org/en-US/docs/Glossary/truthy) and [falsy](https://developer.mozilla.org/en-US/docs/Glossary/falsy) values.

**The Double Not (!!)**

The double not operator serves a different purpose. The immediatly adjacent value to a double not operator will be converted to the corresponding boolean based on the truthyness or falsyness of that value. That said, this operator will not return the opposite of anything, in fact it will return the boolean primitive of the adjacent value. [Again, from MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_NOT#:~:text=The%20logical%20NOT%20(%20!%20),true%20%3B%20otherwise%2C%20returns%20true%20.)

```javascript
n1 = !!true                   // !!truthy returns true
n2 = !!{}                     // !!truthy returns true: any object is truthy...
n3 = !!(new Boolean(false))   // ...even Boolean objects with a false .valueOf()!
n4 = !!false                  // !!falsy returns false
n5 = !!""                     // !!falsy returns false
n6 = !!Boolean(false)         // !!falsy returns false
```

This section was mostly for my own edification. I wasn't 100% clear on the intent of the double not operator, but now we know! Let's use the logical not operator in our example to set the opposite value of the current state in our toggle button.


```javascript
import React, { useState } from 'react'

const MyComponent = () => {
  const [toggle, setToggle] = useState(false)

  return(
    <>
      <button onClick={() => setToggle(!toggle)}>Toggle State</button>
    </>
  )
}
```

Nice! Now, whatever the state of our toggle state variable is, clicking the button will set it to the opposite boolean value. A true toggle!

With our state being properly toggled we can do some fun things in React. One of the most common things I use a toggle for is hiding or showign markup on the page. For example, a dropdown menu. We don't necessarily need the DOM markup for a hidden dropdown menu on the page on render. But we definitely want that markup when we click the button. This can be achieved like so:


```javascript
import React, { useState } from 'react'

const MyComponent = () => {
  const [toggle, setToggle] = useState(false)

  return(
    <>
      <button onClick={() => setToggle(!toggle)}>Toggle Dropdown Markup</button>
      {toggle && (
        <ul>
          <li>Show me</li>
          <li>Only when</li>
          <li>Toggle === true</li>
        </ul>
      )}
    </>
  )
}
```

In our JSX, we escape into JS using curly braces `{}`. This allows us to write some basic JavaScript within our JSX. Essentially we are saying, if `toggle` is `true`, then render (by way of the parenthesis) our unorded list!

And there you have it. A basic boolean state toggle using React Hooks.

![](https://media.giphy.com/media/SvOrq4OA7TQTC/giphy.gif)
---
layout: post
title: Handling Controlled and Uncontrolled Inputs in React
description: >
  When to choose to use controlled vs uncontrolled inputs in React.
date: 2023-04-05 11:00:00
categories: update
---

# How to Handle Controlled and Uncontrolled Inputs in React

It may just be me, but every time I build a form in React I inevitably run into this lovely warning:

> Warning: A component is changing an uncontrolled input of type text to be controlled. Input elements should not switch from uncontrolled to controlled (or vice versa). Decide between using a controlled or uncontrolled input element for the lifetime of the component.

I've been working with React for years now and no matter how many times I carefully think about whether or not to use a controlled input, I'll run into this error.

Because of this, I decided to write this little post exploring what a controlled vs uncontrolled input is in React, and when to use each.

## Controlled Inputs

Controlled inputs enable us to keep track of the current state of a form element in real-time. This means that we can have full control over the input value, and allows us to handle changes to those values in a predictable and reliable way.

By using a controlled input, we can validate user input, perform real-time error checking, and test data passed to our application. This is particularly important when it comes to forms that collect sensitive or critical information.

Here's an example of a controlled input:

```jsx
import { useState } from "react";

function ControlledInput() {
  const [value, setValue] = useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return <input type="text" value={value} onChange={handleChange} />;
}
```

In this example, we're using useState to store and update the value a user inputs into our form field. We're also using the onChange event to update that state whenever the input changes. Note that whatever function is passed to `onChange` will fire on every keystroke, so adding much more logic to that function could become computationally complex very quickly.

## Uncontrolled Inputs

In contrast to controlled inputs, uncontrolled inputs values are not managed by React, but instead are controlled by the browser. Because of this, if you need to retrieve the current value of an uncontrolled input, you will have to use a ref. Unlike with controlled inputs, changes to the input are not reflected in React's state. This can make uncontrolled inputs useful in certain situations, particularly when you need to handle a large amount of input without causing excessive re-rendering.

Here's an example of an uncontrolled input:

```jsx
import { useRef } from "react";

function UncontrolledInput() {
  const inputRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(inputRef.current.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" ref={inputRef} />
      <button type="submit">Submit</button>
    </form>
  );
}
```

The code snippet above leverages the `useRef` hook to create a reference to the input element. This approach allows for interaction with the DOM after the element has rendered on the page. In the example, the `handleSubmit` function is called when the form is submitted, allowing us to access the value of the input element through the `inputRef.current.value` property. It's important to note that this method doesn't provide immediate feedback to the user since the value is only checked upon submission.

## When to Use Controlled vs. Uncontrolled Inputs

In general, use controlled inputs when you need to validate or manipulate the input value before displaying it to the user. Controlled inputs also make it easier to implement features like immediate validation and auto-complete.

Uncontrolled inputs are useful when you don't need to do any immediate validation or manipulation on the input value, or when you have a large form with many inputs where it may not be the best idea to create a state variable for each one.

Hopfully this helps to illuminate the differences between controlled and uncontrolled inputs in React. May we never see another console warning again 🤘.

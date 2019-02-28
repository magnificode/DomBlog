# React Context API

https://reactjs.org/docs/context.html

Since React 16.3.0, we've had access to the React Context API. Traditionally, as Kent C. Dodds [has explained](https://blog.kentcdodds.com/prop-drilling-bb62e02cb691), we've experienced a bit of confusion, and headache when it comes to passing props down to multiple decedents of an application. A term he coined "prop drilling", describes that issue well.

The React Context API aims to solves the prop drilling issue by way of a fairly straight forward `Provider` to `Consumer` relationship. This makes passing data between components that are not necessarily direct descendants of each other much easier.

## Context

In order to set up the `Provider` to `Consumer` relationship we must first set up a new context. This context acts as a sort of boundary for passing the specific data within this context, to it's child components.

```jsx
const MyContext = React.createContext();
```

## The Provider Component

Once we have a context defined, we can create our provider, which is the Component that we'll actually use to wrap our application (or parts of our application), and pass the data. The provider component is just a fairly simple Higher Order Component that contains the state you wish to pass down to various levels of your application. This, simply, is where your data lives.

```jsx
class MyProvider extends Component {
  state = {
    name: 'Dominic',
    age: 28,
  };
  render() {
    return (
      <MyContext.Provider value={{
        state: this.state
      }}>
        {this.props.children}
      </MyContext.Provider>
    )
  }
}
```

The value attribute in the `MyContext.Provider` component is what passes the data down to the child components. So in this case, we pass down the state as an object. This gives us access to the Provider state.

## The  Consumer

Within any child component of our Provider, we'll need to write a consumer to actually get at that data. Instead of  traditional `props` the data is passed down via `render props`

```jsx
class Company extends Component {
  render() {
    return(
      <div className="company">
        <MyContext.Consumer>
          {(context) => (
            //Fragment added here since you can only return one child
            <>
              <p>Welcome to {context.state.name}</p>
              <p>We are {context.state.age} years old!</p>
            </>
          )}
        </MyContext.Consumer>
      </div>
    )
  }
}
```

## Updating State

In addition to passing the state down from the Provider via the `value` attribute, you can also pass down functions. Much like using Redux, these methods that we pass would be our 'actions'.

```jsx
class MyProvider extends Component {
  state = {
    name: 'Dominic',
    age: 28,
  };
  render() {
    return (
      <MyContext.Provider value={{
        state: this.state,
        addYear: () => this.setState({
          age: this.state.age + 1
        })
      }}>
        {this.props.children}
      </MyContext.Provider>
    )
  }
}
```

And within the Consumer, we now have access to that method.

```jsx
class Company extends Component {
  render() {
    return(
      <div className="company">
        <MyContext.Consumer>
          {(context) => (
            <>
              <p>Welcome to {context.state.name}</p>
              <p>We are {context.state.age} years old!</p>
              <button onClick={context.addYear}>Add Year</button>
            </>
          )}
        </MyContext.Consumer>
      </div>
    )
  }
}
```

Hooray! With that here's what our full `App.js` file should look like:

```jsx
import React, { Component } from 'react';

// Create new context
const MyContext = React.createContext();

// Create the Provider that will pass down state and methods to the rest of the application.
class MyProvider extends Component {
  state = {
    name: 'Dominic',
    age: 28,
  };
  render() {
    return (
      <MyContext.Provider value={{
        state: this.state,
        addYear: () => this.setState({
          age: this.state.age + 1
        })
      }}>
        {this.props.children}
      </MyContext.Provider>
    )
  }
}

// Create the consumer that will consume the data provided by the Provider.
class Company extends Component {
  render() {
    return(
      <div className="company">
        <MyContext.Consumer>
          {(context) => (
            //Fragment added here since you can only return one child
            <>
              <p>Welcome to {context.state.name}</p>
              <p>We are {context.state.age} years old!</p>
              <button onClick={context.addYear}>Add Year</button>
            </>
          )}
        </MyContext.Consumer>
      </div>
    )
  }
}

// We'll nest our Consumer inside another component just to show that we don't need to pass props to each component.
const Companies = () => (
  <div>
    <Company />
  </div>
)

class App extends Component {
  render() {
    return (
      // Ensure the provider wraps all the components you want to share data between.
      <MyProvider>
        <div className="App">
          <Companies />
        </div>
      </MyProvider>
    );
  }
}

export default App;
```

Great job! You’re up and running with the React Context API. This method is a nice first step to attempt to use before reaching for something far more heavy handed like Redux. No third party library, no confusing (it’s still confusing in my head) actions and reducers. Just nice, clean React API.
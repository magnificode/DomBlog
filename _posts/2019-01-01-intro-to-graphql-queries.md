---
layout: post
title: Intro to GraphQL Queries
---

Recently I've been trying to get a better grasp on GraphQL. The majority of my exposure to GraphQL has been in the form of React apps. These apps tend to be all set up and nicely packaged on the back end. This way, I could focus on consuming that data on the front end.

To get more exposure to how a GraphQL back end is set up, I've been running through the Wes Bos course [Fullstack Advanced
React & GraphQL](https://advancedreact.com/).

I want to focus on a more narrow topic within this course; the setup of a GraphQL back end, and how to interact with and change that data from the front end.

I won't be going over the setup of these technologies, as that's a separate post entirely. Instead I'm going to focus on how to write and use queries within a working app.

As a Frontend engineer, I've not had much exposure to the work that goes into setting up the GraphQL back end. Let's dive in and set up our data structure.

## Working With Schema
---

To start lets imagine we want to populate our database with a set of `people`. Each person has an `id`, a `name`, and an `age` to start with.

GraphQL is framework agnostic. What we explain below will also translate to any combination of technologies. We'll use what's called the "GraphQL schema language" to explain the examples below.

To inform GraphQL of how we want our data structured, we have to build the schema using **object types**. This initial schema is created like so:

```graphql
type Person {
  id: ID!
  name: String!
  age: Int
}
```

Here we're telling GraphQL the following: Our database will consist of many objects of type `Person`. Each `Person` in the database will have an `id` field that expects an `ID` (*note: the ID value here is a value that GraphQL knows is a unique identifier*). We're also informing GraphQL that this field is required via use of the `!`.

Moving down we explain that each person will have a `name` field that expects a required `String`.

Finally, the `age` field may have an `Int` (integer) value associated with it, but this field is not required.

There are extra identifiers and terms that could be expanded on here, but this gives us the basic sense of how to work with the GraphQL schema language. Much more in depth information about schema can be found in the [GraphQL docs](https://graphql.org/learn/schema/). But for now, let's move on.

## Querying Data
___

At a low level there are two basic methods for interacting with the GraphQL API. **Queries** and **Mutations**.

**Queries** are just that. A way, using the GraphQL API, to query the database. Queries by themselves are simple creatures, and will return a set of fields for you to interact with on the front end. For example, if we wanted to query the database for a specific person, we can do that by writing a simple query, and also pass an argument to the query.

Before we do that, we need to tell GraphQL what to expect from our query.
Within our schema, in addition to defining multiple `type`s of GraphQL services (so far `Person` is the only service we've defined), we can also define specific Queries, and build out how those queries should be handled. For example, if we are to query a single person, we need to tell GraphQL what to return us.

```graphql
type Query {
  person: Person
}
```

Here, we're telling GraphQL that when we run a query for a single person, it should return us a JSON object that consists of our Type, `Person`. Now, when we load up a GraphQL playground and query for a specific person, we should be returned the expected Type.

Another powerful feature in GraphQL is the ability for add **arguments** to our queries. This allows us to search the database for a specific person, so long as we know an identifying piece of information stored in the DB about the person. Take the following query:

```graphql
query {
  person(id: 1) {
    name
  }
}
```

We are asking GraphQL for a person, whose `id` is `1`. We're then telling GraphQL that we only want to return that person's `name` and nothing else. This is another part of the draw to GraphQL. No matter how much information exists in the DB, we can be quite explicit in the data that we are returned. This creates some super efficient queries that return us only what we need.

Our query above will return the following:

```json
{
  "data": {
    "person": {
      "name": "Alan Watts"
    }
  }
}
```

All of the data returned is wrapped in the `data` object. This is true for any GraphQL query. What's neat is we can use arguments to query any one of the fields for our the `Person` type that we built out!

### Querying all of a type

What we've done above is super useful if we know the specific information of the person that we're querying. As long as we're okay being returned one singular `Person` then we're in good shape, but what if we want to query the database for all `People`?

Similar to how we defined our singular `person` query, we will also need to define a `people` query. That will be executed like so:

```graphql
type Query {
  person: Person
  people: [Person]!
}
```

In addition to our `person` query, we've added a `people` query, that we expect to return an array of multiple `People` types! I've added an `!` to signify to GraphQL that if we are querying for multiple people, it _must_ return the array. It can be an empty array, but the array itself is required.

Sweet! Now we can query all the people in our database by simply writing:

```graphql
query {
  people {
    id
    name
  }
}
```

Which will return:

```json
"data": {
  "people": [
    {
      "id": 1
      "name": "Alan Watts"
    },
    {
      "id": 2
      "name": "Stanisław Szukalski"
    },
  ]
}
```

This has been a high level look at working with and building Queries in GraphQL, but it should be a good start to get you at least playing around with it. GraphQL is super powerful, and has been very interesting to work with. The major pain point in my eyes though, is getting up and running with GraphQL in the sense that the back end portion of your application needs a connection to the front end. Also, one of the things that GraphQL _is not_ intended to be used for, is altering data before it's passed to the database. No logic, or modification of data can be done with GraphQL alone.

In the Wes Bos course I mentioned at the beginning of this post, he sets up his application using React, Apollo, GraphQL, and GraphQL Yoga. Apollo is the connection between the front end of the application, and the back end, allows you to run queries on the front end of your application, and be returned data that you can work with. GraphQL Yoga, allows you to do logic on data before it's passed to GraphQL on the backend. All of these technologies work great together, but require a bit of setup.

For my own sanity (and possibly for yours if it's useful) I've set up a [pretty bare bones application framework](https://github.com/magnificode/react-apollo-prisma-yoga-boilerplate) that has these bits of technology, and a few more, set up and ready to rock. It's the result of the setup steps that Wes Bos goes through in his course, which I highly, highly recommend buying and diving into, because he does a phenomenal job of explaining these technologies and their specific benefits. And of course, it's always really beneficial to understand how to set up an application from scratch.

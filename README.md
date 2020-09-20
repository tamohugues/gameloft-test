<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
  <img src="https://blog.soat.fr/wp-content/uploads/2019/01/GraphQL-600x210.png" width="380" alt="GraphQL Logo" />
</p>

  <p align="center">A progressive <a href="http://nodejs.org" target="blank">Node.js</a> framework for building efficient and scalable server-side applications, heavily inspired by <a href="https://angular.io" target="blank">Angular</a>.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
</p>

## Description

[GameLoft](https://www.gameloft.com) Small chat app, with GraphQL, apollo-server-express and Node.js.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Part 1 GraphQL Schema

```bash
directive @specifiedBy(url: String!) on SCALAR
input CreateForumInput {
  name: String!
  userId: Int!
}

scalar Date

type Forum {
  id: ID!
  name: String!
  members: [User!]!
  messages: [Message!]
}

type Message {
  id: ID!
  text: String!
  date: Date!
  sender: User!
}

input MessageInput {
  id: Int
  date: Int
  text: String!
  senderId: Int!
  forumId: Int!
}

type Mutation {
  createForum(input: CreateForumInput!): Forum!
  joinForum(forumId: Int!, userId: Int!): Boolean!
  createMessage(input: MessageInput!): Message!
}

type Query {
  joinedForums(userId: Int!): [Forum!]!
  availableForums(userId: Int!): [Forum!]!
  Users: [User!]!
}

type Subscription {
  forumAdded: Forum!
  messageAdded: Message!
}

type User {
  id: ID!
  name: String!
  picture: String!
}

```

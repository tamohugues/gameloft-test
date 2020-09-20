## Part 2 GraphQL Schema

```bash
directive @specifiedBy(url: String!) on SCALAR
input CloseRequestInput {
  requestId: Int!
  isAccepted: Boolean!
}

input CreateForumInput {
  name: String!
  userId: Int!
  isPrivate: Boolean
}

input CreateRequestInput {
  senderId: Int!
  forumId: Int!
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
  createRequest(input: CreateRequestInput!): Request!
  closeRequest(input: CloseRequestInput!): Boolean!
}

type Query {
  joinedForums(userId: Int!): [Forum!]!
  availableForums(userId: Int!): [Forum!]!
  Users: [User!]!
  availableRequests(adminId: Int!): [Request!]!
}

type Request {
  id: ID!
  senderId: Int!
  forumId: Int!
}

type Subscription {
  forumAdded: Forum!
  messageAdded: Message!
  RequestAdded: Request!
}

type User {
  id: ID!
  name: String!
  picture: String!
}

```

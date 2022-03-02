const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Query {
    me: User
  }
  type User {
    _id: ID
    username: String
    email: String
    password: String
    savedEntries: [Entries]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Entries {
    EntriesId: ID
    title: String!
    content: String!
    timeStamp: Int
    userId: User
  }

  input EntriesInput {
    title: String
    content: String
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveEntries(input: EntriesInput!): User
    removeEntries(EntriesId: ID!): User
  }
`;

module.exports = typeDefs;
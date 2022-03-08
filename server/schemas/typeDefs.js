const { gql } = require("apollo-server-express");

const typeDefs = gql`
type User {
  _id: ID
  username: String
  email: String
  password: String
  savedEntries: [Entries]
}
type Entries {
  EntriesId: ID!
  title: String!
  content: String!
  timeStamp: Int
  userId: User
}
type Auth {
  token: ID!
  user: User
}
input EntriesInput {
  EntriesId!: String!
  title: String!
  content: String!
  timeStamp: Int
  userId: String
}

type Query {
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveEntries(input: EntriesInput!): User
    removeEntries(EntriesId: ID!): User
  }
`;

module.exports = typeDefs;
import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    me: User
  }

  extend type Mutation {
    register(firstname: String!, lastname: String!, email: String!, password: String!): User
    login(email: String!, password: String!): User
  }

  type User {
    _id: ID!
    firstname: String!
    lastname: String!
    email: String!
    token: String!
    exp: Int!
  }
`;
import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    genres: [Genre]
  }

  extend type Mutation {
    addNewGenre(title: String!): Genre
    updateGenre(id: ID!, title: String!): Genre
    deleteGenre(id: ID!): Genre
  }

  type Genre {
    _id: ID!
    title: String!
  }
`;
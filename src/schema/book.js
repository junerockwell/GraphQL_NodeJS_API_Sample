import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    books: [Book]
    book(id: ID!): Book
  }

  extend type Mutation {
    addNewBook(title: String!, genreId: ID!): Book
  }

  type Book {
    _id: ID!
    title: String!
    author: User
    genre: Genre
  }
`;
import Book from "../controllers/book";
import User from "../controllers/user";
import Genre from "../controllers/genre";
import { AuthenticationError } from "apollo-server";

export default {
    Query: {
        books: (parent, args, context) => {
            if (!context.isAuth) {
                return new AuthenticationError();
            }
            return Book.GetAllBooks();
        },
        book: (parent, { id }, context) => {
            if (!context.isAuth) {
                return new AuthenticationError();
            }
            
            return Book.GetOneBookById(id);
        }
    },

    Mutation: {
        addNewBook: async(parent, args, context, info) => {
            if (!context.isAuth) {
                return new AuthenticationError();
            }
           
            return Book.AddNewBook({...args, ...context.user});
        }
    },

    Book: {
        author: (parent, args, context) => {
            return User.GetUserById(parent.authorId);
        },
        genre: (parent, args, context) => {
            return Genre.GetById(parent.genreId);
        }
    }

};
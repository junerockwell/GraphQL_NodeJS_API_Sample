import Genre from "../controllers/genre";
import { AuthenticationError } from "apollo-server";

export default {
    Query: {
        genres: (parent, args, context) => {
            if (!context.isAuth) {
                return new AuthenticationError();
            }

            return Genre.GetAll();
        }
    },

    Mutation: {
        addNewGenre: (parent, { title }, context, info) => {
            if (!context.isAuth) {
                return new AuthenticationError();
            }
           
            return Genre.AddNew(title);
        },
        deleteGenre: (parent, { id }, context) => {
            if (!context.isAuth) {
                return new AuthenticationError();
            }
            
            return Genre.DeleteOneById(id);
        },
        updateGenre: (parent, args, context) => {
            if (!context.isAuth) {
                return new AuthenticationError();
            }
           
            return Genre.UpdateOneById(args);
        }
    }
};
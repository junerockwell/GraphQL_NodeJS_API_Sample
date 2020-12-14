import User from "../controllers/user";
import { AuthenticationError, UserInputError, ApolloError } from "apollo-server";

export default {
    Query: {
        me: (parent, args, context) => {
            if (!context.isAuth) {
                return new AuthenticationError();
            }
            return User.GetUserById(context._id);
        }
    },

    Mutation: {
        register: (parent, args, context, info) => {
            return User.CreateNewUser(args);
        },
        login: (parent, args, context, info) => {
            return User.LoginAUser(args);
        },
    }
};
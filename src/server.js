import "dotenv/config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import mongoose from "mongoose";
import schema from "./schema";
import resolvers from "./resolvers";
import AuthGuard from "./controllers/authGuard";

const app = express();
app.use(cors());

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: ({req, res}) => {
    const user = AuthGuard(req);

    return user;
  }
});

app.listen({ port: process.env.PORT }, () => {
    mongoose.connect(
        process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        }
    );
    console.log(`Listening to ${process.env.PORT}`);
});

const database = mongoose.connection;
database.on('error', (err) => {
  
});

database.once('open', () => {
    console.log('Connected to Atlas');
    server.applyMiddleware({ app, path: "/graphql" });
});



import Genre from "../models/genre";
import { AuthenticationError, UserInputError, ApolloError } from "apollo-server";

async function AddNew(title) {
    try {
        const genre = new Genre({
            title,
        });

        return await genre.save();
    }
    catch(error) {
        return new ApolloError("Internal Server Error", 500, error);
    }
}

async function GetAll() {
    try {
        return await Genre.find({});
    }
    catch(error) {
        return new ApolloError("Internal Server Error", 500, error);
    }
}

async function GetById(id) {
    try {
        return await Genre.findById(id);
    }
    catch(error) {
        return new ApolloError("Internal Server Error", 500, error);
    }
}

async function UpdateOneById(data) {
    try {
        return await Genre.findByIdAndUpdate(data.id, { title: data.title }, { new: true });
    }
    catch(error) {
        return new ApolloError("Internal Server Error", 500, error);
    }
}

async function DeleteOneById(id) {
    try {
        return await Genre.findByIdAndDelete(id);
    }
    catch(error) {
        return new ApolloError("Internal Server Error", 500, error);
    }
}

export default {
    AddNew,
    GetAll,
    GetById,
    UpdateOneById,
    DeleteOneById
}
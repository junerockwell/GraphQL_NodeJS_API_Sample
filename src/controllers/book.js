import Book from "../models/book";
import { AuthenticationError, UserInputError, ApolloError } from "apollo-server";

async function AddNewBook(data) {
    try {
        const book = new Book({
            title: data.title,
            authorId: data._id,
            genreId: data.genreId,
        });

        return await book.save();
    }
    catch(error) {
        return new ApolloError("Internal Server Error", 500, error);
    }
}

async function GetAllBooks() {
    try {
        return Book.find({});
    }
    catch(error) {
        return new ApolloError("Internal Server Error", 500, error);
    }
}

async function GetOneBookById(id) {
    try {
        return await Book.findById(id);
    }
    catch(error) {
        return new ApolloError("Internal Server Error", 500, error);
    }
}

export default {
    GetAllBooks,
    AddNewBook,
    GetOneBookById
}
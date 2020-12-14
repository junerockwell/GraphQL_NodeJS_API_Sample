import User from "../models/user";
import jwt from "jsonwebtoken";
import { AuthenticationError, UserInputError, ApolloError } from "apollo-server";

async function UserExists(email) {
	try {
		const user = await User.findOne({ email: email }).exec();
		return user ? true : false;
	} catch (error) {
		return false;
	}
}

async function CreateNewUser(data) {
    const { firstname, lastname, email, password } = data;
    const exists = await UserExists(email);
    if (exists) {
        return new ApolloError("Conflict", 409);
    } else {
        const user = new User({
            firstname,
            lastname,
            email,
            password
        });
    
        const hash = user.generateHash(password);
        user.password = hash;

        try {
            const newUser = await user.save();
            const token = jwt.sign(user.toJSON(), process.env.JWT_SECRET, { expiresIn: '10m' });
            const { iat, exp } = jwt.decode(token);
            return {
                ...newUser,
                exp,
                token
            }
        }
        catch (error) {
            return new ApolloError("Internal Server Error", 500, error);
        }
    }
}

async function LoginAUser(data) {
	try {
		const user = await User.findOne({ email: data.email }).exec();
        
		if (!user || !user.validPassword(data.password, user.password)) {
			return new AuthenticationError();
		}

		const token = jwt.sign(user.toJSON(), process.env.JWT_SECRET, { expiresIn: '10m' });
		const { iat, exp } = jwt.decode(token);
        
        const { _id, firstname, lastname, email } = user;
        return {
            _id,
            firstname,
            lastname,
            email,
            exp,
            token
        }

	} catch (error) {
		return new ApolloError("Internal Server Error", 500, error);
	}
}

async function GetUserById(id) {
    try {
        const user = await User.findById(id);
        return user;
    }
    catch(error) {
        return new ApolloError("Internal Server Error", 500, error);
    }
}

export default {
    CreateNewUser,
    LoginAUser,
    GetUserById
}
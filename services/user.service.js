import { responseMessage } from "../constants.js";
import User from "../models/user.model.js";

export async function signupUser(body) {
    try {
        const { username, email, password } = body;
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            throw new CustomError(400, responseMessage.userAlreadyExists);
        }
        const user = await User.create(body);
        return user;
    } catch (error) {
        throw error;
    }
}

export async function signinUser(body) {
    try {
        const { username, email, password } = body;
        const user = await User.findOne({
            $or: [{ username }, { email }]
        });
        if (!user) {
            throw new CustomError(400, responseMessage.userNotRegistered);
        }
        const isValidPassword = await user.isPasswordCorrect(password);
        if (!isValidPassword) {
            throw new CustomError(400, responseMessage.invalidCredentials);
        }
        const accessToken = user.generateAccessToken();
        return accessToken;
    } catch (error) {
        throw error;
    }
}

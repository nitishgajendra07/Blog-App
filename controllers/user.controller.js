import { responseMessage, tokens } from "../constants.js";
import { signinUser, signupUser } from "../services/user.service.js";

export async function signupController(req, res, next) {
    try {
        const user = await signupUser(req.body);
        res.status(201).json({ success: true, message: responseMessage.registrationSuccess });
    } catch (error) {
        console.log(error);
        if (error.message === responseMessage.userAlreadyExists) {
            return next({ statusCode: 400, message: error.message });
        }
        else {
            return next({ statusCode: 500, message: responseMessage.internalServerError });
        }
    }
}

export async function signinController(req, res, next) {
    try {
        const accessToken = await signinUser(req.body);
        res.status(200)
            .cookie(tokens.accessToken, accessToken, { httpOnly: true })
            .json({ success: true, accessToken });
    } catch (error) {
        console.log("error is ", error);
        if (error.message === responseMessage.missingRequiredFields || error.message === responseMessage.userNotRegistered || error.message === responseMessage.invalidCredentials) {
            return next({ statusCode: 400, message: error.message });
        }
        else {
            res.status(500).json({ error: responseMessage.internalServerError });
        }

    }
}

export async function logoutUserController(req, res) {
    res.status(200)
        .clearCookie(tokens.accessToken, { httpOnly: true })
        .json({ message: responseMessage.logoutSuccess });
}


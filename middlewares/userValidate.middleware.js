import { customErrorMessage, responseMessage } from "../constants.js";

export const signupValidate = (req, res, next) => {
    console.log("req.body", req.body)
    const { username, email, password, profilePicture } = req.body;
    console.log(req.body);
    if (!username || !email || !password) {
        console.log(req.body);
        return next({ statusCode: 400, message: responseMessage.missingRequiredFields });
    }
    const phoneNoRegEx = /^\d{10}$/
    const emailRegEx = /^\S+@\S+\.\S+$/
    if (password.length < 4) {
        return next({ statusCode: 400, message: customErrorMessage.invalidPassword });
    }
    if (!emailRegEx.test(email)) {
        return next({ statusCode: 400, message: customErrorMessage.invalidEmail });
    }
    next();

}

export const signinValidate = (req, res, next) => {
    const { username, email, password } = req.body;
    console.log(req.body);
    if (!(password) || !(username || email)) {
        return next({ statusCode: 400, message: responseMessage.missingRequiredFields });
    }
    next();
}
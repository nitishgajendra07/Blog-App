import { responseMessage } from "../constants.js";
import jwt from 'jsonwebtoken';
import User from "../models/user.model.js";

export async function userAuthenticate(req, res, next) {
    try {
        console.log("entered userAuth")
        
        const accessToken = req.cookies.accessToken;
        console.log("accessToken", accessToken);
        if (!accessToken) {
            return next({ statusCode: 400, message: responseMessage.tokenNotPassed });
        }
        let decodedToken;
        try {
            decodedToken = jwt.verify(accessToken, process.env.JWT_TOKEN_SECRET);
        } catch (error) {
            return next({ statusCode: 400, message: error.name });
        }
        const user = await User.findById(decodedToken._id).select("-password");

        if (!user) {
            return next({ statusCode: 400, message: responseMessage.invalidToken });
        }
        console.log("req.body in userAuth", req.body);

        req.body.userIdFromAuth = decodedToken._id;
        req.body.user = user;
        
        next();
        console.log("2");

    } catch (error) {
        console.log(error);
        return next({ statusCode: 500, message: responseMessage.internalServerError });
    }
}

export default userAuthenticate;    
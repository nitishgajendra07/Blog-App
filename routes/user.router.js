import express from 'express';
import { logoutUserController, signinController, signupController } from '../controllers/user.controller.js';
import { signinValidate, signupValidate } from '../middlewares/userValidate.middleware.js';
import userAuthenticate from '../middlewares/userAuthenticate.middleware.js';

const userRouter = express.Router();

userRouter.route('/signup')
    .post(signupValidate, signupController)

userRouter.route('/signin')
    .post(signinValidate, signinController)

userRouter.route('/logout')
    .post(userAuthenticate, logoutUserController)

export default userRouter;
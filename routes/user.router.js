import express from 'express';
import { signinController, signupController } from '../controllers/user.controller.js';
import { signinValidate, signupValidate } from '../middlewares/userValidate.middleware.js';

const userRouter = express.Router();

userRouter.route('/signup')
    .post(signupValidate, signupController)

userRouter.route('/signin')
    .post(signinValidate, signinController)

export default userRouter;
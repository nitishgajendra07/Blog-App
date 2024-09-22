import express from 'express'
import { createBlogController, deleteBlogController, getBlogController, updateBlogController } from '../controllers/blog.controller.js';
import userAuthenticate from '../middlewares/userAuthenticate.middleware.js';
import { createBlogValidator } from '../middlewares/blogValidate.middleware.js';

export const blogRouter = express.Router();


blogRouter.route('/')
    .post(userAuthenticate, createBlogValidator, createBlogController);

blogRouter.route('/:identifier')
    .get(getBlogController)
    .put(userAuthenticate, updateBlogController)
    .delete(userAuthenticate, deleteBlogController)
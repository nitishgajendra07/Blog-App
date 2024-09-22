import express from 'express';
import { addReviewController, deleteReviewController, getReviewsController } from '../controllers/review.controller.js';
import userAuthenticate from '../middlewares/userAuthenticate.middleware.js';

const reviewRouter = express.Router();

reviewRouter.route('/')
    .post(userAuthenticate, addReviewController);

reviewRouter.route('/blog/:blogId')
    .get(getReviewsController);

reviewRouter.route('/:reviewId')
    .delete(userAuthenticate, deleteReviewController)


export { reviewRouter };

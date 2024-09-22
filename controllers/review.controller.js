import { responseMessage } from "../constants.js";
import { addReviewToDB, deleteReviewFromDB, getReviewsForBlog } from "../services/review.service.js";

export async function addReviewController(req, res, next) {
    const { content, rating, blogId, user } = req.body;

    try {
        const addedReview = await addReviewToDB({ content, rating, blogId, userId: user._id });
        res.status(200).json({ addedReview });
    } catch (err) {
        if (err.name === responseMessage.validationError) {
            console.log(err);
            return next({ statusCode: 400, message: err.errors })
        }
        else if (err.name === responseMessage.invalidBlogId) {
            console.log(err);
            return next({ statusCode: 400, message: responseMessage.invalidBlogId })
        }
        else {
            console.log(err);
            return next({ statusCode: 500, message: responseMessage.internalServerError })
        }
    }

}
export async function deleteReviewController(req, res, next) {
    try {
        const { reviewId } = req.params;
        await deleteReviewFromDB(reviewId, req.body);
        res.status(200).json({ success: true, message: responseMessage.reviewDeletionSuccess })
    } catch (err) {
        if (err.name === responseMessage.validationError) {
            console.log(err);
            return next({ statusCode: 400, message: err.errors })
        }
        else if (err.message === responseMessage.invalidReviewId) {
            console.log(err);
            return next({ statusCode: 400, message: responseMessage.invalidReviewId })
        }
        else {
            console.log(err);
            return next({ statusCode: 400, message: responseMessage.internalServerError })
        }
    }
}



export async function getReviewsController(req, res, next) {
    const { blogId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    try {
        const reviewData = await getReviewsForBlog(blogId, page, limit);
        res.status(200).json({ success: true, ...reviewData });
    } catch (error) {
        console.log(error);
        return next({ statusCode: 500, message: responseMessage.internalServerError });
    }
}


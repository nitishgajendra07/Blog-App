import { responseMessage } from "../constants.js";
import { Review } from "../models/review.model.js";
import { CustomError } from "../utils/utils.js";

export async function addReviewToDB(reviewObj) {
    try {
        console.log("reviewObj", reviewObj)
        const review = await Review.create(reviewObj);
        return review;
    } catch (err) {
        throw err;
    }
}


export async function deleteReviewFromDB(reviewId, body) {
    try {
        const review = await Review.findById(reviewId)
        if (!review) {
            throw new CustomError(400, responseMessage.invalidReviewId);
        }
        if (review.userId.toString() !== body.userIdFromAuth && !body.user.isAdmin) {
            throw new CustomError(400, responseMessage.unauthorizedReviewDelete);
        }
        const deletedReview = await review.deleteOne({ _id: reviewId });
    } catch (err) {
        throw err;
    }
}


export async function getReviewsForBlog(blogId, page = 1, limit = 10) {
    try {
        const skip = (page - 1) * limit;
        const reviews = await Review.find({ blogId })
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });

        console.log("reviews", reviews);

        const totalReviews = await Review.countDocuments({ blogId });

        return {
            reviews,
            totalPages: Math.ceil(totalReviews / limit),
            currentPage: page,
            totalReviews
        };
    } catch (error) {
        throw error;
    }
}

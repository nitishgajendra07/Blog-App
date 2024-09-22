import mongoose from 'mongoose';
import Blog from './blog.model.js';
import { responseMessage } from '../constants.js';

const reviewSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    blogId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog",
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, { timestamps: true });

reviewSchema.pre('save', async function () {
    const existingBlog = await Blog.findById(this.blogId);
    if (!existingBlog) {
        throw new Error(responseMessage.invalidBlogId);
    }
});

reviewSchema.post('save', async function () {
    try {
        const blogId = this.blogId;
        const newRating = this.rating;

        const blog = await Blog.findById(blogId);
        let calculatedRating;
        let newNumberOfReviews;
        if (blog.numberOfReviews === 0) {
            newNumberOfReviews = 1;
            calculatedRating = newRating;
        } else {
            newNumberOfReviews = blog.numberOfReviews + 1;
            calculatedRating = ((blog.rating * (newNumberOfReviews - 1)) + newRating) / newNumberOfReviews;
        }


        await Blog.updateOne(
            { _id: blogId },
            {
                $set: {
                    numberOfReviews: newNumberOfReviews,
                    rating: calculatedRating
                }
            }
        );
    } catch (error) {
        console.log(error);
        throw error;
    }
});

reviewSchema.pre('deleteOne', { document: true, query: false }, async function () {
    try {
        const blogId = this.blogId;
        const ratingToBeRemoved = this.rating;

        const blog = await Blog.findById(blogId);
        let newNumberOfReviews
        let calculatedRating;
        if (blog.numberOfReviews === 1) {
            newNumberOfReviews = 0;
            calculatedRating = null
        } else {
            newNumberOfReviews = blog.numberOfReviews - 1;
            calculatedRating = (blog.rating * blog.numberOfReviews - ratingToBeRemoved) / newNumberOfReviews;

        }

        await Blog.updateOne(
            { _id: blogId },
            {
                $set: {
                    numberOfReviews: newNumberOfReviews,
                    rating: calculatedRating
                }
            }
        );
    } catch (error) {
        console.log(error);
        throw error;
    }
});

const Review = mongoose.model("Review", reviewSchema);

export { Review };

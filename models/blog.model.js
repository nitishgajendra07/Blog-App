import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        username: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
            unique: true,
        },
        content: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            default: 'uncategorized',
        },
        slug: {
            type: String,
            required: true,
            unique: true,
        },
        rating: {
            type: Number,
            min: 1,
            max: 5
        },
        numberOfReviews: {
            type: Number
        }
    },
    { timestamps: true }
);

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;

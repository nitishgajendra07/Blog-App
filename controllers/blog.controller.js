import { DUPLICATE_KEY_ERR, responseMessage } from "../constants.js";
import { addBlogToDatabase, checkIfBlogExists, deleteBlogFromDatabase, getAuthorOfBlog, getBlogById, getBlogByTitle, updateBlogInDatabase } from "../services/blog.service.js";
import { Types } from "mongoose";
const ObjectId = Types.ObjectId;


export async function createBlogController(req, res, next) {
    try {
        const blog = await addBlogToDatabase(req.body);
        res.status(201).json({ success: true, blog });
    } catch (err) {
        if (err.name === responseMessage.validationError) {
            console.log(err);
            return next({ statusCode: 400, message: err.errors });
        }
        else if (err.message.includes(DUPLICATE_KEY_ERR)) {
            console.log(err.message);
            return next({ statusCode: 400, message: err });
        }
        else {
            console.log(err);
            return next({ statusCode: 500, message: responseMessage.internalServerError });
        }

    }
}

export async function getBlogController(req, res, next) {
    try {
        const { identifier } = req.params;
        let blog;
        if (ObjectId.isValid(identifier)) {
            blog = await getBlogById(identifier);
        }
        else {
            blog = await getBlogByTitle(identifier);
        }

        res.status(200).json({ blog });

    } catch (err) {
        if (err.message === responseMessage.invalidBlogId) {
            res.status(400).json({ error: err.name });
        }
        else {
            console.log(err);
            res.status(500).json({ error: responseMessage.internalServerError });
        }

    }
}

export async function updateBlogController(req, res, next) {
    try {
        const blogId = req.params.identifier;
        if (!blogId) {
            throw new Error({statusCode:400, message:responseMessage.missingRequiredFields})
        }
        const updatedBlog = await updateBlogInDatabase(blogId, req.body);

        if (!updatedBlog) {
            return next({ statusCode: 404, message: responseMessage.blogNotFound });
        }

        res.status(200).json({ success: true, blog: updatedBlog });
    } catch (err) {
        if (err.name === responseMessage.validationError) {
            console.log(err);
            return next({ statusCode: 400, message: err.errors });
        }
        else if (err.message.includes(DUPLICATE_KEY_ERR)) {
            console.log(err.message);
            return next({ statusCode: 400, message: err });
        }
        else {
            console.log(err);
            return next({ statusCode: 500, message: responseMessage.internalServerError });
        }
    }
}

export async function deleteBlogController(req, res, next) {
    try {
        const blogId = req.params.identifier;

        if (!blogId) {
            throw new Error({statusCode:400, message:responseMessage.missingRequiredFields})
        }


        const deletedBlog = await deleteBlogFromDatabase(blogId, req.body);

        if (!deletedBlog) {
            return next({ statusCode: 404, message: responseMessage.blogNotFound });
        }

        res.status(200).json({ success: true, message: "Blog deleted successfully", blog: deletedBlog });
    } catch (err) {
        console.log(err);
        return next({ statusCode: 500, message: responseMessage.internalServerError });
    }
}


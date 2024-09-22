import { responseMessage } from "../constants.js";
import Blog from "../models/blog.model.js";
import { CustomError, slugify } from "../utils/utils.js";

export async function addBlogToDatabase(body) {
  try {
    const { username, title, content, slug, userIdFromAuth, category } = body
    const newBlog = await Blog.create({
      userId: userIdFromAuth,
      username,
      title,
      content,
      category,
      slug
    });
    return newBlog;
  } catch (err) {
    throw err;
  }
}

export async function getBlogById(blogId) {
  try {
    const blog = await Blog.findOne({ _id: blogId });
    if (!blog) {
      throw new CustomError(400, responseMessage.invalidBlogId);
    }
    return blog;
  } catch (err) {
    throw err;
  }
}

export async function updateBlogInDatabase(blogId, body) {
  try {
    const { title, content, category, user, userIdFromAuth } = body;
    const blog = await Blog.findById(blogId);
    if (!blog) {
      throw new CustomError(400, responseMessage.blogNotFound);
    }
    if (blog.userId.toString() !== userIdFromAuth && !user.isAdmin) {
      throw new CustomError(400, responseMessage.unauthorizedBlogUpdate);
    }
    let slug;
    if (title) {
      slug = slugify(title)
    }
    const updatedBlog = await Blog.findByIdAndUpdate(
      blogId,
      {
        title,
        content,
        category,
        slug
      },
      {
        new: true,
        runValidators: true
      }
    );

    return updatedBlog;
  } catch (err) {
    throw err;
  }
}

export async function deleteBlogFromDatabase(blogId, body) {
  try {
    const blog = await Blog.findById(blogId);
    if (blog.userId.toString() !== body.userIdFromAuth && !body.user.isAdmin) {
      throw new CustomError(400, responseMessage.unauthorizedBlogDelete);
    }
    const deletedBlog = await Blog.findByIdAndDelete(blogId);

    return deletedBlog;
  } catch (err) {
    throw err;
  }
}




export async function getBlogByTitle(blogTitle) {
  try {
    const blog = await Blog.findOne({ title: blogTitle });
    if (!blog) {
      throw new CustomError(400, responseMessage.invalidBlogId);
    }
    return blog;
  } catch (err) {
    throw err;
  }
}


export async function getAuthorOfBlog(_id) {
  try {

    const pipeline = [
      {
        $match: {
          _id: new mongoose.Types.ObjectId(_id)
        }
      },
      {
        $lookup: {
          from: "authors",
          localField: "author",
          foreignField: "_id",
          as: "author",
        }
      },
      {
        $addFields: {
          authorDetails: { $first: "$author" }
        }
      },
      {
        $project: {
          authorDetails: 1,
          _id: 0
        }
      }
    ];
    const author = await Blog.aggregate(pipeline);
    return author;
  } catch (err) {
    throw err;
  }
}


export async function checkIfBlogExists(blogId) {
  const blog = await Blog.findById(blogId);
  if (!blog) {
    return false;
  }
  return true;
}
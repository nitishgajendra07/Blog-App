import { responseMessage } from "../constants.js";
import { slugify } from "../utils/utils.js";

export function createBlogValidator(req, res, next) {
    const { username, title, content, category } = req.body;
    if (!username?.trim() || !title?.trim() || !content?.trim()) {
        return next({ statusCode: 400, message: responseMessage.missingRequiredFields });
    }
    const slug = slugify(req.body.title)
    req.body.slug = slug;
    next();
}
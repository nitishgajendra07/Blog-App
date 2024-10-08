const DUPLICATE_KEY_ERR = "E11000 duplicate key error collection";

const responseMessage = {
    internalServerError: "internal server error",
    registrationSuccess: "registered successfully. You can now login",
    userNotRegistered: "User not registered",
    missingUpdationField: "No value for qualification is sent",
    updationSuccess: "Profile updated successfully",
    userNotFound: "User not found",
    deletionSuccess: "Profile deleted successfully",
    missingRequiredFields: "Missing required fields.",
    invalidAge: "Invalid age",
    invalidEmail: "Invalid email",
    invalidToken: "Invalid Token",
    missingUsernamePassword: "Missing username and or password",
    userAlreadyExists: "User already exists",
    invalidTitleError: "invalidTitle",
    validationError: 'ValidationError',
    pageNotFound: "Page Not Found",
    invalidBlogId: "Invalid blogId",
    invalidBlogTitle: "Invalid blogTitle",
    reviewDeletionSuccess: "Review deleted successfully",
    invalidReviewId: "Invalid reviewId",
    missingBlogId: "Missing blogId",
    logoutSuccess: "Logged out successfully",
    unauthorizedBlogUpdate: 'Unauthorized: You do not have permission to update this blog',
    unauthorizedBlogDelete: 'Unauthorized: You do not have permission to delete this blog',
    unauthorizedReviewDelete: 'Unauthorized: You do not have permission to delete this Review',
    blogNotFound: 'Blog not found'
};

const customErrorMessage = {
    valueMustBeString: '{VALUE} must be string',
    pathRequired: "path{PATH} is required!!!!",
    valueNotSupported: '{VALUE} is not supported',
    mongoDBFail: "mongodb connection failed!!"
};

const tokens = {
    accessToken: 'accessToken'
};

const allowedBlogCategories = ['Node.js', 'MongoDB', 'Express'];

const serverListeningMessage = "Server is listening at port :";

export {
    DUPLICATE_KEY_ERR,
    responseMessage,
    customErrorMessage,
    serverListeningMessage,
    allowedBlogCategories,
    tokens
};

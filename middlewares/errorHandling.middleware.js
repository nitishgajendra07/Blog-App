import { responseMessage } from '../constants.js';

export function errorHandler(error, req, res, next) {
    console.log("entered err handling middleware");
    console.log(error);
    res.status(error.statusCode || 500).json({ error: error.message });
}
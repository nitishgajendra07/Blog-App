import express from 'express';
import dotenv from 'dotenv';
import { serverListeningMessage } from './constants.js';
import { connectToDB } from './db/connectToDB.js';
import userRouter from './routes/user.router.js';
import { errorHandler } from './middlewares/errorHandling.middleware.js';
import { blogRouter } from './routes/blog.router.js';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/user', userRouter);
app.use('/blog', blogRouter);

app.all("*", (req, res) => {
    res.status(404).json({ error: responseMessage.pageNotFound });
});

app.use(errorHandler);

connectToDB()
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`${serverListeningMessage} ${process.env.PORT}`);
        })
    })
    .catch((err) => {
        console.log(customErrorMessage.mongoDBFail, err);
    })
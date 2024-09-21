import express from 'express';
import dotenv from 'dotenv';
import { serverListeningMessage } from './constants.js';
import { connectToDB } from './db/connectToDB.js';

dotenv.config();

const app = express()

connectToDB()
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`${serverListeningMessage} ${process.env.PORT}`);
        })
    })
    .catch((err) => {
        console.log(customErrorMessage.mongoDBFail, err);
    })
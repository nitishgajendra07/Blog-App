const express = require('express')
const dotenv= require('dotenv');
const { serverListeningMessage } = require('./constants');

dotenv.config();

const app  = express()

app.listen(process.env.PORT , () => {
    console.log(`${serverListeningMessage} ${process.env.PORT}`);
})
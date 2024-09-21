import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connectToDB = async () => {
    try {
        const database = await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`)
        console.log(`connected to ${database.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}

export  { connectToDB };
import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
    try {
        const conInst = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\n Mongo DB Connected Success !! DB HOST : ${conInst.connection.host}`);

    } catch (error) {
        console.log("MONGOOSE Connection Failed !!!", error );
        process.exit(1)
    }
} 

export default connectDB
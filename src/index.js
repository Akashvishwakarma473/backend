import dotenv from "dotenv";
import connectDB from "./db/db.js";

dotenv.config({
    path: './env'
})
connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000)
})
.catch((err) => {
    console.log("Mongo DB Connection Failed ! ", err);
})
















/*
This is First Approach to Connect Database 
All codes written in main index.js File 

import mongoose from "mongoose";
import { DB_NAME } from "./constants";
import express from "express";

const app = express()

( async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("Error", (error) =>{ console.log("ERROR : ", error); throw error } )

        app.listen(process.env.PORT, () =>{ 
            console.log(`App is Listning on Port ${process.env.PORT}`); 
        })

    } catch (error) {
        console.error("ERROR : ", error)
        throw err
    }
})()

*/
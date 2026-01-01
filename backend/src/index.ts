import express from "express";
import cors from "cors";
import {ENV} from "./config/env";
import { clerkMiddleware } from "@clerk/express";

// import application routes

const app = express();

// third party middlewares
app.use(cors({
    origin: ENV.FRONTEND_URL
}))
app.use(clerkMiddleware());  //auth object will be attached to the req
app.use(express.json()); //parses json request bodies
app.use(express.urlencoded({extended: true})); // parses form data (like HTML forms)

// application routes


const server = app.listen(ENV.PORT, () => {
    console.log("Server is running on port 3000");
});
import express from "express";
import cors from "cors";
import { ENV } from "./config/env";
import { clerkMiddleware } from "@clerk/express";

// import application routes
import userRoutes from "./routes/userRoutes";
import productRoutes from "./routes/productRoutes";
import commentRoutes from "./routes/commentRoutes";

const app = express();

// third party middlewares
app.use(
  cors({
    origin: ENV.FRONTEND_URL,
    credentials: true,
  }),
);
app.use(clerkMiddleware()); //auth object will be attached to the req
app.use(express.json()); //parses json request bodies
app.use(express.urlencoded({ extended: true })); // parses form data (like HTML forms)

// application routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/comments", commentRoutes);

const server = app.listen(ENV.PORT, () => {
  console.log("Server is running on port 3000");
});

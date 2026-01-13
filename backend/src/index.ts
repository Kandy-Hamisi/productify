import express from "express";
import cors from "cors";
import { ENV } from "./config/env";
import { clerkMiddleware } from "@clerk/express";
import path from "path";

// import application routes
import userRoutes from "./routes/userRoutes";
import productRoutes from "./routes/productRoutes";
import commentRoutes from "./routes/commentRoutes";

const app = express();

// third party middlewares
app.use(
  cors({
    origin: ENV.FRONTEND_URL,
    credentials: true, // allows frontend to send cookies to the backend so that we can authenticate the user
  }),
);
app.use(clerkMiddleware()); //auth object will be attached to the req
app.use(express.json()); //parses json request bodies
app.use(express.urlencoded({ extended: true })); // parses form data (like HTML forms)

// application routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/comments", commentRoutes);

if (ENV.NODE_ENV === "production") {
  const __dirname = path.resolve();

  // serve static files from frontend/dist
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  // handle Single Page Application routing - send all non API routes to index.html - react application
  app.get("/{*any}", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

const server = app.listen(ENV.PORT, () => {
  console.log(`Server listening on port ${ENV.PORT}`);
});

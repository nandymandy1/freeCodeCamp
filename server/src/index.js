import cors from "cors";
import mongoose from "mongoose";
import express, { json } from "express";
import { success, error } from "consola";

// Import Application Constants
import { PORT, DB } from "./constants";

// Router Group Imports
import UserRouter from "./router/users";
import PostRouter from "./router/posts";

// Initialize the application
const app = express();

// Inject Application Middlewares
app.use(json());
app.use(cors());

// Inject Routers
app.use("/api/users", UserRouter);
app.use("/api/posts", PostRouter);

// Main Application Functions
const main = async () => {
  try {
    // Connect with the database
    await mongoose.connect(DB, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    success(`DB Connected`);
    // Start listening for the request on PORT
    app.listen(PORT, () => success(`SERVER STARTED ON PORT ${PORT}`));
  } catch (err) {
    error(`SERVER ERROR ${err.message}`);
  }
};

main();

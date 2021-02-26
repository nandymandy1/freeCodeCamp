import cors from "cors";
import mongoose from "mongoose";
import express, { json } from "express";
import { success, error } from "consola";

// Import Application Constants
import { PORT, DB } from "./constants";

// Initialize the application
const app = express();

// Inject Application Middlewares
app.use(json());
app.use(cors());

// // Test Route
// app.get("/", async (req, res) => {
//   return res.status(200).json({
//     message: "HELLO WORLD",
//   });
// });

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

import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import taskRoute from "./routes/task.routes.js";
import userRoute from "./routes/user.routes.js";

dotenv.config();
const app = express();
//middleware
app.use(express.json());
app.use(cors());

// Test route
app.use("/api/v1/tasks", taskRoute);
app.use("/api/v1/user", userRoute);

//Database connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log("Failed to connect to MongoDB", error));

// Start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

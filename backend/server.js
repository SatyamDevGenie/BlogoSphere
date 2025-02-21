import dotenv from "dotenv";
import express from "express";
import path from "path";
import chalk from "chalk";

import connectDB from "./config/db.js";
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";
import blogRoutes from "./routes/blogRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config(); // For Env

connectDB(); // connection to Mongodb

const app = express();
app.use(express.json()); // Accepting the json data

app.get("/", (req, res) => {
  res.send("API is running");
});

//Routes
app.use("/api/blogs", blogRoutes);
app.use("/api/users", userRoutes);
app.use("/api/uploads", uploadRoutes);

//Create static folder
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running");
  });
}

// Middleware
app.use(notFound);
app.use(errorHandler);

//Whole ENV Setup
const PORT = process.env.PORT || 5000;



app.listen(PORT, () => {
    console.log(chalk.yellow(`Server running in ${process.env.NODE_ENV} mode on PORT ${PORT}`));
});


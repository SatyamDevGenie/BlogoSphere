import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";
import blogs from "./data/blogs.js";
import { errorHandler, notFound } from "./middlwares/errorMiddleware.js";

dotenv.config();

connectDB();

const app = express();

app.get("/", (req, res) => {
  res.send("API is running");
});

app.get("/api/blogs", (req, res) => {
  res.json(blogs);
});

app.get("/api/blogs/:id", (req, res) => {
  const blog = blogs.find((b) => b._id === req.params.id);
  res.json(blog);
});

// Middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on PORT ${PORT}`);
});

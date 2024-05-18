import express from "express";
import {
  addBlogReview,
  createBlog,
  deleteBlog,
  getBlogById,
  getBlogs,
  updateBlog,
} from "../controllers/blogControllers.js";
import { protect } from "../middlwares/authMiddleware.js"; // Middleware

const router = express.Router();

router.route("/").get(getBlogs).post(protect, createBlog); //  "/" route for all blogs and create new blog
router
  .route("/:id")
  .get(getBlogById)
  .put(protect, updateBlog)
  .delete(protect, deleteBlog); //  "/:id" route for update blog, det single blog, delete blog

router.route("/:id/reviews").post(protect, addBlogReview); // review on particular blog

export default router;

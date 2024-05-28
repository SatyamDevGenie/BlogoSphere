import express from "express";
import {
  addBlogReview,
  createBlog,
  deleteBlog,
  getBlogById,
  getBlogs,
  updateBlog,
} from "../controllers/blogControllers.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").get(getBlogs).post(protect, createBlog);
router
  .route("/:id")
  .get(getBlogById)
  .put(protect, updateBlog)
  .delete(protect, deleteBlog);
router.route("/:id/reviews").post(protect, addBlogReview); //for adding comment

export default router;

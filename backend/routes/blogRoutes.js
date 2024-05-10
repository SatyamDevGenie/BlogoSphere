import express from "express";
import {
  createBlog,
  getBlogById,
  getBlogs,
} from "../controllers/blogControllers.js";
import { protect } from "../middlwares/authMiddleware.js";

const router = express.Router();

router.route("/").get(getBlogs).post(protect, createBlog);
router.route("/:id").get(getBlogById);

export default router;

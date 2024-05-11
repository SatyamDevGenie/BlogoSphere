// import asyncHandler from "express-async-handler";

// import Blog from "../models/blogModel.js";

// /**
//  * @desc		Get all blogs
//  * @route		GET /api/blogs
//  * @access	public
//  */

// const getBlogs = asyncHandler(async (req, res) => {
//   const blogs = await Blog.find({});
//   res.json(blogs);
// });

// /**
//  * @desc		Get single blog
//  * @route		GET /api/blogs/:id
//  * @access	public
//  */

// const getBlogById = asyncHandler(async (req, res) => {
//   try {
//     const blog = await Blog.findById(req.params.id);

//     if (blog) {
//       res.json(blog);
//     } else {
//       res.status(404).json({ message: "Blog not found" });
//     }
//   } catch (err) {
//     console.log(err.message);
//     res.json(err);
//   }
// });

// /**
//  * @desc		Create a product
//  * @route		POST /api/blogs/postBlog
//  * @access	private/admin
//  */
// const createBlog = asyncHandler(async (req, res) => {
//   const { title, content, image } = req.body;
//   try {
//     const newBlog = new Blog({
//       title,
//       content,
//       image,
//       user: req.user._id,
//     });
//     const createdBlog = await newBlog.save();
//     res.status(201).json(createdBlog);
//   } catch (err) {
//     console.log(err.message);
//     res.status(500).json({ message: "Server Error" });
//   }
// });

// export { createBlog, getBlogById, getBlogs };

import asyncHandler from "express-async-handler";

import Blog from "../models/blogModel.js";

/**
 * @desc		Get all blogs
 * @route		GET /api/blogs
 * @access	public
 */

const getBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find({});
  res.json(blogs);
});

/**
 * @desc		Get single blog
 * @route		GET /api/blogs/:id
 * @access	public
 */

const getBlogById = asyncHandler(async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (blog) {
      res.json(blog);
    } else {
      res.status(404).json({ message: "Blog not found" });
    }
  } catch (err) {
    console.log(err.message);
    res.json(err);
  }
});

/**
 * @desc		Create a product
 * @route		POST /api/blogs/postBlog
 * @access	private/admin
 */
const createBlog = asyncHandler(async (req, res) => {
  const { title, content, image } = req.body;
  try {
    const newBlog = new Blog({
      title,
      content,
      image,
      user: req.user._id,
    });
    const createdBlog = await newBlog.save();
    res.status(201).json(createdBlog);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Server Error" });
  }
});

/**
 * @desc		Update a product
 * @route		PUT/api/blogs/:id
 * @access	private/admin
 */
const updateBlog = asyncHandler(async (req, res) => {
  const { title, content, image } = req.body;

  const blog = await Blog.findById(req.params.id);

  if (blog) {
    blog.title = title;
    blog.content = content;
    blog.image = image;

    const updatedBlog = await blog.save();
    res.json(updatedBlog);
  } else {
    res.status(404);
    throw new Error("Blog not Found");
  }
});

/**
 * @desc		Delete a blog
 * @route		DELETE /api/blogs/:id
 * @access	private
 */
const deleteBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (blog) {
    await blog.deleteOne();
    res.json({ message: "Blog deleted" });
  } else {
    res.status(404);
    throw new Error("Blog not Found");
  }
});

export { createBlog, deleteBlog, getBlogById, getBlogs, updateBlog };

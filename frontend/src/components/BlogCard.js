import React from "react";
import { IoEyeOutline } from "react-icons/io5";
import { Link as RouterLink } from "react-router-dom";

const BlogCard = ({ blog }) => {
  return (
    <RouterLink
      to={`/blogs/${blog._id}`}
      className="group block w-full max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:-translate-y-2 hover:shadow-lg duration-300"
      aria-label={`Read more about ${blog.title}`}
    >
      <img
        src={blog.image}
        alt={blog.title}
        className="w-full h-40 object-cover"
      />

      <div className="p-4">
        <h4 className="text-lg font-medium text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
          {blog.title}
        </h4>

        <p className="text-sm text-gray-600 mt-2 line-clamp-2">
          {blog.description || "No description available."}
        </p>

        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center gap-2 text-gray-500">
            <IoEyeOutline className="text-gray-500" />
            <span className="text-sm font-medium">{blog.views || 0} views</span>
          </div>

          <span className="text-xs text-gray-400">
            {new Date(blog.createdAt).toLocaleDateString() || "Unknown date"}
          </span>
        </div>
      </div>
    </RouterLink>
  );
};

export default BlogCard;

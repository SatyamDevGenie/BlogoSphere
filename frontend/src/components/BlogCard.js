import React from "react";
import { IoEyeOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";

const BlogCard = ({ blog }) => {
  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const randomNumber = getRandomInt(1, 50);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <RouterLink
      to={`/blogs/${blog._id}`}
      className="group block max-w-sm mx-auto bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:-translate-y-1 hover:shadow-2xl duration-300"
    >
      {/* Image Section */}
      <div className="relative overflow-hidden">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-50 object-contain rounded-t-lg group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Content Section */}
      <div className="p-4">
        <h4 className="text-xl font-extrabold text-gray-800 group-hover:text-purple-600 transition-colors duration-300">
          {blog.title}
        </h4>
        <p className="text-gray-500 text-sm mt-2 line-clamp-2">
          {blog.description}
        </p>
        <div className="flex justify-between items-center mt-2">
          <div className="flex items-center gap-2">
            <button
              aria-label="View"
              className="p-2 bg-gray-100 text-gray-500 rounded-full hover:bg-purple-100 hover:text-purple-600 transition-colors duration-300"
              title="View Count"
            >
              <IoEyeOutline className="w-5 h-5" />
            </button>
            <span className="text-sm font-medium text-gray-700">
              {randomNumber} views
            </span>
          </div>
        </div>
      </div>
    </RouterLink>
  );
};

export default BlogCard;

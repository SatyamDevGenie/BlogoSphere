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
      className="group block w-full mx-auto bg-white rounded-md shadow-md overflow-hidden transition-transform transform group-hover:-translate-y-1 group-hover:shadow-xl duration-300"
    >
      <img
        src={blog.image}
        alt={blog.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h4 className="text-lg font-semibold">{blog.title}</h4>
        <div className="flex justify-between items-center mt-2">
          <div className="flex items-center gap-2">
            <button
              aria-label="View"
              className="p-2 text-gray-500 group-hover:text-gray-700 transition-colors duration-300"
            >
              <IoEyeOutline />
            </button>
            <span className="text-sm">{randomNumber}</span>
          </div>
        </div>
      </div>
    </RouterLink>
  );
};

export default BlogCard;

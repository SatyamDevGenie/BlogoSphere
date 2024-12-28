import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@chakra-ui/react";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import {
  createBlogReview,
  deleteBlog,
  listBlogDetails,
} from "../actions/blogActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Rating from "../components/Rating";
import { BLOG_REVIEW_CREATE_RESET } from "../constants/blogConstants";

const SingleBlogScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");
  const [name, setName] = useState("");

  const blogDetails = useSelector((state) => state.blogDetails);
  const { loading, error, blog } = blogDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const blogReviewCreate = useSelector((state) => state.blogReviewCreate);
  const { success: successBlogReview, error: errorBlogReview } =
    blogReviewCreate;

  useEffect(() => {
    if (successBlogReview) {
      alert("Review Submitted");
      setRating(1);
      setComment("");
      setName("");
      dispatch({ type: BLOG_REVIEW_CREATE_RESET });
    }
    dispatch(listBlogDetails(id));
  }, [id, dispatch, successBlogReview]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createBlogReview(id, { rating, comment, name }));
  };

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure to delete your blog?")) {
      dispatch(deleteBlog(id));
      navigate(`/`);
    }
  };

  return (
    <div className="flex flex-col items-center mt-4 px-4">
      {/* Go Back Button */}
      <div className="w-full mb-6">
        <Button
          as={RouterLink}
          to="/"
          size="sm"
          colorScheme="teal"
          fontWeight="bold"
          _hover={{
            bgColor: "green.400",
            transform: "scale(1.05)",
            transition: "0.3s",
          }}
        >
          Go Back
        </Button>
      </div>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message type="error">{error}</Message>
      ) : (
        <>
          <div className="w-full max-w-4xl">
            <h2 className="text-3xl font-bold mb-4">{blog.title}</h2>
            <img
              src={blog.image}
              alt={blog.title}
              className="rounded-lg w-full h-64 object-cover mb-4"
            />
            <p className="text-lg text-gray-800 leading-relaxed mb-6">
              {blog.content}
            </p>

            <div className="text-sm text-gray-600">
              <p>
                <strong>Created by:</strong> {blog.author?.name}
              </p>
              <p>
                <strong>Contact:</strong>{" "}
                <a
                  href={`mailto:${blog.author?.email}`}
                  className="text-blue-500"
                >
                  {blog.author?.email}
                </a>
              </p>
            </div>

            <div className="mt-6 flex space-x-4">
              {blog.author?.email === userInfo?.email && (
                <>
                  <button
                    onClick={() => navigate(`/editBlog/${id}`)}
                    className="flex items-center bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 transition"
                  >
                    <FaEdit className="mr-2" /> Edit
                  </button>
                  <button
                    onClick={() => deleteHandler(blog._id)}
                    className="flex items-center bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
                  >
                    <MdDelete className="mr-2" /> Delete
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="w-full max-w-4xl mt-10">
            <h3 className="text-2xl font-semibold mb-4">Post Comments</h3>
            {blog.reviews?.length === 0 ? (
              <Message>No Reviews</Message>
            ) : (
              blog.reviews.map((review) => (
                <div key={review._id} className="bg-gray-100 p-4 mb-4 rounded">
                  <div className="flex justify-between">
                    <p className="font-bold">{review.name}</p>
                    <Rating value={review.rating} />
                  </div>
                  <p>{review.comment}</p>
                </div>
              ))
            )}

            {userInfo ? (
              <form onSubmit={submitHandler} className="mt-6">
                <div className="mb-4">
                  <label className="block text-sm mb-2">Rating</label>
                  <select
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    className="border rounded px-3 py-2 w-full"
                  >
                    <option value="">Select...</option>
                    <option value="1">1 - Poor</option>
                    <option value="2">2 - Fair</option>
                    <option value="3">3 - Good</option>
                    <option value="4">4 - Very Good</option>
                    <option value="5">5 - Excellent</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block text-sm mb-2">Comment</label>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="border rounded px-3 py-2 w-full"
                  ></textarea>
                </div>

                <div className="mb-4">
                  <label className="block text-sm mb-2">Your Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border rounded px-3 py-2 w-full"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-teal-500 text-white py-2 px-4 rounded hover:bg-teal-600"
                >
                  Submit Review
                </button>
              </form>
            ) : (
              <Message>Please log in to write a review</Message>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default SingleBlogScreen;

import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import { createBlogReview, deleteBlog, listBlogDetails } from "../actions/blogActions";
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

  const blogDetails = useSelector((state) => state.blogDetails);
  const { loading, error, blog } = blogDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const blogReviewCreate = useSelector((state) => state.blogReviewCreate);
  const { success: successBlogReview, error: errorBlogReview } = blogReviewCreate;

  useEffect(() => {
    if (successBlogReview) {
      alert("Review Submitted");
      setRating(1);
      setComment("");
      dispatch({ type: BLOG_REVIEW_CREATE_RESET });
    }
    dispatch(listBlogDetails(id));
  }, [id, dispatch, successBlogReview]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createBlogReview(id, { rating, comment }));
  };

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure to delete your blog?")) {
      dispatch(deleteBlog(id));
      navigate(`/`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <button
        className="bg-teal-600 text-white px-6 py-2 rounded-lg shadow hover:bg-teal-700 mb-6"
        onClick={() => navigate("/")}
      >
        Go Back
      </button>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message type="error">{error}</Message>
      ) : (
        <>
          <div className="bg-white shadow-xl rounded-lg overflow-hidden mb-6">
            <div className="relative">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-full object-contain"
              />
              <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg">
                <h1 className="text-3xl font-bold">{blog.title}</h1>
              </div>
            </div>

            <div className="p-6">
              <p className="text-lg text-gray-800 mb-4">{blog.content}</p>
              <div className="flex justify-between items-center mb-4">
                <p className="text-sm text-gray-600">By {blog.author?.name}</p>
                <p className="text-sm text-gray-600">{blog.createdAt}</p>
              </div>

              {blog.author?.email === userInfo?.email && (
                <div className="flex gap-6 mt-4">
                  <button
                    className="flex items-center gap-2 bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600"
                    onClick={() => navigate(`/editBlog/${id}`)}
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    className="flex items-center gap-2 bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600"
                    onClick={() => deleteHandler(blog._id)}
                  >
                    <MdDelete /> Delete
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white shadow-xl rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-6">Comments</h2>
            {blog.reviews?.length === 0 ? (
              <Message>No Reviews Yet</Message>
            ) : (
              <div className="space-y-6">
                {blog.reviews.map((review) => (
                  <div
                    key={review._id}
                    className="bg-gray-100 p-4 rounded-lg shadow-md"
                  >
                    <div className="flex justify-between mb-2">
                      <p className="font-semibold">{review.name}</p>
                      <Rating value={review.rating} />
                    </div>
                    <p className="text-sm">{review.comment}</p>
                  </div>
                ))}
              </div>
            )}

            {userInfo ? (
              <form onSubmit={submitHandler} className="mt-8">
                <div className="mb-6">
                  <label className="block text-sm text-gray-700 mb-2">Rating</label>
                  <select
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700"
                  >
                    <option value="1">1 - Poor</option>
                    <option value="2">2 - Fair</option>
                    <option value="3">3 - Good</option>
                    <option value="4">4 - Very Good</option>
                    <option value="5">5 - Excellent</option>
                  </select>
                </div>

                <div className="mb-6">
                  <label className="block text-sm text-gray-700 mb-2">Comment</label>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700"
                    rows="4"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="bg-teal-600 text-white px-6 py-3 rounded-lg shadow hover:bg-teal-700"
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

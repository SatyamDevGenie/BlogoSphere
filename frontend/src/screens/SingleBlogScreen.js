import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  Image,
  Select,
  Text,
  Textarea,
  IconButton,
  Divider,
  Link,
} from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
    if (window.confirm("Are you sure?")) {
      dispatch(deleteBlog(id));
      navigate(`/`);
    }
  };

  return (
    <Flex direction="column" alignItems="center" mt="6">
      {/* Go Back Button */}
      <Button
        as={RouterLink}
        to="/"
        size="sm"
        colorScheme="teal"
        border="1px solid #fff"
        fontFamily="Teko"
        fontWeight="bold"
        p={{ base: "10px", md: "22px" }}
        alignSelf="flex-start"
        _hover={{
          textDecor: "none",
          bgColor: "green",
          fontWeight: "bolder",
          shadow: "lg",
          transform: "translateY(-10px)",
          transition: "all 0.3s ease-in-out",
        }}
      >
        Go Back
      </Button>

      {/* BLOG Grid */}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message type="error">{error}</Message>
      ) : (
        <>
          <Grid
            templateColumns={{ sm: "1fr", md: "1fr" }}
            gap={{ base: "4", md: "8" }}
            maxWidth="1200px"
            width="100%"
            mt="8"
          >
            {/* BLOG Details */}
            <Flex direction="column" alignItems="flex-start">
              {/* BLOG title */}
              <Heading as="h2" fontSize="4xl" mb="4" fontFamily="Verdana">
                {blog.title}
              </Heading>

              {/* BLOG Image */}

              <Image
                src={blog.image}
                alt={blog.title}
                borderRadius="15px"
                 className="w-full h-full object-contain"
              />

              {/* BLOG Description */}
              <Text
                fontSize="lg"
                mb="6"
                fontFamily="Verdana"
                textAlign="justify"
                mt="3"
              >
                {blog.content}
              </Text>

              <Divider />
              {/* Additional Information */}
              <Flex
                justifyContent="space-between"
                direction="column"
                gap="5"
                w="full"
              >
                <Text fontSize="17px" color="#000" fontFamily="Verdana">
                  Blog created by:
                  <u> {blog.author && blog.author.name}</u>
                </Text>
                <Text fontSize="17px" color="#000" fontFamily="Verdana">
                  Author:
                  <Link
                    fontSize="17px"
                    href={`mailto:${blog.author && blog.author.email}`}
                  >
                    {blog.author && blog.author.email}
                  </Link>
                </Text>

                {/* Conditionally render Delete Button */}
                <Flex
                  justifyContent={{
                    sm: "center",
                    base: "center",
                    md: "space-between",
                  }}
                  direction={{ sm: "column", base: "column", md: "row" }}
                  gap={{ sm: "2", base: 4, md: 10 }}
                  w={{ sm: "full", base: "100%", md: "full" }}
                >
                  {blog.author && blog.author.email === userInfo?.email ? (
                    <IconButton
                      aria-label="Delete"
                      icon={<MdDelete />}
                      colorScheme="gray"
                      w="300px"
                      h="50px"
                      _hover={{
                        textDecor: "none",
                        bgColor: "red",
                        fontWeight: "bolder",
                        shadow: "lg",
                        transform: "translateY(-10px)",
                        transition: "all 0.3s ease-in-out",
                      }}
                      onClick={() => deleteHandler(blog._id)}
                    />
                  ) : (
                    <Text>Can only be deleted by Author</Text>
                  )}

                  {blog.author && blog.author.email === userInfo?.email ? (
                    <IconButton
                      aria-label="Edit"
                      icon={<FaEdit />}
                      colorScheme="gray"
                      // size="800px"
                      w="300px"
                      h="50px"
                      _hover={{
                        textDecor: "none",
                        bgColor: "beige",
                        fontWeight: "bolder",
                        shadow: "lg",
                        transform: "translateY(-10px)",
                        transition: "all 0.3s ease-in-out",
                      }}
                      onClick={() => {
                        navigate(`/editBlog/${id}`);
                      }}
                    />
                  ) : (
                    <Text>Can only be edited by Author</Text>
                  )}
                </Flex>
              </Flex>
            </Flex>
          </Grid>
          <Box
            p="10"
            bgColor="white"
            rounded="md"
            mt="10"
            borderColor="gray.300"
            w="full"
          >
            <Divider />
            <Heading as="h3" size="lg" mb="6">
              Write a review
            </Heading>

            {blog && blog.reviews?.length === 0 && (
              <Message>No Reviews</Message>
            )}

            {blog && blog.reviews?.length !== 0 && (
              <Box p="4" bgColor="white.900" rounded="md" mb="1" mt="5">
                {blog?.reviews?.map((review) => (
                  <Flex direction="column" key={review._id} mb="5" w="full">
                    <Flex justifyContent="space-between">
                      <Text fontSize="lg">
                        <strong>{review.name}</strong>
                      </Text>
                      <Rating value={review.rating} />
                    </Flex>
                    <Text mt="2">{review.comment}</Text>
                  </Flex>
                ))}
              </Box>
            )}

            {errorBlogReview && (
              <Message type="error">{errorBlogReview}</Message>
            )}

            {userInfo ? (
              <form onSubmit={submitHandler}>
                <FormControl id="rating" mb="3">
                  <FormLabel>Rating</FormLabel>
                  <Select
                    placeholder="Select Option"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                  >
                    <option>Select...</option>
                    <option value="1">1 - Poor</option>
                    <option value="2">2 - Okay</option>
                    <option value="3">3 - Good</option>
                    <option value="4">4 - Very Good</option>
                    <option value="5">5 - Excellent</option>
                  </Select>
                </FormControl>

                <FormControl id="comment" mb="3">
                  <FormLabel>Comment:</FormLabel>
                  <Textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  ></Textarea>
                </FormControl>

                <FormControl id="name" mb="3">
                  <FormLabel>
                    Your name: (To verify this is not a Robot 🤖)
                  </FormLabel>
                  <Textarea
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  ></Textarea>
                </FormControl>

                <Button colorScheme="teal" type="submit">
                  Post Review
                </Button>
              </form>
            ) : (
              <Message>Please login to write a review</Message>
            )}
          </Box>
        </>
      )}
    </Flex>
  );
};

export default SingleBlogScreen;












// import { useEffect, useState } from "react";
// import { FaEdit } from "react-icons/fa";
// import { MdDelete } from "react-icons/md";
// import { useDispatch, useSelector } from "react-redux";
// import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
// import { createBlogReview, deleteBlog, listBlogDetails } from "../actions/blogActions";
// import Loader from "../components/Loader";
// import Message from "../components/Message";
// import Rating from "../components/Rating";
// import { BLOG_REVIEW_CREATE_RESET } from "../constants/blogConstants";

// const SingleBlogScreen = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { id } = useParams();

//   const [rating, setRating] = useState(1);
//   const [comment, setComment] = useState("");

//   const blogDetails = useSelector((state) => state.blogDetails);
//   const { loading, error, blog } = blogDetails;

//   const userLogin = useSelector((state) => state.userLogin);
//   const { userInfo } = userLogin;

//   const blogReviewCreate = useSelector((state) => state.blogReviewCreate);
//   const { success: successBlogReview, error: errorBlogReview } = blogReviewCreate;

//   useEffect(() => {
//     if (successBlogReview) {
//       alert("Review Submitted");
//       setRating(1);
//       setComment("");
//       dispatch({ type: BLOG_REVIEW_CREATE_RESET });
//     }
//     dispatch(listBlogDetails(id));
//   }, [id, dispatch, successBlogReview]);

//   const submitHandler = (e) => {
//     e.preventDefault();
//     dispatch(createBlogReview(id, { rating, comment }));
//   };

//   const deleteHandler = (id) => {
//     if (window.confirm("Are you sure to delete your blog?")) {
//       dispatch(deleteBlog(id));
//       navigate(`/`);
//     }
//   };

//   return (
//     <div className="max-w-7xl mx-auto py-8 px-4">
//       <button
//         className="bg-teal-600 text-white px-6 py-2 rounded-lg shadow hover:bg-teal-700 mb-6"
//         onClick={() => navigate("/")}
//       >
//         Go Back
//       </button>

//       {loading ? (
//         <Loader />
//       ) : error ? (
//         <Message type="error">{error}</Message>
//       ) : (
//         <>
//           <div className="bg-white shadow-xl rounded-lg overflow-hidden mb-6">
//             <div className="relative">
//               <img
//                 src={blog.image}
//                 alt={blog.title}
//                 className="w-full h-full object-contain"
//               />
//               <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg">
//                 <h1 className="text-3xl font-bold">{blog.title}</h1>
//               </div>
//             </div>

//             <div className="p-6">
//               <p className="text-lg text-gray-800 mb-4">{blog.content}</p>
//               <div className="flex justify-between items-center mb-4">
//                 <p className="text-sm text-gray-600">By {blog.author?.name}</p>
//                 <p className="text-sm text-gray-600">{blog.createdAt}</p>
//               </div>

//               {blog.author?.email === userInfo?.email && (
//                 <div className="flex gap-6 mt-4">
//                   <button
//                     className="flex items-center gap-2 bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600"
//                     onClick={() => navigate(`/editBlog/${id}`)}
//                   >
//                     <FaEdit /> Edit
//                   </button>
//                   <button
//                     className="flex items-center gap-2 bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600"
//                     onClick={() => deleteHandler(blog._id)}
//                   >
//                     <MdDelete /> Delete
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>

//           <div className="bg-white shadow-xl rounded-lg p-6">
//             <h2 className="text-2xl font-semibold mb-6">Comments</h2>
//             {blog.reviews?.length === 0 ? (
//               <Message>No Reviews Yet</Message>
//             ) : (
//               <div className="space-y-6">
//                 {blog.reviews.map((review) => (
//                   <div
//                     key={review._id}
//                     className="bg-gray-100 p-4 rounded-lg shadow-md"
//                   >
//                     <div className="flex justify-between mb-2">
//                       <p className="font-semibold">{review.name}</p>
//                       <Rating value={review.rating} />
//                     </div>
//                     <p className="text-sm">{review.comment}</p>
//                   </div>
//                 ))}
//               </div>
//             )}

//             {userInfo ? (
//               <form onSubmit={submitHandler} className="mt-8">
//                 <div className="mb-6">
//                   <label className="block text-sm text-gray-700 mb-2">Rating</label>
//                   <select
//                     value={rating}
//                     onChange={(e) => setRating(e.target.value)}
//                     className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700"
//                   >
//                     <option value="1">1 - Poor</option>
//                     <option value="2">2 - Fair</option>
//                     <option value="3">3 - Good</option>
//                     <option value="4">4 - Very Good</option>
//                     <option value="5">5 - Excellent</option>
//                   </select>
//                 </div>

//                 <div className="mb-6">
//                   <label className="block text-sm text-gray-700 mb-2">Comment</label>
//                   <textarea
//                     value={comment}
//                     onChange={(e) => setComment(e.target.value)}
//                     className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700"
//                     rows="4"
//                   ></textarea>
//                 </div>

//                 <button
//                   type="submit"
//                   className="bg-teal-600 text-white px-6 py-3 rounded-lg shadow hover:bg-teal-700"
//                 >
//                   Submit Review
//                 </button>
//               </form>
//             ) : (
//               <Message>Please log in to write a review</Message>
//             )}
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default SingleBlogScreen;

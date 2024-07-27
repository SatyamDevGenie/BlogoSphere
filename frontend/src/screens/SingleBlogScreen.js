// import {
//   Box,
//   Button,
//   Flex,
//   FormControl,
//   FormLabel,
//   Grid,
//   Heading,
//   IconButton,
//   Image,
//   Link,
//   Select,
//   Text,
//   Textarea,
// } from "@chakra-ui/react";
// import { useEffect, useState } from "react";
// import { FaEdit } from "react-icons/fa";
// import { MdDelete } from "react-icons/md";
// import { useDispatch, useSelector } from "react-redux";
// import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
// import {
//   createBlogReview,
//   deleteBlog,
//   listBlogDetails,
// } from "../actions/blogActions";
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
//   const [name, setName] = useState("");

//   const blogDetails = useSelector((state) => state.blogDetails);
//   const { loading, error, blog } = blogDetails;

//   const userLogin = useSelector((state) => state.userLogin);
//   const { userInfo } = userLogin;

//   const blogReviewCreate = useSelector((state) => state.blogReviewCreate);
//   const { success: successBlogReview, error: errorBlogReview } =
//     blogReviewCreate;

//   useEffect(() => {
//     if (successBlogReview) {
//       alert("Review Submitted");
//       setRating(1);
//       setComment("");
//       setName("");
//       dispatch({ type: BLOG_REVIEW_CREATE_RESET });
//     }
//     dispatch(listBlogDetails(id));
//   }, [id, dispatch, successBlogReview]);

//   const submitHandler = (e) => {
//     e.preventDefault();
//     dispatch(createBlogReview(id, { rating, comment, name }));
//   };

//   const deleteHandler = (id) => {
//     if (window.confirm("Are you sure to delete your blog?")) {
//       dispatch(deleteBlog(id));
//       navigate(`/`);
//     }
//   };

//   return (
//     <Flex
//       direction="column"
//       alignItems="center"
//       mt={{ base: "4", md: "6" }}
//       px={{ base: "2", md: "4" }}
//     >
//       {/* Go Back Button */}
//       <Button
//         as={RouterLink}
//         to="/"
//         size="sm"
//         colorScheme="teal"
//         border="1px solid #fff"
//         fontFamily="Teko"
//         fontWeight="bold"
//         p={{ base: "6px", md: "22px" }}
//         mb={{ base: "4", md: "6" }}
//         alignSelf="flex-start"
//       >
//         Go Back
//       </Button>

//       {/* BLOG Grid */}

//       {loading ? (
//         <Loader />
//       ) : error ? (
//         <Message type="error">{error}</Message>
//       ) : (
//         <>
//           <Grid
//             templateColumns={{ base: "1fr", md: "1fr" }}
//             gap={{ base: "4", md: "8" }}
//             maxWidth="1200px"
//             width="100%"
//             mt="8"
//             px={{ base: "2", md: "4" }}
//           >
//             {/* BLOG Details */}
//             <Flex direction="column" alignItems="flex-start">
//               {/* BLOG title */}
//               <Heading
//                 as="h2"
//                 fontSize={{ base: "2xl", md: "4xl" }}
//                 mb="4"
//                 fontFamily="sans-serif"
//               >
//                 {blog.title}
//               </Heading>

//               {/* BLOG Image */}

//               <Image
//                 src={blog.image}
//                 alt={blog.title}
//                 borderRadius="15px"
//                 h={{ base: "200px", md: "400px" }}
//                 w="full"
//                 objectFit="cover"
//                 mt="4"
//               />

//               {/* BLOG Description */}
//               <Text
//                 fontSize={{ base: "md", md: "lg" }}
//                 mb="6"
//                 fontFamily="sans-serif"
//                 textAlign="justify"
//                 mt="3"
//               >
//                 {blog.content}
//               </Text>

//               {/* Additional Information */}
//               <Flex
//                 justifyContent="space-between"
//                 direction="column"
//                 gap="5"
//                 w="full"
//               >
//                 <Text
//                   fontSize={{ base: "sm", md: "17px" }}
//                   color="#000"
//                   fontFamily="Arial"
//                 >
//                   Blog Created By &nbsp;: &nbsp;
//                   <b>{blog.author && blog.author.name}</b>
//                 </Text>
//                 <Text
//                   fontSize={{ base: "sm", md: "17px" }}
//                   color="#000"
//                   fontFamily="Arial"
//                 >
//                   <b>Author &nbsp;: &nbsp;</b>
//                   <Link
//                     fontSize={{ base: "sm", md: "17px" }}
//                     href={`mailto:${blog.author && blog.author.email}`}
//                   >
//                     {blog.author && blog.author.email}
//                   </Link>
//                 </Text>

//                 {/* Conditionally render Delete Button */}
//                 <Flex
//                   justifyContent={{
//                     base: "center",
//                     md: "space-between",
//                   }}
//                   direction={{ base: "column", md: "row" }}
//                   gap={{ base: 4, md: 10 }}
//                   w="full"
//                 >
//                   {blog.author && blog.author.email === userInfo?.email ? (
//                     <IconButton
//                       aria-label="Delete"
//                       icon={<MdDelete />}
//                       colorScheme="gray"
//                       w={{ base: "full", md: "300px" }}
//                       h="50px"
//                       _hover={{
//                         textDecor: "none",
//                         bgColor: "red",
//                         fontWeight: "bolder",
//                         shadow: "lg",
//                         transform: "translateX(-10px)",
//                         transition: "all 0.3s ease-in-out",
//                       }}
//                       onClick={() => deleteHandler(blog._id)}
//                     />
//                   ) : (
//                     <Text
//                       fontFamily="Arial Black"
//                       fontWeight="bold"
//                       color="gray"
//                       textAlign="center"
//                     >
//                       Can only be deleted by Author itself
//                     </Text>
//                   )}

//                   {blog.author && blog.author.email === userInfo?.email ? (
//                     <IconButton
//                       aria-label="Edit"
//                       icon={<FaEdit />}
//                       colorScheme="gray"
//                       w={{ base: "full", md: "300px" }}
//                       h="50px"
//                       _hover={{
//                         textDecor: "none",
//                         bgColor: "beige",
//                         fontWeight: "bolder",
//                         shadow: "lg",
//                         transform: "translateY(-10px)",
//                         transition: "all 0.3s ease-in-out",
//                       }}
//                       onClick={() => {
//                         navigate(`/editBlog/${id}`);
//                       }}
//                     />
//                   ) : (
//                     <Text
//                       fontFamily="Arial Black"
//                       fontWeight="bold"
//                       color="gray"
//                       textAlign="center"
//                     >
//                       Can only be edited by Author
//                     </Text>
//                   )}
//                 </Flex>
//               </Flex>
//             </Flex>
//           </Grid>
//           <Box
//             p="10"
//             bgColor="white"
//             rounded="md"
//             mt="10"
//             borderColor="gray.300"
//             w="full"
//           >
//             <Heading as="h3" size="lg" mb="6">
//               Post Comments
//             </Heading>

//             {blog && blog.reviews?.length === 0 && (
//               <Message>No Reviews</Message>
//             )}

//             {blog && blog.reviews?.length !== 0 && (
//               <Box p="4" bgColor="white.900" rounded="md" mb="1" mt="5">
//                 {blog?.reviews?.map((review) => (
//                   <Flex direction="column" key={review._id} mb="5" w="full">
//                     <Flex justifyContent="space-between">
//                       <Text fontSize="lg">
//                         <strong>{review.name}</strong>
//                       </Text>
//                       <Rating value={review.rating} />
//                     </Flex>
//                     <Text mt="2">{review.comment}</Text>
//                   </Flex>
//                 ))}
//               </Box>
//             )}

//             {errorBlogReview && (
//               <Message type="error">{errorBlogReview}</Message>
//             )}

//             {userInfo ? (
//               <form onSubmit={submitHandler}>
//                 <FormControl id="rating" mb="3">
//                   <FormLabel>Rating</FormLabel>
//                   <Select
//                     placeholder="Select Option"
//                     value={rating}
//                     onChange={(e) => setRating(e.target.value)}
//                   >
//                     <option>Select...</option>
//                     <option value="1">1 - Poor</option>
//                     <option value="2">2 - Okay</option>
//                     <option value="3">3 - Good</option>
//                     <option value="4">4 - Very Good</option>
//                     <option value="5">5 - Excellent</option>
//                   </Select>
//                 </FormControl>

//                 <FormControl id="comment" mb="3">
//                   <FormLabel>Comment:</FormLabel>
//                   <Textarea
//                     value={comment}
//                     onChange={(e) => setComment(e.target.value)}
//                   ></Textarea>
//                 </FormControl>

//                 <FormControl id="name" mb="3">
//                   <FormLabel>
//                     Your name: (To verify this is not a Robot 🤖)
//                   </FormLabel>
//                   <Textarea
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                   ></Textarea>
//                 </FormControl>

//                 <Button colorScheme="teal" type="submit">
//                   Post Review
//                 </Button>
//               </form>
//             ) : (
//               <Message>Please login to write a review</Message>
//             )}
//           </Box>
//         </>
//       )}
//     </Flex>
//   );
// };

// export default SingleBlogScreen;

import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
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
    if (window.confirm("Are you sure to delete your blog?")) {
      dispatch(deleteBlog(id));
      navigate(`/`);
    }
  };

  return (
    <div className="flex flex-col items-center mt-4 px-2 md:px-4">
      {/* Go Back Button */}
      <div className="w-full flex justify-start mb-4 md:mb-6">
        <button
          as={RouterLink}
          to="/"
          className="text-teal-500 border border-teal-500 font-bold py-2 px-4 rounded hover:bg-teal-600 hover:text-white transition-colors duration-300"
        >
          Go Back
        </button>
      </div>

      {/* BLOG Grid */}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message type="error">{error}</Message>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 md:gap-8 max-w-4xl w-full mt-8 px-2 md:px-4">
            {/* BLOG Details */}
            <div className="flex flex-col items-start">
              {/* BLOG title */}
              <h2 className="text-2xl md:text-4xl font-sans mb-4">
                {blog.title}
              </h2>

              {/* BLOG Image */}
              <img
                src={blog.image}
                alt={blog.title}
                className="rounded-lg h-48 md:h-96 w-full object-cover mt-4"
              />

              {/* BLOG Description */}
              <p className="text-base md:text-lg mb-6 font-sans text-justify mt-3">
                {blog.content}
              </p>

              {/* Additional Information */}
              <div className="flex flex-col justify-between gap-5 w-full">
                <p className="text-sm md:text-lg text-black font-sans">
                  Blog Created By:{" "}
                  <strong>{blog.author && blog.author.name}</strong>
                </p>
                <p className="text-sm md:text-lg text-black font-sans">
                  <strong>Author:</strong>{" "}
                  <a
                    href={`mailto:${blog.author && blog.author.email}`}
                    className="text-blue-500"
                  >
                    {blog.author && blog.author.email}
                  </a>
                </p>

                {/* Conditionally render Delete Button */}
                <div className="flex flex-col md:flex-row justify-between gap-4 md:gap-10 w-full">
                  {blog.author && blog.author.email === userInfo?.email ? (
                    <button
                      aria-label="Delete"
                      className="bg-gray-200 text-gray-700 rounded-lg px-4 py-2 hover:bg-red-600 hover:text-white transition-all duration-300"
                      onClick={() => deleteHandler(blog._id)}
                    >
                      <MdDelete className="inline-block" />
                    </button>
                  ) : (
                    <p className="font-black text-gray-500 text-center">
                      Can only be deleted by Author itself
                    </p>
                  )}

                  {blog.author && blog.author.email === userInfo?.email ? (
                    <button
                      aria-label="Edit"
                      className="bg-gray-200 text-gray-700 rounded-lg px-4 py-2 hover:bg-beige-600 hover:text-white transition-all duration-300"
                      onClick={() => navigate(`/editBlog/${id}`)}
                    >
                      <FaEdit className="inline-block" />
                    </button>
                  ) : (
                    <p className="font-black text-gray-500 text-center">
                      Can only be edited by Author
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="p-10 bg-white rounded-md mt-10 border border-gray-300 w-full">
            <h3 className="text-lg font-bold mb-6">Post Comments</h3>

            {blog && blog.reviews?.length === 0 && (
              <Message>No Reviews</Message>
            )}

            {blog && blog.reviews?.length !== 0 && (
              <div className="p-4 bg-gray-100 rounded-md mb-1 mt-5">
                {blog.reviews.map((review) => (
                  <div className="flex flex-col mb-5 w-full" key={review._id}>
                    <div className="flex justify-between">
                      <p className="text-lg font-bold">{review.name}</p>
                      <Rating value={review.rating} />
                    </div>
                    <p className="mt-2">{review.comment}</p>
                  </div>
                ))}
              </div>
            )}

            {errorBlogReview && (
              <Message type="error">{errorBlogReview}</Message>
            )}

            {userInfo ? (
              <form onSubmit={submitHandler}>
                <div className="mb-3">
                  <label
                    htmlFor="rating"
                    className="block text-sm font-medium mb-1"
                  >
                    Rating
                  </label>
                  <select
                    id="rating"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    className="border border-gray-300 rounded-md p-2 w-full"
                  >
                    <option value="">Select...</option>
                    <option value="1">1 - Poor</option>
                    <option value="2">2 - Okay</option>
                    <option value="3">3 - Good</option>
                    <option value="4">4 - Very Good</option>
                    <option value="5">5 - Excellent</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label
                    htmlFor="comment"
                    className="block text-sm font-medium mb-1"
                  >
                    Comment
                  </label>
                  <textarea
                    id="comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="border border-gray-300 rounded-md p-2 w-full"
                  />
                </div>

                <div className="mb-3">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-1"
                  >
                    Your name: (To verify this is not a Robot 🤖)
                  </label>
                  <textarea
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border border-gray-300 rounded-md p-2 w-full"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-teal-500 text-white font-bold py-2 px-4 rounded hover:bg-teal-600 transition-colors duration-300"
                >
                  Post Review
                </button>
              </form>
            ) : (
              <Message>Please login to write a review</Message>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default SingleBlogScreen;

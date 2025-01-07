import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Button, Textarea, Select, Input, Box, Image, Text, Flex, VStack, HStack, useToast, Divider } from "@chakra-ui/react";
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
  const toast = useToast();

  const blogDetails = useSelector((state) => state.blogDetails);
  const { loading, error, blog } = blogDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const blogReviewCreate = useSelector((state) => state.blogReviewCreate);
  const { success: successBlogReview, error: errorBlogReview } = blogReviewCreate;

  useEffect(() => {
    if (successBlogReview) {
      toast({
        title: "Review Submitted",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setRating(1);
      setComment("");
      dispatch({ type: BLOG_REVIEW_CREATE_RESET });
    }
    dispatch(listBlogDetails(id));
  }, [id, dispatch, successBlogReview, toast]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createBlogReview(id, { rating, comment}));
  };

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure to delete your blog?")) {
      dispatch(deleteBlog(id));
      navigate(`/`);
    }
  };

  return (
    <Box maxW="6xl" mx="auto" py={6} px={4}>
      <Button
        as={RouterLink}
        to="/"
        colorScheme="teal"
        mb={4}
        size="sm"
      >
        Go Back
      </Button>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message type="error">{error}</Message>
      ) : (
        <>
          <Box shadow="md" borderWidth="1px" borderRadius="lg" p={6} mb={6}>
            <Text fontSize="2xl" fontWeight="bold" mb={4}>{blog.title}</Text>
            <Image
              src={blog.image}
              alt={blog.title}
              borderRadius="lg"
              objectFit="cover"
              w="full"
              h="300px"
              mb={4}
            />
            <Text fontSize="md" color="gray.700" mb={4}>
              {blog.content}
            </Text>
            <Divider my={4} />
            <Text fontSize="sm" color="gray.600" mb={2}>
              <strong>Author:</strong> {blog.author?.name}
            </Text>
            <Text fontSize="sm" color="gray.600">
              <strong>Contact:</strong>{" "}
              <a href={`mailto:${blog.author?.email}`} style={{ color: "#3182ce" }}>
                {blog.author?.email}
              </a>
            </Text>
            <HStack spacing={4} mt={4}>
              {blog.author?.email === userInfo?.email && (
                <>
                  <Button
                    leftIcon={<FaEdit />}
                    colorScheme="yellow"
                    onClick={() => navigate(`/editBlog/${id}`)}
                  >
                    Edit
                  </Button>
                  <Button
                    leftIcon={<MdDelete />}
                    colorScheme="red"
                    onClick={() => deleteHandler(blog._id)}
                  >
                    Delete
                  </Button>
                </>
              )}
            </HStack>
          </Box>

          <Box shadow="md" borderWidth="1px" borderRadius="lg" p={6}>
            <Text fontSize="xl" fontWeight="semibold" mb={4}>
              Post Comments
            </Text>
            {blog.reviews?.length === 0 ? (
              <Message>No Reviews</Message>
            ) : (
              <VStack spacing={4} align="stretch">
                {blog.reviews.map((review) => (
                  <Box key={review._id} bg="gray.100" p={4} borderRadius="md">
                    <Flex justifyContent="space-between" mb={2}>
                      <Text fontWeight="bold">{review.name}</Text>
                      <Rating value={review.rating} />
                    </Flex>
                    <Text>{review.comment}</Text>
                  </Box>
                ))}
              </VStack>
            )}

            {userInfo ? (
              <form onSubmit={submitHandler}>
                <Box mt={6}>
                  <Text fontSize="sm" mb={2}>Rating</Text>
                  <Select
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    placeholder="Select..."
                    mb={4}
                  >
                    <option value="1">1 - Poor</option>
                    <option value="2">2 - Fair</option>
                    <option value="3">3 - Good</option>
                    <option value="4">4 - Very Good</option>
                    <option value="5">5 - Excellent</option>
                  </Select>

                  <Text fontSize="sm" mb={2}>Comment</Text>
                  <Textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    mb={4}
                  />

                  {/* <Text fontSize="sm" mb={2}>Your Name</Text>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    mb={4}
                  /> */}

                  <Button
                    type="submit"
                    colorScheme="teal"
                    w="500px"
                  >
                    Submit Review
                  </Button>
                </Box>
              </form>
            ) : (
              <Message>Please log in to write a review</Message>
            )}
          </Box>
        </>
      )}
    </Box>
  );
};

export default SingleBlogScreen;

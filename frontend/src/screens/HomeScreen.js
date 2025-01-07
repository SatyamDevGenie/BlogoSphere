import { Box, Button, Flex, Grid, Heading, Text, Image } from "@chakra-ui/react";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { listBlogs } from "../actions/blogActions";
import BlogCard from "../components/BlogCard";
import Loader from "../components/Loader";
import Message from "../components/Message";

const HomeScreen = () => {
  const dispatch = useDispatch();

  const blogsList = useSelector((state) => state.blogList);
  const { loading, error, blogs } = blogsList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch(listBlogs());
  }, [dispatch]);

  useEffect(() => {
    if (userInfo) {
      toast.success("Welcome to Blogosphere!", {
        duration: 3000,
        position: "top-center",
      });
    }
  }, [userInfo]);

  const handleCreatePost = () => {
    console.log("Create post clicked");
  };

  const handleLatestPost = () => {
    console.log("Latest Blog clicked");
  };

  return (
    <Box maxW="8xl" mx="auto" px={4} py={6}>
      {/* Hero Section */}
      <Box
        bgGradient="linear(to-r, teal.500, green.500)"
        py={16}
        px={8}
        textAlign="center"
        borderRadius="lg"
        color="white"
      >
        <Heading as="h1" fontSize={{ base: "3xl", md: "4xl" }} mb={4}>
          Welcome to Blogosphere
        </Heading>
        <Text fontSize={{ base: "md", md: "lg" }} maxW="3xl" mx="auto" mb={8}>
          Discover, share, and stay inspired with our collection of featured
          blogs written by passionate authors worldwide.
        </Text>
        <Flex justify="center" gap={4} flexWrap="wrap">
          <Button
            as={RouterLink}
            to="/postBlog"
            size="lg"
            colorScheme="whiteAlpha"
            onClick={handleCreatePost}
            leftIcon={<i className="fas fa-pen"></i>}
            _hover={{ bg: "white", color: "teal.500" }}
          >
            Create Post
          </Button>
          <Button
            as={RouterLink}
            to="/latestBlogs"
            size="lg"
            colorScheme="whiteAlpha"
            onClick={handleLatestPost}
            leftIcon={<i className="fas fa-blog"></i>}
            _hover={{ bg: "white", color: "teal.500" }}
          >
            Latest Blogs
          </Button>
        </Flex>
      </Box>

      {/* Blog Cards Section */}
      <Box mt={12}>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message type="error">{error}</Message>
        ) : (
          <Grid
            templateColumns={{
              base: "1fr",
              md: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)",
            }}
            gap={8}
          >
            {blogs.map((blog) => (
              <Box
                key={blog._id}
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                transition="transform 0.2s"
                _hover={{ transform: "scale(1.05)", shadow: "lg" }}
              >
                <BlogCard blog={blog} />
              </Box>
            ))}
          </Grid>
        )}
      </Box>

    </Box>
  );
};

export default HomeScreen;

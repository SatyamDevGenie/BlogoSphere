import { Box, Button, Flex, Grid, Heading } from "@chakra-ui/react";
import { useEffect } from "react";
import { toast } from "react-hot-toast"; // Correct import
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
    <>
      <Flex
        justify="space-between"
        align="center"
        mb="10"
        mt="6"
        direction="column"
      >
        <Heading as="h2" fontSize="2xl" fontFamily="sans-serif" mb={4}>
          All Blogs
        </Heading>
        <Flex justifyContent="space-between" w="full">
          <Button
            as={RouterLink}
            to="/postBlog"
            colorScheme="teal"
            size="lg"
            fontWeight="bold"
            onClick={handleCreatePost}
            mr={2}
            _hover={{ bg: "green.600" }}
            w={{ base: "48%", md: "auto" }}
          >
            Create Post
          </Button>
          <Button
            as={RouterLink}
            to="/latestBlogs"
            colorScheme="teal"
            size="lg"
            fontWeight="bold"
            onClick={handleLatestPost}
            _hover={{ bg: "green.600" }}
            w={{ base: "48%", md: "auto" }}
          >
            Latest Blogs
          </Button>
        </Flex>
      </Flex>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message type="error">{error}</Message>
      ) : (
        <Box mt={12}>
          <Grid
            templateColumns={{
              base: "1fr",
              md: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)",
            }}
            gap={6}
          >
            {blogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </Grid>
        </Box>
      )}
    </>
  );
};

export default HomeScreen;

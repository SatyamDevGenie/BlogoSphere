import { Box, Button, Flex, Grid, Heading, Text } from "@chakra-ui/react";
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
    <Box maxW="8xl" mx="auto" px={4}>
      <Flex
        justify="center"
        align="center"
        direction="column"
        mb={10}
        mt={6}
        textAlign="center"
      >
        <Heading
          as="h2"
          fontSize={{ base: "2xl", md: "3xl" }}
          fontFamily="heading"
          mb={4}
          color="gray.800"
        >
          Discover the Latest Trends in Blogging
        </Heading>
        <Text
          fontSize={{ base: "md", md: "lg" }}
          color="gray.500"
          mb={8}
          maxW="3xl"
        >
          Explore our featured blogs, get inspired, and share your thoughts with
          the world.
        </Text>
        <Flex justify="center" w="full" direction={{ base: "column", md: "row" }}>
          <Button
            as={RouterLink}
            to="/postBlog"
            colorScheme="teal"
            size="lg"
            fontWeight="bold"
            onClick={handleCreatePost}
            mb={{ base: 4, md: 0 }}
            mr={{ md: 4 }}
            _hover={{ bg: "green.600" }}
            w={{ base: "100%", md: "auto" }}
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
            w={{ base: "100%", md: "auto" }}
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
    </Box>
  );
};

export default HomeScreen;

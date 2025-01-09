import { Box, Button, Flex, Grid, Heading, Input, Stack, Text, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { listBlogs } from "../actions/blogActions";
import BlogCard from "../components/BlogCard";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { SearchIcon } from "@chakra-ui/icons"; // Import SearchIcon

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

  return (
    <Box maxW="8xl" mx="auto" px={4} py={6}>
      {/* Hero Section */}
      <Box
        textAlign="center"
        py={{ base: 8, md: 12 }}
        px={4}
        color="gray.800"
      >
        <Heading
          as="h3"
          fontSize={{ base: "2xl", sm: "3xl", md: "5xl" }}
          mb={4}
        >
          Welcome to Blogosphere
        </Heading>
        <Text
          fontSize={{ base: "md", sm: "lg", md: "xl" }}
          maxW="2xl"
          mx="auto"
          mb={6}
        >
          Discover inspiring content from passionate bloggers around the world. Share your thoughts and connect with a vibrant community
        </Text>
        <Flex
          direction={{ base: "column", md: "row" }}
          gap={4}
          justify="center"
          align="center"
        >
          <Button
            as={RouterLink}
            to="/postBlog"
            size="lg"
            colorScheme="teal"
            variant="solid"
            w={{ base: "full", sm: "auto" }}
          >
            Create Post
          </Button>
          <Button
            as={RouterLink}
            to="/latestBlogs"
            size="lg"
            colorScheme="teal"
            variant="outline"
            w={{ base: "full", sm: "auto" }}
          >
            Latest Blogs
          </Button>
        </Flex>
      </Box>

      {/* Search */}
      <Box mt={8}>
        <Stack
          direction={{ base: "column", sm: "row" }}
          align="center"
          justify="center"
          spacing={4}
        >
          <InputGroup w={{ base: "full", sm: "md" }}>
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.500" />
            </InputLeftElement>
            <Input
              placeholder="Search blogs..."
              size="lg"
              variant="filled"
              bg="gray.100"
              _hover={{ bg: "white" }}
            />
          </InputGroup>
        </Stack>
      </Box>

      {/* Blog Cards Section */}
      <Box mt={12}>
        <Heading as="h2" fontSize={{ base: "xl", md: "2xl" }} mb={4}>
          All Blogs
        </Heading>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message type="error">{error}</Message>
        ) : (
          <Grid
            templateColumns={{
              base: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
            }}
            gap={6}
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

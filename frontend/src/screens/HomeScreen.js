import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Input,
  Stack,
  Text,
  InputGroup,
  InputRightElement,
  Container,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { listBlogs } from "../actions/blogActions";
import BlogCard from "../components/BlogCard";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { SearchIcon } from "@chakra-ui/icons";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

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

  // Filter blogs based on search input
  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box maxW="8xl" mx="auto" px={4} py={6}>
      {/* Hero Section */}
      <Box
        textAlign="center"
        py={{ base: 10, md: 16 }}
        px={4}
        color="black"
        borderRadius="lg"
        shadow="lg"
      >
        <Heading
          as="h3"
          fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
          fontWeight="bold"
          mb={4}
        >
          Experience our Blogosphere Platform
        </Heading>
        <Text
          fontSize={{ base: "md", sm: "lg", md: "1xl" }}
          maxW="2xl"
          mx="auto"
          mb={6}
        >
          Discover inspiring content from passionate bloggers around the world.
          Share your thoughts and connect with a vibrant community.
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
            _hover={{ bg: "blue.400" }}
            w={{ base: "full", sm: "auto" }}
          >
            Create Post
          </Button>
          <Button
            as={RouterLink}
            to="/latestBlogs"
            size="lg"
            colorScheme="teal"
            variant="solid"
            _hover={{ bg: "blue.400" }}
            w={{ base: "full", sm: "auto" }}
          >
            Latest Blogs
          </Button>
        </Flex>
      </Box>

      {/* Blog Cards Section */}
      <Box mt={12}>
        <Heading
          as="h2"
          fontSize={{ base: "xl", md: "2xl" }}
          textAlign="center"
          mb={8}
          py={8}
        >
          Explore our Blogs
        </Heading>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message type="error">{error}</Message>
        ) : filteredBlogs.length > 0 ? (
          <Grid
            templateColumns={{
              base: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "repeat(2, 1fr)",
            }}
            gap={6}
          >
            {filteredBlogs.map((blog) => (
              <Box
                key={blog._id}
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                transition="transform 0.3s"
                _hover={{ transform: "scale(1.05)", shadow: "2xl" }}
                shadow="md"
                bg="white"
              >
                <BlogCard blog={blog} />
              </Box>
            ))}
          </Grid>
        ) : (
          <Text fontSize="xl" color="gray.600" textAlign="center">
            No blogs found matching your search.
          </Text>
        )}
      </Box>
    </Box>
  );
};

export default HomeScreen;

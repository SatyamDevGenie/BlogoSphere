import { Button, Flex, Grid, Heading } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { listBlogs } from "../actions/blogActions";
import BlogCard from "../components/BlogCard";
import Loader from "../components/Loader";
import Message from "../components/Message";

const LatestBlogsScreen = () => {
  const dispatch = useDispatch();

  const blogsList = useSelector((state) => state.blogList);
  const { loading, error, blogs } = blogsList;

  useEffect(() => {
    dispatch(listBlogs());
    // Show welcome message when component mounts
    // toast.success("Welcome to Blogosphere!");
  }, [dispatch]);

  return (
    <>
      <Flex
        as="h2"
        mb="10"
        fontSize="15px"
        mt="4"
        fontFamily="Arial "
        direction="column"
        gap="5"
      >
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
        <Heading>Latest Blogs</Heading>
      </Flex>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message type="error">{error}</Message>
      ) : (
        <Grid
          templateColumns={{
            sm: "1fr",
            md: "1fr 1fr",
            lg: "1fr 1fr 1fr",
            xl: "1fr 1fr 1fr ",
          }}
          gap="12"
          mt="8"
        >
          {blogs
            .slice()
            .reverse()
            .map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
        </Grid>
      )}
    </>
  );
};

export default LatestBlogsScreen;

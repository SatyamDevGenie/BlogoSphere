import { Button, Flex, Grid, Heading, Image, Text } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link as RouterLink, useParams } from "react-router-dom";

const SingleBlogScreen = () => {
  const { id } = useParams();

  const [blog, setBlog] = useState({});

  useEffect(() => {
    const fetchBlog = async () => {
      const { data } = await axios.get(`/api/blogs/${id}`);
      setBlog(data);
    };
    fetchBlog();
  }, [id]);

  return (
    <Flex direction="column" alignItems="center" mt="6">
      {/* Go Back Button */}
      <Button
        as={RouterLink}
        to="/"
        colorScheme="blue"
        size="sm"
        mb="4"
        alignSelf="flex-start"
      >
        Go Back
      </Button>

      {/* Product Grid */}
      <Grid
        templateColumns={{ sm: "1fr", md: "3fr 1fr" }}
        gap={{ base: "4", md: "8" }}
        maxWidth="1200px"
        width="100%"
      >
        {/* Product Image */}
        <Image
          src={blog.image}
          alt={blog.name}
          borderRadius="md"
          maxH="400px"
          w="full"
        />

        {/* Product Details */}
        <Flex direction="column" alignItems="flex-start">
          {/* Product Name */}
          <Heading as="h2" fontSize="4xl" mb="4">
            {blog.name}
          </Heading>

          {/* Product Description */}
          <Text fontSize="lg" mb="6">
            {blog.description}
          </Text>

          {/* Additional Information */}
          <Flex direction="column" alignItems="flex-start">
            {/* Author */}
            <Text fontSize="lg" mb="2">
              <strong>Author:</strong> {blog.author}
            </Text>
          </Flex>
        </Flex>
      </Grid>
    </Flex>
  );
};

export default SingleBlogScreen;

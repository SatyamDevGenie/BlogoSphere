import { Box, Flex, Heading, IconButton, Image, Link } from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";
import { Link as RouterLink } from "react-router-dom";

const BlogCard = ({ blog }) => {
  // // Pass onDelete function as a prop
  // const handleDelete = () => {
  //   // Call onDelete function with the blog id or any necessary identifier for deletion
  //   onDelete(); // Assuming blog._id is the identifier
  // };

  return (
    <Box
      borderRadius="lg"
      _hover={{
        shadow: "lg",
        transform: "translateY(-10px)",
        transition: "all 0.3s ease-in-out",
      }}
    >
      <Image
        src={blog.image}
        alt={blog.name}
        w="full"
        h="222px"
        objectFit="cover"
        borderTopLeftRadius="lg"
        borderTopRightRadius="lg"
      />
      <Flex py="5" px="4" direction="column" justifyContent="space-between">
        <Flex alignItems="center" justifyContent="space-between">
          <Heading as="h4" fontSize="lg" mb="3">
            {blog.name}
          </Heading>
          {/* Delete Button */}
          <IconButton
            aria-label="Delete"
            icon={<MdDelete />}
            // onClick={handleDelete}
            colorScheme="gray"
          />
        </Flex>
        <Link
          as={RouterLink}
          to={`/blog/${blog._id}`}
          fontFamily="Verdana"
          _hover={{
            textDecor: "none",
            color: "Red",
            fontWeight: "bolder",
          }}
        >
          Read More
        </Link>
      </Flex>
    </Box>
  );
};

export default BlogCard;

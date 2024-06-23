import {
  Box,
  Flex,
  Heading,
  IconButton,
  Image,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import { IoEyeOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";

const BlogCard = ({ blog }) => {
  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const randomNumber = getRandomInt(1, 50);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <Link
      as={RouterLink}
      to={`/blogs/${blog._id}`}
      _hover={{
        textDecoration: "none",
      }}
    >
      <Box
        borderRadius="md"
        overflow="hidden"
        bgColor="white"
        boxShadow="md"
        _hover={{
          boxShadow: "xl",
          transform: "translateY(-5px)",
          transition: "all 0.3s ease-in-out",
        }}
        transition="all 0.3s ease-in-out"
      >
        <Image
          src={blog.image}
          alt={blog.title}
          w="full"
          h="200px"
          objectFit="cover"
        />
        <VStack spacing={4} p={4} align="stretch">
          <Heading as="h4" fontSize="lg" fontFamily="sans-serif">
            {blog.title}
          </Heading>
          <Flex justifyContent="space-between" alignItems="center">
            <Flex alignItems="center" gap={2}>
              <IconButton
                aria-label="View"
                icon={<IoEyeOutline />}
                size="sm"
                variant="ghost"
              />
              <Text fontSize="sm">{randomNumber}</Text>
            </Flex>
          </Flex>
        </VStack>
      </Box>
    </Link>
  );
};

export default BlogCard;

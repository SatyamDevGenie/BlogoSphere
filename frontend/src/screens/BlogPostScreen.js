import React, { useState, useEffect } from "react";
import {
  Heading,
  Flex,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Spacer,
  Button,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  BLOG_CREATE_RESET,
  BLOG_CREATE_SUCCESS,
} from "../constants/blogConstants";
import { createBlog, listBlogs } from "../actions/blogActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

const BlogPostScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const blogsList = useSelector((state) => state.blogList);
  const { loading, error } = blogsList;

  const blogCreate = useSelector((state) => state.blogCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    blog: createdBlog,
  } = blogCreate;

  useEffect(() => {
    dispatch({ type: BLOG_CREATE_RESET });

    if (!userInfo) {
      navigate("/login");
    }

    if (successCreate) {
      dispatch({ type: BLOG_CREATE_SUCCESS });
      navigate("/");
    } else {
      dispatch(listBlogs());
      console.log("bye");
    }
  }, [dispatch, navigate, userInfo, successCreate, createdBlog]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createBlog({ title, content, image }));
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post(`/api/uploads`, formData, config);
      setImage(data);
    } catch (err) {
      console.error(err);
      console.log(err);
    }
  };

  return (
    <>
      {loadingCreate && <Loader />}
      {errorCreate && <Message type="error">{errorCreate}</Message>}
      <Heading
        as="h1"
        mb="8"
        fontSize="4xl"
        py="4"
        mt="15px"
        textAlign="center"
      >
        Create Your Blog
      </Heading>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message type="error">{error}</Message>
      ) : (
        <Flex w="full" justifyContent="center" py="5">
          <form onSubmit={submitHandler}>
            {/* TITLE */}
            <FormControl id="title" isRequired>
              <FormLabel>Title</FormLabel>
              <Input
                type="text"
                placeholder="Enter Blog title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </FormControl>
            <Spacer h="3" />

            {/* CONTENT */}
            <FormControl id="content" isRequired>
              <FormLabel>Content</FormLabel>
              <Input
                type="text"
                placeholder="Enter Blog content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </FormControl>
            <Spacer h="3" />

            {/* IMAGE */}
            <FormControl id="image" isRequired>
              <FormLabel>Image</FormLabel>
              <Input
                type="text"
                placeholder="Enter image url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
              <Input type="file" onChange={uploadFileHandler} />
            </FormControl>
            <Divider />

            <Button type="submit" colorScheme="teal" mt="4">
              Upload
            </Button>
          </form>
        </Flex>
      )}
    </>
  );
};

export default BlogPostScreen;

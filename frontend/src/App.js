import { Flex } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import BlogPostScreen from "./screens/BlogPostScreen";
import EditBlogScreen from "./screens/EditBlogScreen";
import HomeScreen from "./screens/HomeScreen";
import LatestBlogsScreen from "./screens/LatestBlogsScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import SingleBlogScreen from "./screens/SingleBlogScreen";
import TrendingBlogsScreen from "./screens/TrendingBlogsScreen";
import UserProfileScreen from "./screens/UserProfileScreen";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Flex as="main" mt="72px" direction="column" py="6" px="6" bgColor="#fff">
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/blogs/:id" element={<SingleBlogScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/userProfile" element={<UserProfileScreen />} />
          <Route path="/postBlog" element={<BlogPostScreen />} />
          <Route path="/editBlog" element={<EditBlogScreen />} />
          <Route path="/trendingBlogs" element={<TrendingBlogsScreen />} />
          <Route path="/latestBlogs" element={<LatestBlogsScreen />} />
        </Routes>
      </Flex>
      <Footer />
    </BrowserRouter>
  );
};

export default App;

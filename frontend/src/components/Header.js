// import {
//   Box,
//   Button,
//   Flex,
//   Heading,
//   Icon,
//   Link,
//   Menu,
//   MenuButton,
//   MenuItem,
//   MenuList,
//   Text,
// } from "@chakra-ui/react";
// import { useState } from "react";
// import { FaCircleChevronDown } from "react-icons/fa6";
// import { HiOutlineMenuAlt3, HiTrendingUp } from "react-icons/hi";
// import { RiLoginCircleFill } from "react-icons/ri";
// import { useDispatch, useSelector } from "react-redux";
// import { Link as RouterLink, useNavigate } from "react-router-dom";
// import { logout } from "../actions/userActions";
// import HeaderMenuItem from "./HeaderMenuItem";

// const Header = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [show, setShow] = useState(false);

//   const userLogin = useSelector((state) => state.userLogin);
//   const { userInfo } = userLogin;

//   const logoutHandler = () => {
//     dispatch(logout());
//     navigate("/login");
//   };

//   return (
//     <Flex
//       as="header"
//       align="center"
//       justifyContent="space-between"
//       wrap="wrap"
//       py="6"
//       px="6"
//       bgColor="teal.700"
//       w="100%"
//       pos="fixed"
//       top="0"
//       left="0"
//       zIndex="9999"
//       shadow="lg"
//     >
//       <Link as={RouterLink} to="/" style={{ textDecoration: "none" }}>
//         <Heading
//           as="h1"
//           color="#fff"
//           fontWeight="bold"
//           fontSize="30px"
//           letterSpacing="wide"
//           fontFamily="M PLUS Rounded 1c"
//           _hover={{ textDecor: "none" }}
//         >
//           Blogosphere
//         </Heading>
//       </Link>

//       <Box
//         display={{ base: "block", md: "none" }}
//         onClick={() => setShow(!show)}
//       >
//         <Icon
//           as={HiOutlineMenuAlt3}
//           color="#fff"
//           fontWeight="bold"
//           w="6"
//           h="6"
//         />
//       </Box>

//       <Box
//         display={{ base: show ? "block" : "none", md: "flex" }}
//         width={{ base: "full", md: "auto" }}
//         mt={{ base: "3", md: "0" }}
//       >
//         <HeaderMenuItem
//           url="/trendingBlogs"
//           label="Trending"
//           icon={<Icon as={HiTrendingUp} mr="1" w="6" h="6" color="wheat" />}
//         />

//         {userInfo ? (
//           <Menu>
//             <MenuButton
//               as={Button}
//               rightIcon={<FaCircleChevronDown />}
//               _hover={{ textDecor: "none", opacity: "0.8" }}
//             >
//               <Text fontFamily="sans-serif" fontWeight="bold">
//                 {userInfo.name}
//               </Text>
//             </MenuButton>
//             <MenuList>
//               <MenuItem as={RouterLink} to="/userProfile">
//                 <Text fontFamily="sans-serif" fontWeight="bold">
//                   Profile
//                 </Text>
//               </MenuItem>
//               <MenuItem onClick={logoutHandler}>
//                 {" "}
//                 <Text fontFamily="sans-serif" fontWeight="bold">
//                   Logout
//                 </Text>
//               </MenuItem>
//             </MenuList>
//           </Menu>
//         ) : (
//           <HeaderMenuItem
//             url="/login"
//             label="Login"
//             icon={
//               <Icon as={RiLoginCircleFill} mr="1" w="6" h="6" color="wheat" />
//             }
//           />
//         )}
//       </Box>
//     </Flex>
//   );
// };

// export default Header;

import { useState } from "react";
import { FaCircleChevronDown } from "react-icons/fa6";
import { HiOutlineMenuAlt3, HiTrendingUp } from "react-icons/hi";
import { RiLoginCircleFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { logout } from "../actions/userActions";
import HeaderMenuItem from "./HeaderMenuItem";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <header className="flex items-center justify-between p-6 bg-teal-700 text-white shadow-lg fixed top-0 left-0 w-full z-50">
      <RouterLink
        to="/"
        className="text-3xl font-bold tracking-wide text-white"
      >
        Blogosphere
      </RouterLink>

      <div className="md:hidden" onClick={() => setShow(!show)}>
        <HiOutlineMenuAlt3 className="w-8 h-8" />
      </div>

      <nav
        className={`${
          show ? "block" : "hidden"
        } md:flex md:items-center space-x-4 md:space-x-8 transition-all duration-300`}
      >
        <HeaderMenuItem
          url="/trendingBlogs"
          label="Trending"
          icon={<HiTrendingUp className="w-6 h-6 text-wheat" />}
        />

        {userInfo ? (
          <div className="relative">
            <button className="flex items-center space-x-2 bg-teal-800 px-3 py-2 rounded-md hover:bg-teal-600 transition-all duration-300">
              <span className="font-semibold">{userInfo.name}</span>
              <FaCircleChevronDown />
            </button>
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20">
              <RouterLink
                to="/userProfile"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Profile
              </RouterLink>
              <button
                onClick={logoutHandler}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <HeaderMenuItem
            url="/login"
            label="Login"
            icon={<RiLoginCircleFill className="w-6 h-6 text-wheat" />}
          />
        )}
      </nav>
    </header>
  );
};

export default Header;

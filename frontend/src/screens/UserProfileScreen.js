// import {
//   Button,
//   Flex,
//   FormControl,
//   FormLabel,
//   Grid,
//   Heading,
//   Input,
//   Spacer,
// } from "@chakra-ui/react";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { getUserDetails, updateUserProfile } from "../actions/userActions";
// import FormContainer from "../components/FormContainer";
// import Message from "../components/Message";
// import { USER_DETAILS_RESET } from "../constants/userConstants";

// const ProfileScreen = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [message, setMessage] = useState("");

//   const userDetails = useSelector((state) => state.userDetails);
//   const { loading, error, user } = userDetails;

//   const userLogin = useSelector((state) => state.userLogin);
//   const { userInfo } = userLogin;

//   const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
//   const { success } = userUpdateProfile;

//   useEffect(() => {
//     if (!userInfo) {
//       navigate("/login");
//     } else {
//       if (!user.name) {
//         dispatch(getUserDetails());
//       } else {
//         setName(user.name);
//         setEmail(user.email);
//       }
//     }
//   }, [user, dispatch, navigate, userInfo, success]);

//   const submitHandler = (e) => {
//     e.preventDefault();

//     if (password !== confirmPassword) {
//       setMessage("Passwords do not match");
//     } else {
//       dispatch(updateUserProfile({ id: user._id, name, email, password }));
//       dispatch({ type: USER_DETAILS_RESET });
//     }
//   };

//   return (
//     <Grid templateColumns={{ sm: "1fr" }} py="5" px="5" gap="10" mt="5">
//       <Flex w="full" alignItems="center" justifyContent="center" py="5">
//         <FormContainer>
//           <Heading as="h1" mb="8" fontSize="4xl">
//             Update Profile
//           </Heading>

//           {error && <Message type="error">{error}</Message>}
//           {message && <Message type="error">{message}</Message>}

//           <form onSubmit={submitHandler}>
//             <FormControl id="name">
//               <FormLabel htmlFor="name">Your Name</FormLabel>
//               <Input
//                 id="name"
//                 type="text"
//                 placeholder="Your full name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//               />
//             </FormControl>

//             <Spacer h="3" />

//             <FormControl id="email">
//               <FormLabel htmlFor="email">Email address</FormLabel>
//               <Input
//                 id="email"
//                 type="email"
//                 placeholder="username@domain.com"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </FormControl>

//             <Spacer h="3" />

//             <FormControl id="password">
//               <FormLabel htmlFor="password">Password</FormLabel>
//               <Input
//                 id="password"
//                 type="password"
//                 placeholder="************"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </FormControl>

//             <Spacer h="3" />

//             <FormControl id="confirmPassword">
//               <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
//               <Input
//                 id="confirmPassword"
//                 type="password"
//                 placeholder="************"
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//               />
//             </FormControl>

//             <Button type="submit" colorScheme="teal" mt="4" isLoading={loading}>
//               Update
//             </Button>
//           </form>
//         </FormContainer>
//       </Flex>
//     </Grid>
//   );
// };

// export default ProfileScreen;

import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Spacer,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import FormContainer from "../components/FormContainer";
import Message from "../components/Message";
import { USER_DETAILS_RESET } from "../constants/userConstants";

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      if (!user.name) {
        dispatch(getUserDetails());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [user, dispatch, navigate, userInfo, success]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }));
      dispatch({ type: USER_DETAILS_RESET });
    }
  };

  return (
    <Flex alignItems="center" justifyContent="center" py="5" mt="8">
      <FormContainer>
        <Heading as="h1" mb="8" fontSize="4xl">
          Update Profile
        </Heading>

        {error && <Message type="error">{error}</Message>}
        {message && <Message type="error">{message}</Message>}

        <form onSubmit={submitHandler}>
          <FormControl id="name">
            <FormLabel htmlFor="name">Your Name</FormLabel>
            <Input
              id="name"
              type="text"
              placeholder="Your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>

          <Spacer h="3" />

          <FormControl id="email">
            <FormLabel htmlFor="email">Email address</FormLabel>
            <Input
              id="email"
              type="email"
              placeholder="username@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>

          <Spacer h="3" />

          <FormControl id="password">
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              id="password"
              type="password"
              placeholder="************"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>

          <Spacer h="3" />

          <FormControl id="confirmPassword">
            <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="************"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </FormControl>

          <Button
            type="submit"
            colorScheme="teal"
            mt="4"
            isLoading={loading}
            w="full"
          >
            Update
          </Button>
        </form>
      </FormContainer>
    </Flex>
  );
};

export default ProfileScreen;

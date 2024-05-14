import { Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const HeaderMenuItem = ({ url, label, icon }) => {
  return (
    <Link
      as={RouterLink}
      to={url}
      fontSize="18px"
      letterSpacing="wide"
      textTransform="capitalize"
      mr="5"
      display="flex"
      alignItems="center"
      color="#000"
      fontWeight="bold"
      fontFamily=" M PLUS Rounded 1c"
      mb={{ base: "2", md: 0 }}
      _hover={{
        textDecor: "none",
        transition: "all 0.3s ease-in-out",
        transform: "translateY(-2px)",
      }}
    >
      {icon}
      {label}
    </Link>
  );
};

export default HeaderMenuItem;

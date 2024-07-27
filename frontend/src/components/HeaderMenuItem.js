// import { Link } from "@chakra-ui/react";
// import { Link as RouterLink } from "react-router-dom";

// const HeaderMenuItem = ({ url, label, icon }) => {
//   return (
//     <Link
//       as={RouterLink}
//       to={url}
//       fontSize="16px"
//       letterSpacing="wide"
//       textTransform="capitalize"
//       mr="5"
//       display="flex"
//       alignItems="center"
//       color="whitesmoke"
//       fontWeight="bold"
//       // fontFamily=" M PLUS Rounded 1c"
//       fontFamily="sans-serif"
//       mb={{ base: "2", md: 0 }}
//       _hover={{
//         textDecor: "none",
//         transition: "all 0.3s ease-in-out",
//         transform: "translateY(-2px)",
//       }}
//     >
//       {icon}
//       {label}
//     </Link>
//   );
// };

// export default HeaderMenuItem;

import PropTypes from "prop-types";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

const HeaderMenuItem = ({ url, label, icon, ...props }) => {
  return (
    <RouterLink
      to={url}
      className="
        text-white
        text-sm
        font-bold
        flex
        items-center
        space-x-2
        hover:translate-y-[-2px]
        transition-transform
        duration-300
        ease-in-out
        mr-5
        mb-2
        md:mb-0
        uppercase
        tracking-wide
        font-sans
      "
      {...props}
    >
      {icon && <span className="mr-2">{icon}</span>}
      <span>{label}</span>
    </RouterLink>
  );
};

HeaderMenuItem.propTypes = {
  url: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  icon: PropTypes.element,
};

export default HeaderMenuItem;

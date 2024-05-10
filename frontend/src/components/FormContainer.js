import { Flex } from "@chakra-ui/react";

const FormContainer = ({ children, width = "xl" }) => {
  return (
    <Flex
      direction="column"
      boxShadow="lg"
      rounded="lg"
      bgColor="white"
      // border="15px solid whitesmoke"

      p="10"
      width={width}
    >
      {children}
    </Flex>
  );
};

export default FormContainer;

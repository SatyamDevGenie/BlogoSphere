import { Flex } from "@chakra-ui/react";

const FormContainer = ({ children, width = "lg" }) => {
  return (
    <Flex
      direction="column"
      boxShadow="lg"
      rounded="lg"
      bgColor="white"
      border="1px solid cyan"
      p="10"
      width={width}
    >
      {children}
    </Flex>
  );
};

export default FormContainer;

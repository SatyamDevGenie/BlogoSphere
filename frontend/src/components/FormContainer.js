import { Flex } from "@chakra-ui/react";

const FormContainer = ({ children, width = "xl" }) => {
  return (
    <Flex
      direction="column"
      boxShadow="lg"
      rounded="md"
      bgColor="white"
      border="1px solid wheat"
      p="10"
      width={width}
    >
      {children}
    </Flex>
  );
};

export default FormContainer;

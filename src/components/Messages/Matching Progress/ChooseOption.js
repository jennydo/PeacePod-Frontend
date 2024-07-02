import { Button, Heading, VStack } from "@chakra-ui/react";
import React from "react";

const ChooseOption = ({ option, setOption }) => {
    console.log("Current option", option);
  return (
    <>
      <Heading>Choose your matching option 🤗</Heading>
      <VStack>
        <Button
          _hover={{ background: "#FFD6FF" }}
          bg={option === 1 ? "#FFD6FF" : "#FFAFCC"}
          h={100}
          w="100%"
          onClick={() => setOption(1)}
        >
          Match based on profile{" "}
        </Button>
        <Button
          _hover={{ background: "#FFD6FF" }}
          bg={option === 2 ? "#FFD6FF" : "#FFAFCC"}
          h={100}
          w="100%"
          onClick={() => setOption(2)}
        >
          Fill in a survey for better match{" "}
        </Button>
      </VStack>
    </>
  );
};

export default ChooseOption;

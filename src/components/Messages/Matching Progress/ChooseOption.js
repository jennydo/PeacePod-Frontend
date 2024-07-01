import { Button, ButtonGroup, Heading, VStack } from "@chakra-ui/react";
import React from "react";

const ChooseOption = ({ option, setOption }) => {
    console.log("Current option", option)
  return (
    <>
      <Heading>Choose your matching option 🤗</Heading>
      <VStack>
        <Button
          w="100%"
          h={100}
          bg={option === 1 ? "#FFD6FF" : "#FFAFCC"}
          _hover={{ background: "#FFD6FF" }}
          onClick={() => setOption(1)}
        >
          Match based on profile{" "}
        </Button>
        <Button
          w="100%"
          h={100}
          bg={option === 2 ? "#FFD6FF" : "#FFAFCC"}
          _hover={{ background: "#FFD6FF" }}
          onClick={() => setOption(2)}
        >
          Fill in a survey for better match{" "}
        </Button>
      </VStack>
    </>
  );
};

export default ChooseOption;

import { Button, Heading, VStack, Text, IconButton } from "@chakra-ui/react";
import React from "react";
import { MdOutlineDone } from "react-icons/md";

const Congratulations = () => {
  return (
    <>
      <Heading>Congratulations! See you at 21:00 🎉</Heading>
      <IconButton
        aria-label="Completed"
        icon={<MdOutlineDone />}
        isRound={true}
        fontSize={200}
        w={'max-content'}
        h={'max-content'}
        _hover={{background: 'green.100'}}
        sx={{
            background: 'green.100'
        }}
      />
    </>
  );
};

export default Congratulations;

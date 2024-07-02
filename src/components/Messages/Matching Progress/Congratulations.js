import { Heading, IconButton } from "@chakra-ui/react";
import React from "react";
import { MdOutlineDone } from "react-icons/md";

const Congratulations = () => {
  return (
    <>
      <Heading>Congratulations! See you at 21:00 🎉</Heading>
      <IconButton
        _hover={{background: 'green.100'}}
        aria-label="Completed"
        fontSize={200}
        h="max-content"
        icon={<MdOutlineDone />}
        isRound={true}
        sx={{
            background: 'green.100'
        }}
        w="max-content"
      />
    </>
  );
};

export default Congratulations;

import React, { useContext, useState } from "react";
import { colors } from "../backgroundColorConstants";
import { Box, Center, Grid, GridItem } from "@chakra-ui/react";
import { CloudinaryContext } from "../../../context/CloudinaryContext";

const BackgroundColorList = () => {
  // eslint-disable-next-line no-unused-vars
  const [chosenColor, setChosenColor] = useState();

  const { displayedImage, dispatch } = useContext(CloudinaryContext);

  const handleChooseColor = (color) => {
    setChosenColor(color);
    dispatch({ type: 'DISPLAY_IMAGE', payload: color});
  };

  return (
    <Box h="100%" objectFit={true} overflowY="auto"
w="100%">
      <Grid gap={1} gridTemplateColumns="50% 50%" maxW="98%">
        {colors &&
          colors.map((color, idx) => (
            <GridItem
              // eslint-disable-next-line react/no-array-index-key
              key={idx}
              alignItems="center"
              display="flex"
              justifyContent="center"
            >
              <Center
                bg={color}
                border={displayedImage && color == displayedImage ? "3px solid red" : "none"}
                borderRadius={10}
                h={140}
                w={140}
                onClick={() => handleChooseColor(color)}
               />
            </GridItem>
          ))}
      </Grid>
    </Box>
  );
};

export default BackgroundColorList;

import React, { useContext, useState } from "react";
import { colors } from "../backgroundColorConstants";
import { Box, Card, Center, Grid, GridItem } from "@chakra-ui/react";
import { CloudinaryContext } from "../../../context/CloudinaryContext";

const BackgroundColorList = () => {
  const [chosenColor, setChosenColor] = useState();

  const { displayedImage, dispatch } = useContext(CloudinaryContext);

  const handleChooseColor = (color) => {
    setChosenColor(color);
    dispatch({ type: 'DISPLAY_IMAGE', payload: color});
  };

  return (
    <Box h="100%" w={"100%"} overflowY={"auto"} objectFit={true}>
      <Grid gridTemplateColumns={"50% 50%"} gap={1} maxW={"98%"}>
        {colors &&
          colors.map((color, idx) => (
            <GridItem
              key={idx}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Center
                onClick={() => handleChooseColor(color)}
                border={displayedImage && color == displayedImage ? "3px solid red" : "none"}
                bg={color}
                w={140}
                h={140}
                borderRadius={10}
              ></Center>
            </GridItem>
          ))}
      </Grid>
    </Box>
  );
};

export default BackgroundColorList;

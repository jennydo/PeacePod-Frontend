/* eslint-disable no-undef */
import React, { useContext } from "react";
import { CloudinaryContext } from "../../../context/CloudinaryContext";
import { Image, Center } from "@chakra-ui/react";

const DisplayedBackground = () => {
  const { displayedImage } = useContext(CloudinaryContext);

  return (
    <>
      {displayedImage && checkIfColor() && (
        <Center
          className="image-center"
          maxHeight="100%"
        >
          <Image
            borderRadius={20}
            h="77vh"
            margin={0}
            objectFit="cover"
            src={displayedImage}
            w="95%"
          />
        </Center>
      )}
    </>
  );
};

export default DisplayedBackground;

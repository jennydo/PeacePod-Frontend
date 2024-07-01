import React, { useContext } from "react";
import { CloudinaryContext } from "../../../context/CloudinaryContext";
import { Image, Center } from "@chakra-ui/react";

const DisplayedBackground = () => {
  const { displayedImage } = useContext(CloudinaryContext);

  return (
    <>
      {displayedImage && checkIfColor() && (
        <Center
          maxHeight={"100%"}
          className="image-center"
        >
          <Image
            src={displayedImage}
            w="95%"
            h={"77vh"}
            borderRadius={20}
            objectFit="cover"
            margin={0}
          />
        </Center>
      )}
    </>
  );
};

export default DisplayedBackground;

import React, { useContext } from'react';
import { CloudinaryContext } from '../../../context/CloudinaryContext';
import { Image, Center } from "@chakra-ui/react";

const DisplayedBackground = () => {
    const {displayedImage} = useContext(CloudinaryContext);

    return ( 
        <>
        {displayedImage && (
            <Center>
                <Image src={displayedImage} w="95%" h="700" borderRadius={20}/>
            </Center>
           
        )}
        </>
     );
}
 
export default DisplayedBackground;
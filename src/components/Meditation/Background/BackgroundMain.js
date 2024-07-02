import BackgroundList from "./BackgroundList";
import UploadBackground from "./UploadBackground";
import { Box } from "@chakra-ui/react";

const BackgroundMain = () => {
    return ( 
        <Box h="100%" w="100%"> 
            {/* <Text fontSize='xl'>Choose serene settings for your soul</Text> */}
            <BackgroundList/>
            <UploadBackground/>
        </Box>
     );
};
 
export default BackgroundMain;
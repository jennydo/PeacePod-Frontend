import BackgroundList from "./BackgroundList";
import UploadBackground from "./UploadBackground";
import { Box, Text } from "@chakra-ui/react";

const BackgroundMain = () => {
    return ( 
        <Box w="100%" h="100%"> 
            <Text>Background</Text>
            <BackgroundList/>
            <UploadBackground/>
        </Box>
     );
}
 
export default BackgroundMain;
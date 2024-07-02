import { Box, Text } from "@chakra-ui/react";

const EmptyChat = () => {
    return ( 
        <Box alignItems="center" display="flex"
            h="100%"
            justifyContent="center"
            w="100%">
            <Text fontSize="4xl">Select a chat to start</Text>
        </Box>
     );
};
 
export default EmptyChat;
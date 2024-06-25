import { Box, Text } from "@chakra-ui/react";

const EmptyChat = () => {
    return ( 
        <Box w="100%" h="100%"
            display="flex"
            justifyContent="center"
            alignItems="center">
            <Text fontSize={"4xl"}>Select a chat to start</Text>
        </Box>
     );
}
 
export default EmptyChat;
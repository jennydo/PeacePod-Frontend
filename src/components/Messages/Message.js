import { useAuthContext } from "../../hooks/useAuthContext";
import { Stack, Avatar, Box, Text } from '@chakra-ui/react';

const Message = ( {message} ) => {
    var isSender;
    const { user: sender } = useAuthContext()
    if (message.sender._id == sender.user._id) { isSender = true }
    else { isSender = false }
    const { username, avatar } = message.sender
    const { content } = message

    return ( 
        <Stack direction="row" w="100%" justifyContent={isSender ? "flex-end" : "flex-start"} p={0.5}>
            {!isSender && <Avatar size="sm" name={username} src={avatar}/>}
            <Box borderRadius={30}>
                <Text color={'black'}>{content}</Text>
            </Box>
            {isSender && <Avatar size="sm" name={username} src={avatar}/>}
        </Stack>
     );
}
 
export default Message;
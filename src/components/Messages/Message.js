import { useAuthContext } from "../../hooks/useAuthContext";
import { Stack, Avatar, Box, Text, Grid, GridItem} from '@chakra-ui/react';
import './Chat.scss';

const Message = ( {message, previousMessage} ) => {
    var isSender;
    var isNewSender;
    const { user: sender } = useAuthContext()

    if (message.sender._id == sender.user._id) { isSender = true }
    else { isSender = false }

    if (!previousMessage || message.sender._id != previousMessage.sender._id) { isNewSender = true }
    else { isNewSender = false }

    const { username, avatar } = message.sender
    const { content } = message

    return ( 
        <Stack direction="row" w="100%" justifyContent={isSender ? "flex-end" : "flex-start"} p={0.5}>
            {(!isSender && isNewSender) 
            ? (<Avatar size="sm" name={username} src={avatar} />) 
            : ( <Box width="2rem" /> )}
            <Box className="message-container">
                <p className={`app-message ${isSender? 'sender' : 'receiver'}`}>{content}</p>
            </Box>
            {(isSender && isNewSender) && <Avatar size="sm" name={username} src={avatar}/>}
            {(!isNewSender) && <Box width="2rem" />}
        </Stack>
     );
}
 
export default Message;
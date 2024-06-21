import { Avatar, Stack, Box } from "@chakra-ui/react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useChatsContext } from '../../hooks/useChatsContext'

const ChatBox = ({chat}) => {
    const { selectedChat, dispatch } = useChatsContext()
    const {user: sender} = useAuthContext()
    const { users } = chat

    // get the username and avatar of the receiver
    const receiver = users.filter(user => user._id !== sender.user._id);
    const { username, avatar } = receiver[0];

    // get the latest message 
    const latestMessage = chat.latestMessage || ""
    const displayedLatestMessage = latestMessage.content || ""

    const selectChat = (chat) => {
        dispatch({
            type: "SELECT_CHAT",
            payload: chat
        })
    }

    return ( 
        <Box w="100%" h='100%' p={2} borderRadius={5} bg={selectedChat._id == chat.__id ? "pink": "transparent"}>
            <Stack direction="row" w="100%" onClick={() => selectChat(chat)}>
                <Avatar name={username} src={avatar}/>
                <Stack direction="column" gap='0'>
                    <p className="app-message username">{username}</p>
                    <p className="app-message preview">{displayedLatestMessage}</p>
                </Stack>
            </Stack>
        </Box>
     );
}
 
export default ChatBox;
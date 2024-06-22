import { Avatar, Stack, Box } from "@chakra-ui/react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useChatsContext } from '../../hooks/useChatsContext';
import { useMessagesContext } from '../../hooks/useMessagesContext';
import { useEffect } from "react";
import './Chat.scss';

const ChatBox = ({chat}) => {
    const { selectedChat, dispatch } = useChatsContext()
    const {user: sender} = useAuthContext()
    const { users } = chat
    const { dispatch: messagesDispatch, previewMessages } = useMessagesContext()

    // get the username and avatar of the receiver
    const receiver = users.filter(user => user._id !== sender.user._id);
    const { username, avatar } = receiver[0];

    // get the latest message 
    const latestMessage = chat.latestMessage || ""
    const displayedLatestMessage = latestMessage.content || ""

    if (selectedChat._id === chat._id) {
        console.log("selectedChat", selectedChat)
        console.log("chat", chat)
    }
    

    useEffect(() => {
        messagesDispatch({
            type: 'SET_PREVIEW_MESSAGE', 
            payload: {
                chatId: chat._id,
                message: displayedLatestMessage
            }})
    }, [])

    const selectChat = (chat) => {
        dispatch({
            type: "SELECT_CHAT",
            payload: chat
        })
    }

    return ( 
        <Box w="100%" h='100%' p={2} borderRadius={5} className={selectedChat._id === chat._id ? "chat-selected": ""}>
            <Stack direction="row" w="100%" onClick={() => selectChat(chat)}>
                <Avatar name={username} src={avatar}/>
                <Stack direction="column" gap='0'>
                    <p className="app-message username">{username}</p>
                    <p className="app-message preview">{previewMessages[chat._id]}</p>
                </Stack>
            </Stack>
        </Box>
     );
}
 
export default ChatBox;
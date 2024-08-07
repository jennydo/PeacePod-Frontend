import { Avatar, Stack, Box, Icon } from "@chakra-ui/react";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useChatsContext } from '../../../hooks/useChatsContext';
import { useMessagesContext } from '../../../hooks/useMessagesContext';
import { useEffect, useState } from "react";
import '../Chat.scss';
import { GoDotFill } from "react-icons/go";
import { StyledBox } from "../../../styles/components/StyledComponents";

const ChatBox = ({chat}) => {
    console.log('current chat', chat);
    const { selectedChat, dispatch, onlineUsers } = useChatsContext();
    const {user: sender} = useAuthContext();
    const { users } = chat;
    const { dispatch: messagesDispatch, previewMessages, previewMessagesTimestamp, chatNames } = useMessagesContext();
    const [isOnline, setIsOnline] = useState(false);

    // get the username and avatar of the receiver
    const receiver = users.filter(user => user._id !== sender.user._id);
    const { username, avatar } = receiver[0];

    // get the latest message 
    const latestMessage = chat.latestMessage || "";
    const displayedLatestMessage = latestMessage.content || "";

    useEffect(() => {
        messagesDispatch({
            type: 'SET_PREVIEW_MESSAGE', 
            payload: {
                chatId: chat._id,
                message: displayedLatestMessage,
                timestamp: latestMessage.createdAt
            }});
        
        messagesDispatch({
            type: 'SET_CHAT_NAME', 
            payload: {
                chatId: chat._id, 
                chatName: chat.chatName
            }
        });
        // console.log('chatname:',chatNames[chat._id])
    }, [chat._id, chat.chatName, displayedLatestMessage, latestMessage.createdAt, messagesDispatch]);

    const selectChat = (chat) => {
        dispatch({
            type: "SELECT_CHAT",
            payload: chat
        });
    };

    useEffect(() => {
        const isUserOnline = onlineUsers.some(userId => userId === receiver[0]._id);
        if (isUserOnline) {
            setIsOnline(true); // Set isOnline to true if receiver._id is found in onlineUsers
        } else {
            setIsOnline(false); // Set isOnline to false if receiver._id is not found in onlineUsers
        }
        console.log('onlineUsers:', onlineUsers);
    }, [onlineUsers, receiver]);
    
    return ( 
        <StyledBox
            onClick={() => selectChat(chat)}
            selected={selectedChat._id === chat._id}
            children={
                <Stack direction="row" w="100%" onClick={() => selectChat(chat)}>
                    <Avatar name={username} src={avatar}/>
                    <Stack direction="column" gap='0'>
                        <div className="app-message box2">
                            <span className="app-message username">{chatNames[chat._id]}</span>
                            <Icon className={isOnline ? "": "hidden"} as={GoDotFill} fill='blue' ml={'5px'}/>
                        </div> 
                        <div className="app-message box2">
                            <span className="app-message preview">{previewMessages[chat._id]}</span>
                            <span className="app-message timestamp">·</span>
                            <span className="app-message timestamp">{previewMessagesTimestamp[chat._id]}</span>
                        </div>
                    </Stack>
                </Stack>
            }
        />
     );
};
 
export default ChatBox;
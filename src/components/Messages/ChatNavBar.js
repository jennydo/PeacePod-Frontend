import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthContext } from '../../hooks/useAuthContext'
import {VStack, Heading} from '@chakra-ui/react';
import ChatBox from './ChatBox';
import { useChatsContext } from '../../hooks/useChatsContext';

const ChatNavBar = () => {
    const { user } = useAuthContext()
    // const [allChats, setAllChats] = useState([])
    const { chats, dispatch } = useChatsContext()

    useEffect(() => {
        axios.get("http://localhost:4000/api/chats", {
            headers: {Authorization: `Bearer ${user.token}`}
        })
            .then( response => {
                dispatch({ type: "GET_CHATS", payload: response.data })
            })
            .catch ( error => console.log(error) )     
    }, [])
    return ( 
    <>
        <Heading>Your Messages</Heading>
        <VStack 
            align='stretch'>
            {chats && chats.map(chat => (
                <ChatBox key={chat._id} chat={chat}/>
            ))}
        </VStack>
    </>
     );
}
 
export default ChatNavBar;
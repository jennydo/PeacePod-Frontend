import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthContext } from '../../hooks/useAuthContext'
import {VStack, Heading} from '@chakra-ui/react';
import ChatBox from './ChatBox';

const ChatNavBar = () => {
    const { user } = useAuthContext()
    const [allChats, setAllChats] = useState([])

    useEffect(() => {
        axios.get("http://localhost:4000/api/chats", {
            headers: {Authorization: `Bearer ${user.token}`}
        })
            .then( response => {
                console.log(response);
                setAllChats(response.data)
            })
            .catch ( error => console.log(error) )     
    }, [])
    return ( 
    <>
        <Heading>Your Messages</Heading>
        <VStack 
            align='stretch'>
            {allChats && allChats.map(chat => (
                <ChatBox key={chat._id} chat={chat}/>
            ))}
        </VStack>
    </>
     );
}
 
export default ChatNavBar;
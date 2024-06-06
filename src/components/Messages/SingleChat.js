import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import {Grid, GridItem, HStack, Input, Avatar, Box, IconButton, Icon, Divider} from '@chakra-ui/react';
import { IoSend } from "react-icons/io5";
import { useAuthContext } from '../../hooks/useAuthContext';
import axios from 'axios';
import { useChatsContext } from '../../hooks/useChatsContext';
import Message from './Message';
import Lottie from "react-lottie";
import animationData from "./typing.json";

// connect to server
var socket, selectedChatCompare;

const SingleChat = ({chat}) => {

  const { selectedChat } = useChatsContext()
  const { _id: chatId, users } = chat 

  // get information of the sender (logged in user)
  const {user: sender} = useAuthContext()
  const {username: senderUsername, avatar: senderAvatar} = sender.user;

  // get info of the receiver
  const receiver = users.filter(user => user._id !== sender.user._id);
  const { username: receiverUsername, avatar: receiverAvatar } = receiver[0];

  // const [handle, setHandle] = useState("")
  const [socketConnected, setSocketConnected] = useState(false)
  const [newMessage, setNewMessage] = useState("")
  const [allMessages, setAllMessages] = useState([])
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);

  useEffect(() => {
    // connect to server
    socket = io.connect('http://localhost:4000');
    socket.emit("setup", sender);
    socket.on("connected", () => setSocketConnected(true))
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
  }, [])

  useEffect(() => {
    socket.on("message received", (newMessageReceived) => {
      // if chat is not selected or doesn't match current chat
      if (!selectedChatCompare || selectedChatCompare._id !== newMessageReceived.chat._id) {
        // give notification
      } else {
        setAllMessages([...allMessages, newMessageReceived])
      }
    })
  })

  useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  // Fetch all messages initially when first opened the chat 
  const fetchMessages = async () => {
    if (!selectedChat) return;
    axios.get(`http://localhost:4000/api/messages/${chatId}`, {
      headers: { Authorization: `Bearer ${sender.token}`}
    })
      .then( response => {
        setAllMessages(response.data)
        console.log("all messages: ", response.data)
      })
      .catch ( error => console.log(error))

    socket.emit('join chat', chatId)
  }

  // Chat Event
  // send chat message
  const sendMessage = () => {
    socket.emit("stop typing", selectedChat._id);
    axios.post('http://localhost:4000/api/messages/', {
      content: newMessage, 
      chatId
      }, {
        headers: {Authorization: `Bearer ${sender.token}`}
      })
      .then( response => {
        console.log("new message here", response.data)
        socket.emit('new message', response.data)
        setAllMessages([...allMessages, response.data]);
      })
      .catch( error => console.log(error))
    
    setNewMessage("");
  };

  const typingHandler = (e) => {
    setNewMessage(e.target.value);

    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 10000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  return (
    <Grid gridTemplateRows={'10% 1fr 8%'}  w='100%' h='100%'>
      <GridItem w='100%' h='100%'> 
        <HStack className='chatbox-header'>
          <Avatar src={receiverAvatar}/>
          <p className='app-message username'>{receiverUsername}</p>
        </HStack>
      </GridItem>
      <GridItem w='100%' h='100%'> 
        <div className='chatbox-divider'></div>
        <Box maxHeight="570px" overflowY="auto" p={3} mb={5}>
          {allMessages && allMessages.map((message, index) => (
            <Message 
              key={index} 
              message={message} 
              previousMessage={index > 0 ? allMessages[index - 1] : null} 
            />
          ))}
          </Box>
          {/* {istyping && (
            <Lottie
              options={{
                  loop: true,
                  autoplay: true,
                  animationData: animationData,
                  rendererSettings: {
                      preserveAspectRatio: "xMidYMid slice",
                  }
              }}
              // height={50}
              width={70}
              style={{ marginBottom: 15, marginLeft: 0 }}
            /> 
          )} */}
      </GridItem>

      <GridItem w='100%' h='100%'> 
        <HStack>
          <Avatar size="sm" name={senderUsername} src={senderAvatar}/>
          <Input
            id="message"
            value={newMessage}
            placeholder="Message"
            variant='filled'
            onChange={typingHandler}
          />
          <IconButton 
            aria-label='Send' 
            variant='ghost'
            colorScheme='pink'
            icon={<Icon as={IoSend}/>} 
            onClick={sendMessage}/>
        </HStack>
      </GridItem>
    </Grid>
  );
}

export default SingleChat;

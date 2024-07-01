import React, { useEffect, useState, useCallback } from 'react';
import {Grid, GridItem, HStack, Input, Avatar, Box, IconButton, Icon, Divider, VStack} from '@chakra-ui/react';
import { IoSend } from "react-icons/io5";
import { useAuthContext } from '../../../hooks/useAuthContext';
import axios from 'axios';
import { useChatsContext } from '../../../hooks/useChatsContext';
import Message from './Message';
import Lottie from "react-lottie";
import animationData from "../typing.json";
import { useMessagesContext } from '../../../hooks/useMessagesContext';

const SingleChat = ({chat}) => {

  const { selectedChat, dispatch: chatDispatch, socket, selectedChatCompare } = useChatsContext()
  const { dispatch: messagesDispatch, messages } = useMessagesContext()
  const { _id: chatId, users, chatName } = chat 

  // get information of the sender (logged in user)
  const {user: sender} = useAuthContext()
  const {username: senderUsername, avatar: senderAvatar} = sender.user;

  // get info of the receiver
  const receiver = users.filter(user => user._id !== sender.user._id);
  const { username: receiverUsername, avatar: receiverAvatar } = receiver[0];

  // const [handle, setHandle] = useState("")
  const [socketConnected, setSocketConnected] = useState(false)
  const [newMessage, setNewMessage] = useState("")
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);

  useEffect(() => {
    socket.on("connected", () => setSocketConnected(true))
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
  }, [])

  useEffect(() => {
    socket.on("message received", (newMessageReceived) => {
      if (newMessageReceived.sender._id != sender._id) {
        // if chat is selected and match current chat
        if (selectedChatCompare && selectedChatCompare._id === newMessageReceived.chat._id) {
          scrollToBottom();
        }
        messagesDispatch({
          type: 'NEW_MESSAGE',
          payload: {
            chatId: newMessageReceived.chat._id,
            message: newMessageReceived
          }
        })
      }
    })
  }, [])

  useEffect(() => {
    fetchMessages();
    chatDispatch({type: 'SET_SELECTED_CHAT_COMPARE', payload: selectedChat});
  }, [selectedChat]);

  // Scroll to the bottom of the container after fetching messages
  useEffect(() => {
    scrollToBottom();
  }, [messages[chatId]]);

  // Fetch all messages initially when first opened the chat 
  const fetchMessages = async () => {
    if (!selectedChat) return;
    if (messages[chatId]) return;

    axios.get(`http://localhost:4000/api/messages/${chatId}`, {
      headers: { Authorization: `Bearer ${sender.token}`}
    })
      .then( response => {
        messagesDispatch({
          type: "GET_MESSAGES",
          payload: {
            chatId,
            messages: response.data
          }
        })
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
        messagesDispatch({
          type: 'NEW_MESSAGE',
          payload: {
            chatId: response.data.chat._id,
            message: response.data
          }
        })
      })
      .catch( error => console.log(error))
    
    setNewMessage("");
    scrollToBottom();
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

  const scrollToBottom = useCallback(() => {
    const messagesContainer = document.getElementById('messagesContainer');
    if (messagesContainer) {
      const lastMessage = messagesContainer.lastElementChild;
      if (lastMessage) {
        lastMessage.scrollIntoView();
      }
    }
  }, []);

  return (
    <Grid gridTemplateRows={'8% 1fr 8%'}  w='100%' h='100%' pt={'15px'}>
      <GridItem w='100%' h='100%'> 
        <HStack className='chatbox-header'>
          <Avatar src={receiverAvatar}/>
          <p className='app-message username'>{chatName}</p>
        </HStack>
      </GridItem>
      <GridItem w='100%' h='100%'> 
        <div className='chatbox-divider'></div>
        <VStack id="messagesContainer" height="70vh" overflowY="scroll" p={3} mb={5}>
          {messages[chatId] && messages[chatId].map((message, index) => (
            <Message 
              key={index} // !!! not use key 
              message={message} 
              previousMessage={index > 0 ? messages[chatId][index - 1] : null} 
            />
          ))}
        </VStack>
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

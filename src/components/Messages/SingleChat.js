import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import {Button, HStack, Input, Avatar, Box} from '@chakra-ui/react';
import { useAuthContext } from '../../hooks/useAuthContext';
import axios from 'axios';
import { useChatsContext } from '../../hooks/useChatsContext';
import Message from './Message';

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
  const [typingUsername, setTypingUsername] = useState("")

  useEffect(() => {
    // connect to server
    socket = io.connect('http://localhost:4000');
    socket.emit("setup", sender);
    socket.on("connection", () => setSocketConnected(true))
  }, [])

  useEffect(() => {
    socket.on("message received", (newMessageReceived) => {
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

  // Listen for Chat event
  // useEffect(() => {
  //   socket.on("chat", (data) => {
  //     setTypingUsername("");
  //     const newMessage = data.handle + ":" + data.message;
  //     setAllMessages((prevAllMessages) => [...prevAllMessages, newMessage]);
  //   });
  // }, [])


  // Typing Event
  // const handleTyping = () => {
  //   socket.emit('typing', username);
  // }

  // Listen for Typing event
  // useEffect(() => {
  //   socket.on("typing", (data) => {
  //     setTypingUsername(data + " is typing ...");
  //   })
  // }, [])

  return (
    <div>
      <div>
        <h1>Chat with {receiverUsername}</h1>
        <div height="400px" overflow="auto">
          <div>
            <Box maxHeight="570px" overflowY="auto" p={3} mb={5}>
            {allMessages && allMessages.map((message, index) => (
              <Message key={index} message={message}/>
            ))}
            </Box>
          </div>
          <div>
            {typingUsername}
          </div>
        </div>
        <HStack>
          <Avatar size="sm" name={senderUsername} src={senderAvatar}/>
          <Input
            id="message"
            value={newMessage}
            placeholder="Message"
            onChange={(e) => setNewMessage(e.target.value)}
            // onKeyDown={handleTyping}
          />
          <Button w="30px" onClick={sendMessage}>Send</Button>
        </HStack>
      </div>
    </div>
  );
}

export default SingleChat;

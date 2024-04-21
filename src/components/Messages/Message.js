import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import {Button, HStack, Input, Text, Avatar} from '@chakra-ui/react';
import { useAuthContext } from '../../hooks/useAuthContext';
import axios from 'axios';

// connect to server
var socket;

const Message = ({chat}) => {

  const { _id: chatId, users } = chat 

  // get information of the sender (logged in user)
  const {user: sender} = useAuthContext()
  const {username: senderUsername, avatar: senderAvatar} = sender.user;

  // get info of the receiver
  const receiver = users.filter(user => user._id !== sender.user._id);
  const { username: receiverUsername, avatar: receiverAvatar } = receiver[0];

  // const [handle, setHandle] = useState("")
  const [message, setMessage] = useState("")
  const [allMessages, setAllMessages] = useState([])
  const [typingUsername, setTypingUsername] = useState("")

  // Fetch all messages initially when first opened the chat 
  useEffect(()=>{
    axios.get(`http://localhost:4000/api/messages/${chatId}`, {
      headers: { Authorization: `Bearer ${sender.token}`}
    })
      .then( response => {
        setAllMessages(response.data)
        console.log("all messages: ", response.data)
      })
      .catch ( error => console.log(error))
  }, [chatId])

  useEffect(() => {
    // connect to server
    socket = io.connect('http://localhost:4000');
  }, [])

  // Chat Event
  // send chat message
  const sendMessage = () => {
    // socket.emit("chat", {
    //   message: message,
    //   handle: username
    // });
    setMessage("");
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
            {allMessages.map((message, index) => (
              <div key={index}>{message}</div>
            ))}
          </div>
          <div>
            {typingUsername}
          </div>
        </div>
        <HStack>
          <Avatar size="sm" name={senderUsername} src={senderAvatar}/>
          <Input
            id="message"
            value={message}
            placeholder="Message"
            onChange={(e) => setMessage(e.target.value)}
            // onKeyDown={handleTyping}
          />
          <Button w="30px" onClick={sendMessage}>Send</Button>
        </HStack>
      </div>
    </div>
  );
}

export default Message;

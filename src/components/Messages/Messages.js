import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import {Button, Input} from '@chakra-ui/react';


// connect to server
const socket = io.connect('http://localhost:5000');

const Messages = () => {

  const [handle, setHandle] = useState("")
  const [message, setMessage] = useState("")
  const [allMessages, setAllMessages] = useState([])
  const [typingUsername, setTypingUsername] = useState("")

  // Chat Event
  // send chat message
  const sendMessage = () => {
    socket.emit("chat", {
      message: message,
      handle: handle,
    });
    setMessage("");
  };

  // Listen for Chat event
  useEffect(() => {
    socket.on("chat", (data) => {
      setTypingUsername("");
      const newMessage = data.handle + ":" + data.message;
      setAllMessages((prevAllMessages) => [...prevAllMessages, newMessage]);
    });
  }, [])


  // Typing Event
  const handleTyping = () => {
    socket.emit('typing', handle);
  }

  // Listen for Typing event
  useEffect(() => {
    socket.on("typing", (data) => {
      setTypingUsername(data + " is typing ...");
    })
  }, [])

  return (
    <div>
      <div id="mario-chat">
        <h1>Anonymous Chat</h1>
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
        <Input
          id="handle"
          value={handle}
          placeholder="Handle"
          onChange={(e) => setHandle(e.target.value)}
        />
        <Input
          id="message"
          value={message}
          placeholder="Message"
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleTyping}
        />
        <Button w="100%" onClick={sendMessage}>Send</Button>
      </div>
    </div>
  );
}

export default Messages;

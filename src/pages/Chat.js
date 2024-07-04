import SingleChat from "../components/Messages/ChatWindow/SingleChat";
import ChatNavBar from "../components/Messages/ChatNavigator/ChatNavBar";
import EmptyChat from "../components/Messages/ChatWindow/EmptyChat";
import { Grid, GridItem, Box, HStack, VStack } from "@chakra-ui/react";
import { useChatsContext } from "../hooks/useChatsContext";
import UserChatProfile from "../components/Messages/ChatProfile/UserChatProfile";

const Chat = () => {
  const { selectedChat } = useChatsContext();
  return (
    <>
      <div className="chatbox-divider top"/>
      <Grid className="chat-box"
        gridTemplateColumns={'25% 1% 1fr 1% 22%'} 
        gap={2} >
        <GridItem w='100%' h='100%'> 
        <ChatNavBar/>
        </GridItem>
        <GridItem w='100%' h='100%'>
          <div className="chatbox-divider vertical"></div>
        </GridItem>
        <GridItem w='100%' h='100%'>
          {selectedChat && <SingleChat chat={selectedChat}/>}
          {!selectedChat && <EmptyChat/>}
        </GridItem>
        <GridItem w='100%' h='100%'>
          <div className="chatbox-divider vertical"></div>
        </GridItem>
        <GridItem w='100%' h='100%'>
          {selectedChat && <UserChatProfile chat={selectedChat}/>}
        </GridItem>
      </Grid>
    </>
  );
};
 
export default Chat;
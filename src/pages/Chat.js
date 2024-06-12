import SingleChat from "../components/Messages/SingleChat";
import ChatNavBar from "../components/Messages/ChatNavBar";
import EmptyChat from "../components/Messages/EmptyChat";
import { Grid, GridItem, Box, HStack, VStack } from "@chakra-ui/react";
import { useChatsContext } from "../hooks/useChatsContext";

const Chat = () => {
  const { selectedChat } = useChatsContext()
  return (
    <>
    <h1>Messages</h1>
    <div className="chat-page">
      <Grid className="chat-box"
        gridTemplateColumns={'35% 1% 1fr'} 
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
      </Grid>
    </div>
    </>
  );
}
 
export default Chat;
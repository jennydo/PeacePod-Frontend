import SingleChat from "../components/Messages/SingleChat";
import ChatNavBar from "../components/Messages/ChatNavBar";
import EmptyChat from "../components/Messages/EmptyChat";
import { Grid, GridItem } from "@chakra-ui/react";
import { useChatsContext } from "../hooks/useChatsContext";

const Chat = () => {
  const { selectedChat } = useChatsContext()
  return (
    <div className="chat-page">
        <Grid gridTemplateColumns={'35% 1fr'} m={10} gap={10} h="80vh" w="70%">
          <GridItem w='100%' h='100%'> 
          <ChatNavBar/>
          </GridItem>
          <GridItem w='100%' h='100%'>
            {selectedChat && <SingleChat chat={selectedChat}/>}
            {!selectedChat && <EmptyChat/>}
          </GridItem>
        </Grid>
    </div>
  );
}
 
export default Chat;
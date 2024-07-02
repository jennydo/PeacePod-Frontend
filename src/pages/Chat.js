import SingleChat from "../components/Messages/ChatWindow/SingleChat";
import ChatNavBar from "../components/Messages/ChatNavigator/ChatNavBar";
import EmptyChat from "../components/Messages/ChatWindow/EmptyChat";
import { Grid, GridItem} from "@chakra-ui/react";
import { useChatsContext } from "../hooks/useChatsContext";
import UserChatProfile from "../components/Messages/ChatProfile/UserChatProfile";

const Chat = () => {
  const { selectedChat } = useChatsContext();
  return (
    <>
      <div className="chatbox-divider top"/>
      <Grid className="chat-box"
        gap={2} 
        gridTemplateColumns="25% 1% 1fr 1% 22%" >
        <GridItem h='100%' w='100%'> 
        <ChatNavBar/>
        </GridItem>
        <GridItem h='100%' w='100%'>
          <div className="chatbox-divider vertical" />
        </GridItem>
        <GridItem h='100%' w='100%'>
          {selectedChat && <SingleChat chat={selectedChat}/>}
          {!selectedChat && <EmptyChat/>}
        </GridItem>
        <GridItem h='100%' w='100%'>
          <div className="chatbox-divider vertical" />
        </GridItem>
        <GridItem h='100%' w='100%'>
          {selectedChat && <UserChatProfile chat={selectedChat}/>}
        </GridItem>
      </Grid>
    </>
  );
};
 
export default Chat;
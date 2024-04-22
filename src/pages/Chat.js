import { useEffect } from "react";
import SingleChat from "../components/Messages/SingleChat";
import ChatNavBar from "../components/Messages/ChatNavBar";
import { Grid, GridItem } from "@chakra-ui/react";
import { useChatsContext } from "../hooks/useChatsContext";


const Chat = () => {
  const { selectedChat } = useChatsContext()
  return (
    <div>
        <Grid gridTemplateColumns={'30% 1fr'} m={10} gap={6}>
          <GridItem w='100%'> 
          <ChatNavBar/>
          </GridItem>
          <GridItem w='100%' >
            {selectedChat && <SingleChat chat={selectedChat}/>}
          </GridItem>
        </Grid>
    </div>
  );
}
 
export default Chat;
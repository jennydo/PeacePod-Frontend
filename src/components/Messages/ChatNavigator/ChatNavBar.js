import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useAuthContext } from "../../../hooks/useAuthContext";
import {
  VStack,
  StackDivider,
  Button,
  useDisclosure,
  ButtonGroup,
} from "@chakra-ui/react";
import ChatBox from "./ChatBox";
import { useChatsContext } from "../../../hooks/useChatsContext";
import { FaPeopleArrows } from "react-icons/fa";
import { StyledButton } from "../../../styles/components/StyledComponents";
import MatchingModal from "../Matching Progress/MatchingModal";

const ChatNavBar = () => {
  const { user } = useAuthContext();
  const { chats, dispatch } = useChatsContext();

  const finalRef = useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isWaitingForMatch } = JSON.parse(localStorage.getItem("user"));

  const [waitingForMatch, setWaitingForMatch] = useState(isWaitingForMatch)

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/chats", {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((response) => {
        dispatch({ type: "GET_CHATS", payload: response.data });
      })
      .catch((error) => console.log(error));
  }, []);

  const handleCancel = () => {
    console.log("Cancelling match...");
    localStorage.setItem(
      "user",
      JSON.stringify({ ...user, isWaitingForMatch: false })
    );
    setWaitingForMatch(!waitingForMatch)
  };

  return (
    <>
      <h1>Messages</h1>

      <VStack 
        className='chat-navbar'
        // divider={<div className="chatbox-divider"/>}
      >
        <ButtonGroup w={"100%"} isAttached>
          {/* <Button
            w={"100%"}
            leftIcon={<FaPeopleArrows />}
            bg={"white"}
            _hover={{ background: "grey" }}
            onClick={!isWaitingForMatch ? onOpen : null}
            marginBottom={5}
          >
            {isWaitingForMatch
              ? "Waiting till 21:00..."
              : "Need someone new to talk to?"}
          </Button> */}
          <StyledButton 
            width='100%'
            icon={<FaPeopleArrows />}
            onClick={!isWaitingForMatch ? onOpen : null}
            text={isWaitingForMatch
              ? "Waiting till 21:00..."
              : "Need someone new to talk to?"}/>

          {isWaitingForMatch ? (
            <Button
              onClick={handleCancel}
              bg={"#A2D2FF"}
              _hover={{ background: "#CDB4DB" }}
            >
              Cancel
            </Button>
          ) : undefined}
        </ButtonGroup>

        {chats && chats.map((chat) => <ChatBox key={chat._id} chat={chat} />)}
      </VStack>

      <MatchingModal finalRef={finalRef} isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default ChatNavBar;

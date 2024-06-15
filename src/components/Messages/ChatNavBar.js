import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useAuthContext } from "../../hooks/useAuthContext";
import {
  VStack,
  Heading,
  Button,
  Modal,
  ModalBody,
  ModalOverlay,
  ModalHeader,
  useDisclosure,
  ButtonGroup,
} from "@chakra-ui/react";
import ChatBox from "./ChatBox";
import { useChatsContext } from "../../hooks/useChatsContext";
import { FaPeopleArrows } from "react-icons/fa";
import MatchingModal from "./MatchingModal";

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
      <h1>Your Messages</h1>
      <ButtonGroup w={"100%"} isAttached>
        <Button
          w={"100%"}
          leftIcon={<FaPeopleArrows />}
          bg={"#FFAFCC"}
          _hover={{ background: "#FFD6FF" }}
          onClick={!isWaitingForMatch ? onOpen : null}
        >
          {isWaitingForMatch
            ? "Waiting till 21:00..."
            : "Need someone new to talk to?"}
        </Button>

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

      <MatchingModal finalRef={finalRef} isOpen={isOpen} onClose={onClose} />

      <VStack className='chat-navbar'>
        {chats && chats.map((chat) => <ChatBox key={chat._id} chat={chat} />)}
      </VStack>
    </>
  );
};

export default ChatNavBar;

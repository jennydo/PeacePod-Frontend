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
} from "@chakra-ui/react";
import ChatBox from "./ChatBox";
import { useChatsContext } from "../../hooks/useChatsContext";
import { FaPeopleArrows } from "react-icons/fa";
import MatchingModal from "./MatchingModal";

const ChatNavBar = () => {
  const { user } = useAuthContext();
  const { chats, dispatch } = useChatsContext();

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

  const finalRef = useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <VStack>
      <Heading>Your Messages</Heading>
      <Button
        w={"100%"}
        leftIcon={<FaPeopleArrows />}
        bg={"#FFAFCC"}
        _hover={{ background: "#FFD6FF" }}
        onClick={onOpen}
      >
        Need someone new to talk to?
      </Button>

      <MatchingModal finalRef={finalRef} isOpen={isOpen} onClose={onClose} />

      <VStack align="stretch">
        {chats && chats.map((chat) => <ChatBox key={chat._id} chat={chat} />)}
      </VStack>
    </VStack>
  );
};

export default ChatNavBar;

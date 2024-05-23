import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  Input,
  Flex,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { AudioContext } from "../../../context/AudioContext";
import axios from "axios";
import { useAuthContext } from "../../../hooks/useAuthContext";

const NewAudioModal = ({ finalRef, isOpen, onClose }) => {
  const user = useAuthContext();

  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");
  const [mood, setMood] = useState("");
  const [tone, setTone] = useState("");
  const [extraNotes, setExtraNotes] = useState("");

  const { dispatch } = useContext(AudioContext);

  const handleCreateAudio = async () => {
    try {
      /// DB
      // const response = await axios.post(
      //   "http://localhost:4000/api/meditation/createVoice",
      //   { title, duration, mood, tone, extraNotes },
      //   {
      //     headers: {
      //       Authorization: `Bearer ${user?.token}`,
      //     },
      //   }
      // );

      // console.log("Newly created audio", response.data)

      /// Context
      dispatch({
        type: "ADD_AUDIO",
        payload: { title, duration, mood, tone, extraNotes, isFavorite: false },
      });
    } catch (err) {
      console.log("Error while creating new audio", err);
    }

    onClose();
  };

  return (
    <Modal
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onClose}
      size="xl"
      scrollBehavior="inside"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign="center">
          Create your own meditation audio 🎶
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody
          sx={{
            "::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          <Flex flexDirection="column">
            <Text fontSize="xl" marginBottom={2}>
              Title{" "}
              <Text color="red" as="span">
                *
              </Text>
            </Text>
            <Input
              placeholder="title for this audio..."
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                // setSession({ ...session, duration: e.target.value });
              }}
            />

            <Text fontSize="xl" marginBottom={2}>
              Duration{" "}
              <Text color="red" as="span">
                *
              </Text>
            </Text>
            <Input
              placeholder="duration of the session in minutes"
              value={duration}
              onChange={(e) => {
                setDuration(e.target.value);
                // setSession({ ...session, duration: e.target.value });
              }}
            />

            <Text fontSize="xl" marginBottom={2}>
              Mood{" "}
              <Text color="red" as="span">
                *
              </Text>
            </Text>
            <Input
              placeholder="e.g. sad, happy"
              value={mood}
              onChange={(e) => {
                setMood(e.target.value);
                // setSession({ ...session, mood: e.target.value });
              }}
            />

            <Text fontSize="xl" marginBottom={2}>
              Tone{" "}
              <Text color="red" as="span">
                *
              </Text>
            </Text>
            <Input
              placeholder="reading tone of the session"
              value={tone}
              onChange={(e) => {
                setTone(e.target.value);
                // setSession({ ...session, tone: e.target.value });
              }}
            />

            <Text fontSize="xl" marginBottom={2}>
              Extra notes
            </Text>
            <Textarea
              placeholder="any extra notes..."
              value={extraNotes}
              onChange={(e) => {
                setExtraNotes(e.target.value);
                // setSession({ ...session, extraNotes: e.target.value });
              }}
              sz="sm"
            />
          </Flex>
        </ModalBody>

        <ModalFooter justifyContent="center">
          <Button onClick={handleCreateAudio}>Create</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default NewAudioModal;

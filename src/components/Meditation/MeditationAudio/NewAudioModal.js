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
  Spinner,
  Alert,
  AlertDescription,
  AlertIcon,
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

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCreateAudio = async () => {
    try {
      setIsLoading(true);
      // DB
      const response = await axios.post(
        "http://localhost:4000/api/meditation/audios",
        { title, duration, mood, tone, extraNotes, isFavorite: false },
        {
          headers: {
            Authorization: `Bearer ${user?.user?.token}`,
          },
        }
      );

      setIsLoading(false);
      console.log("Newly created audio", response.data);

      /// Context
      dispatch({
        type: "ADD_AUDIO",
        payload: { title, duration, mood, tone, extraNotes, isFavorite: false },
      });
      onClose();
    } catch (err) {
      setIsLoading(false);
      setError(err);
      console.log("Error while creating new audio", err);
      // onClose()
    }
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
                setError(null)
              }}
              isRequired={true}
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
                setError(null)
              }}
              isRequired={true}
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
                setError(null)
              }}
              isRequired={true}
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
                setError(null)
              }}
              isRequired={true}
            />

            <Text fontSize="xl" marginBottom={2}>
              Extra notes
            </Text>
            <Textarea
              placeholder="any extra notes..."
              value={extraNotes}
              onChange={(e) => {
                setExtraNotes(e.target.value);
                setError(null)
              }}
              sz="sm"
            />
          </Flex>
        </ModalBody>

        <ModalFooter justifyContent="center">
          <Button onClick={handleCreateAudio}>Create</Button>
        </ModalFooter>

        {isLoading ? (
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
            position={"absolute"}
            top="45%"
            left="45%"
          />
        ) : undefined}

        {error ? (
          <Alert status="error">
            <AlertIcon />
            <AlertDescription>{error?.response?.data?.error}</AlertDescription>
          </Alert>
        ) : undefined}
      </ModalContent>
    </Modal>
  );
};

export default NewAudioModal;

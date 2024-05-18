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
import React, { useState } from "react";

const NewAudioModal = ({ finalRef, isOpen, onClose }) => {
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");
  const [mood, setMood] = useState("");
  const [tone, setTone] = useState("");
  const [extraNotes, setExtraNotes] = useState("");

  return (
    <Modal
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onClose}
      size="5xl"
      scrollBehavior="inside"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign="center">
          Create your own meditation audio
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
              Title
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
              Duration
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
              Mood
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
              Tone
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
          <Button>Create</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default NewAudioModal;

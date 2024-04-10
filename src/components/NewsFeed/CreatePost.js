import React, { useState } from "react";
import axios from "axios";
import { Box, Stack, Input, Button, Textarea, Text, Divider, Image,
        Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure,
        Alert, AlertIcon, AlertDescription } from '@chakra-ui/react'

const CreatePost = () => {
    // temporary data, later will fetch from backend or UseContext
    const avatar = 'https://bit.ly/dan-abramov';
    const username = 'khoalebatbai';

    const { isOpen, onOpen, onClose } = useDisclosure()

    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [isPrompt, setIsPrompt] = useState(false) 
    const [isShowingAlert, setIsShowingAlert] = useState(false)
    const [alertMssg, setAlertMssg] = useState('')

    const maxLength = 500;
    const characterCount = body.length;

    const handleClose = () => {
        setIsShowingAlert(false);
        onClose();
    }

    const handleSave = () => {
        // Check if title is not empty and body is not empty or exceeds the maximum length
        if (title !== "" && (body !== "" && characterCount <= 500)) {
            const newPost = {
                title, 
                body, 
                isPrompt
            }

            axios.post("http://localhost:4000/api/posts/", newPost)
                .then(response => {
                    console.log(response.data);
                    onClose();
                    setTitle('');
                    setBody('');
                    setIsShowingAlert(false)
                })
                .catch(error => {
                    console.error(error);
                });

        } else {
            setIsShowingAlert(true)
            if (title === "") {
                setAlertMssg("You must have a title for your post.")
            }
            else if (body === "") {
                setAlertMssg("You must have a body for your post.")
            }
            else if (characterCount > 500) {
                setAlertMssg(`The maximum length is ${maxLength} characters.`)
            }
            else {
                setAlertMssg("Double check your input.")
            }
        }
    }

    return (
      <>

        <Box
          onClick={onOpen}
          bg="grey"
          w="50%"
          p={3}
          borderRadius={10}
          color="white"
          _hover={{ bg: "#E0E0E0" }}
          margin='15px'
        >
          How are you feeling today?
        </Box>


        <Modal
          isOpen={isOpen}
          onClose={handleClose}
          blockScrollOnMount={false}
          size="xl"
          motionPreset="slideInBottom"
          scrollBehavior="inside"
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Share your feeling</ModalHeader>
            <ModalCloseButton />
            <Divider />

            <ModalBody>
              <Stack spacing={3}>
                <Stack direction="row" spacing="10px">
                  <Image
                    borderRadius="full"
                    boxSize="50px"
                    src={avatar}
                    alt={username}
                  />
                  <Text>{username}</Text>
                </Stack>

                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Title"
                  size="md"
                  variant="outline"
                />

                <Textarea
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="What have been on your mind lately?"
                  isInvalid={characterCount > maxLength}
                  size="sm"
                  variant="filled"
                  borderRadius={8}
                  h={250}
                />

                <Text
                  as="i"
                  color={characterCount > maxLength ? "red" : "gray"}
                  fontSize="sm"
                  textAlign="right"
                >
                  {characterCount} characters
                </Text>

                {isShowingAlert && (
                  <Alert status="error">
                    <AlertIcon />
                    <AlertDescription>{alertMssg}</AlertDescription>
                  </Alert>
                )}
              </Stack>
            </ModalBody>

            <ModalFooter display="flex" justifyContent="center">
              <Button colorScheme="blue" onClick={handleSave} w="100%">
                Save
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
}
 
export default CreatePost;
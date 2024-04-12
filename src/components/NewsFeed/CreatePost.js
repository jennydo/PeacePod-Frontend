import React, { useState } from "react";
import axios from "axios";
import { Box, Stack, Input, Button, Textarea, Text, Divider, Image,
        Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure,
        Alert, AlertIcon, AlertDescription, Avatar } from '@chakra-ui/react'

const CreatePost = ( ) => {
    // temporary data, later will fetch from backend or UseContext
    const userId = "66196fbff0454770708cd0a9"
    const user = {
      username: "khoalebatbai",
      avatar: "https://res.cloudinary.com/khoa165/image/upload/q_100/v1577895922/portfolio/avatar.jpg",
    }

    const username = user.username;
    const avatar = user.avatar;
    

    const { isOpen, onOpen, onClose } = useDisclosure()

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [isPrompt, setIsPrompt] = useState(false) 
    const [isShowingAlert, setIsShowingAlert] = useState(false)
    const [alertMssg, setAlertMssg] = useState('')

    const maxLength = 2000;
    const characterCount = content.length;

    const handleClose = () => {
        setIsShowingAlert(false);
        onClose();
    }

    const handleSave = () => {
        // Check if title is not empty and content is not empty or exceeds the maximum length
        if (title !== "" && (content !== "" && characterCount <= maxLength)) {
            const newPost = {
                userId,
                title, 
                content, 
                isPrompt
            }

            axios.post("http://localhost:4000/api/posts/", newPost)
                .then(response => {
                    console.log(response.data);
                    onClose();
                    setTitle('');
                    setContent('');
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
            else if (content === "") {
                setAlertMssg("You must have a body for your post.")
            }
            else if (characterCount > maxLength) {
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
              bg="white"
              w="100%"
              p={5}
              mb={5}
              mt={5}
              borderRadius={70}
              color="black"
              _hover={{ bg: "#E0E0E0" }}
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
                  <Avatar name={username} src={avatar} />
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
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
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
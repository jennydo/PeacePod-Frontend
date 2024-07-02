import React, { useState } from "react";
import axios from "axios";
import { Box, Stack, Input, Button, Textarea, Text, Divider,
        Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure,
        Alert, AlertIcon, AlertDescription, Avatar, Card, HStack } from '@chakra-ui/react';
import { usePostsContext } from "../../hooks/usePostsContext";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useAvatarContext } from "../../hooks/useAvatarContext";

const CreatePost = ( ) => {
    const { user } = useAuthContext();
    const { username } = user.user;
    const { avatar} = useAvatarContext();

    const {dispatch} = usePostsContext();

    const { isOpen, onOpen, onClose } = useDisclosure();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const isPrompt = false;
    const [isShowingAlert, setIsShowingAlert] = useState(false);
    const [alertMssg, setAlertMssg] = useState('');

    const maxLength = 2000;
    const characterCount = content.length;

    const handleClose = () => {
        setIsShowingAlert(false);
        onClose();
    };

    const handleSave = () => {
        // Check if title is not empty and content is not empty or exceeds the maximum length
        if (title !== "" && (content !== "" && characterCount <= maxLength)) {
            const newPost = {
                title, 
                content, 
                isPrompt
            };

            axios.post("http://localhost:4000/api/posts/", newPost, {
              headers: { "Authorization": `Bearer ${user.token}`}
            })
                .then(response => {
                    console.log(response.data);
                    dispatch({
                      type: 'CREATE_POST',
                      payload: response.data
                    });
                    onClose();
                    setTitle('');
                    setContent('');
                    setIsShowingAlert(false);
                })
                .catch(error => {
                    console.error(error);
                });

        } else {
            setIsShowingAlert(true);
            if (title === "") {
                setAlertMssg("You must have a title for your post.");
            }
            else if (content === "") {
                setAlertMssg("You must have a body for your post.");
            }
            else if (characterCount > maxLength) {
                setAlertMssg(`The maximum length is ${maxLength} characters.`);
            }
            else {
                setAlertMssg("Double check your input.");
            }
        }
    };

    return (
      <>
        <Card borderRadius={15}>
          <HStack px={5}>
            <Avatar name={username} src={avatar}/>
            <Box
                  _hover={{ bg: "#A0A0A0" }}
                  bg="#E0E0E0"
                  borderRadius={70}
                  color="black"
                  mb={5}
                  minH={15}
                  mt={5}
                  p={5}
                  w="100%"
                  onClick={onOpen}
                >
                  How are you feeling today?
            </Box>
          </HStack>
          
        </Card>
        
      

        <Modal
          blockScrollOnMount={false}
          isOpen={isOpen}
          motionPreset="slideInBottom"
          scrollBehavior="inside"
          size="xl"
          onClose={handleClose}
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
                  placeholder="Title"
                  size="md"
                  value={title}
                  variant="outline"
                  onChange={(e) => setTitle(e.target.value)}
                />

                <Textarea
                  borderRadius={8}
                  h={250}
                  isInvalid={characterCount > maxLength}
                  placeholder="What have been on your mind lately?"
                  size="sm"
                  value={content}
                  variant="filled"
                  onChange={(e) => setContent(e.target.value)}
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
              <Button colorScheme="blue" w="100%" onClick={handleSave}>
                Save
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
};
 
export default CreatePost;
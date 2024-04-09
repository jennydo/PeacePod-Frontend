import React, { useState } from "react";
import axios from "axios";
import { Box, Stack, Input, Button, Textarea, Text,
        Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure } from '@chakra-ui/react'

const CreatePost = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [isPrompt, setIsPrompt] = useState(false)

    const maxLength = 500;
    const characterCount = body.length;

    const onSave = () => {
        const newPost = {
            title, 
            body, 
            isPrompt
        }

        console.log(newPost);

        axios.post("http://localhost:4000/api/posts/createPost", newPost)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error(error);
            });

        onClose()
    }

    return (
        <>
        <Box onClick={onOpen} 
            bg='grey' w='50%' p={3} 
            borderRadius={10}
            color='white'
            _hover={{ bg: "#E0E0E0" }}>
            How are you feeling today?
        </Box>

        <Modal 
            isOpen={isOpen} 
            onClose={onClose} 
            blockScrollOnMount={false} 
            size="xl"
            motionPreset='slideInBottom'
            scrollBehavior='inside'>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>Share your feeling</ModalHeader>
            <ModalCloseButton />

            <ModalBody>
                <Stack spacing={3}>
                    <Input 
                        value={title}
                        onChange={ (e) => setTitle(e.target.value) }
                        placeholder='Title' 
                        size='md' 
                        variant='outline'/>
                    <Textarea
                        value={body}
                        onChange={ (e) => setBody(e.target.value) }
                        placeholder='What have been on your mind lately?'
                        isInvalid={characterCount > maxLength}
                        size='sm'
                        variant='filled'
                        borderRadius={8}
                    />
                    <Text as='i'
                        color={characterCount > maxLength ? 'red' : 'gray'}
                        fontSize='sm'
                        textAlign='right'>
                            {characterCount} characters
                    </Text>
                </Stack>
            </ModalBody>

            <ModalFooter display="flex" justifyContent="center">
                <Button colorScheme='blue' mr={3} onClick={onSave}>
                Save
                </Button>
            </ModalFooter>
            </ModalContent>
        </Modal>
        </>
    )
}
 
export default CreatePost;
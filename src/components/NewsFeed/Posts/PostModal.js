//import React, { useState } from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent, 
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    ModalFooter,
    Flex,
    Box,
    Text,
    Input,
    Avatar,
    Button,
    Divider
} from '@chakra-ui/react'

const PostModal = ({ finalRef, isOpen, onClose, post, user, formattedTimeStamp}) => {

    return ( 
        <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose} size="5xl" scrollBehavior="inside">
            <ModalOverlay />
            <ModalContent
            sx={{
                borderRadius: "30px",
                paddingLeft: "20px",
                paddingRight: "20px",
            }}
            >
                <ModalHeader>{post && post.title}</ModalHeader>
                <Flex flex="1" gap="5" alignItems="center" flexWrap="wrap" p={4}>
                    {" "}
                    {/* Added padding here */}
                    <Avatar name={user && user.username} src={user && user.avatar} />
                    <Box>
                    <Text fontSize="md">{user?.username}</Text>
                    <Text fontSize="xs">
                        {formattedTimeStamp}
                    </Text>
                    </Box>
                </Flex>

                <ModalCloseButton />

                <ModalBody style={{ whiteSpace: 'pre-line' }}>
                    {post?.content}
                    <Box padding={7}>
                    <Divider w='100%' borderWidth='1px' margin={0}/>  
                    </Box>
                </ModalBody>

            </ModalContent>
        </Modal>
    )
}

export default PostModal
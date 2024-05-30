//import React, { useState } from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent, 
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Flex,
    Box,
    Text,
    Avatar,
    Divider
} from '@chakra-ui/react'

const PostModal = ({ finalRef, isOpen, onClose, post, user, formattedTimeStamp}) => {
    const { avatar, username } = post.userId;

    return ( 
        <Modal 
            finalFocusRef={finalRef} 
            isOpen={isOpen} 
            onClose={onClose} 
            size="5xl" 
            scrollBehavior="inside"
            motionPreset='slideInBottom'
        >
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
                    <Avatar name={username} src={avatar} />
                    <Box>
                    <Text fontSize="md">{username}</Text>
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

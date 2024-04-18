import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Text,
  Flex,
  Avatar,
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  Divider,
} from "@chakra-ui/react";
import Comment from './Comment';
import { useAuthContext } from "../../hooks/useAuthContext";


const PostModal = ({postId, isOpen, onClose, finalRef, title, username, avatar, formattedTimeStamp, content, comments, dispatch}) => {
    const [newComment, setNewComment] = useState("");

    // Id of user currently logged in 
    const { user: commentingUser } = useAuthContext()
    const { _id: commentingUserId } = commentingUser.user

    const handlePostComment = async () => {
        if (!newComment.trim()) return; // Avoid posting empty comments

        try {
        const response = await axios.post(`http://localhost:4000/api/comments/${postId}`, {
            userId: commentingUserId,
            content: newComment
        },{
            headers: { "Authorization": `Bearer ${commentingUser.token}`}
        });
        setNewComment(""); // Clear the input field after posting the comment
        dispatch({
            type: 'CREATE_COMMENT',
            payload: response.data
        })
        } catch (error) {
        console.error("Error posting comment:", error);
        }
    };

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
                <ModalHeader>{title}</ModalHeader>
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
                  {content}
                  <Box padding={7}>
                    <Divider w='100%' borderWidth='1px' margin={0}/>  
                  </Box>
                  {comments && comments.map((comment, idx) => (
                      <Comment comment={comment} key={idx} />
                    ))
                  }
                </ModalBody>


                <ModalFooter>
                    <Input placeholder="Your thought" value={newComment} onChange={(e) => setNewComment(e.target.value)}/>
                    <Button colorScheme="teal" size="md" onClick={handlePostComment}>
                    Send
                    </Button>
                </ModalFooter>
            </ModalContent>

        </Modal>
     );
}
 
export default PostModal;
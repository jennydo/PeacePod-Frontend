import React, { useState } from 'react';
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
} from '@chakra-ui/react';
import axios from 'axios';
import { useCommentsContext } from '../../hooks/useCommentsContext';
import { useAuthContext } from "../../hooks/useAuthContext";
import Comment from './Comment';

const PostModal = ({ finalRef, isOpen, onClose, post, user, formattedTimeStamp}) => {

    const [ newComment, setNewComment ] = useState("");
    const { comments, dispatch } = useCommentsContext();

    // Id of user currently logged in 
    const { user: commentingUser } = useAuthContext();
    const { _id: commentingUserId } = commentingUser.user;

    const handlePostComment = async () => {
        if (!newComment.trim()) return; // Avoid posting empty comments

        try {
        const response = await axios.post(`http://localhost:4000/api/comments/${post._id}`, {
            userId: commentingUserId,
            content: newComment
        },{
            headers: { "Authorization": `Bearer ${commentingUser.token}`}
        });
        setNewComment(""); // Clear the input field after posting the comment
        dispatch({
            type: 'CREATE_COMMENT',
            payload: response.data
        });
        } catch (error) {
        console.error("Error posting comment:", error);
        }
    };

    return ( 
        <Modal finalFocusRef={finalRef} isOpen={isOpen} scrollBehavior="inside"
size="5xl" onClose={onClose}>
            <ModalOverlay />
            <ModalContent
            sx={{
                borderRadius: "30px",
                paddingLeft: "20px",
                paddingRight: "20px",
            }}
            >
                <ModalHeader>{post && post.title}</ModalHeader>
                <Flex alignItems="center" flex="1" flexWrap="wrap"
gap="5" p={4}>
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
                    <Divider borderWidth='1px' margin={0} w='100%'/>  
                    </Box>
                    {comments && comments.map((comment, idx) => (
                        <Comment key={idx} comment={comment} />
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
};

export default PostModal;

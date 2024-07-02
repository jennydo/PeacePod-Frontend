import axios from 'axios';
import {
    Modal,
    ModalOverlay,
    ModalContent, 
    ModalHeader,
    ModalBody,
    ModalFooter,
    ModalCloseButton,
    Flex,
    Box,
    Text,
    Avatar,
    Divider,
    Input,
    Button
} from '@chakra-ui/react';
import letterImage from '../../../assets/images/letter.png';
import { useCommentsContext } from '../../../hooks/useCommentsContext';
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useState } from 'react';
import Comment from './Comment';

const PostModal = ({ finalRef, isOpen, onClose, post, formattedTimeStamp}) => {
  const { avatar, username } = post.userId;
  console.log(isOpen);
  console.log(onClose);

  const [newComment, setNewComment] = useState("");
  const { comments, dispatch } = useCommentsContext();

  // Id of user currently logged in
  const { user: commentingUser } = useAuthContext();
  const { _id: commentingUserId } = commentingUser.user;


  const handlePostComment = async () => {
    if (!newComment.trim()) return; // Avoid posting empty comments

    try {
      const response = await axios.post(
        `http://localhost:4000/api/comments/${post._id}`,
        {
          userId: commentingUserId,
          content: newComment,
        },
        {
          headers: { Authorization: `Bearer ${commentingUser.token}` },
        }
      );
      setNewComment(""); // Clear the input field after posting the comment
      dispatch({
        type: "CREATE_COMMENT",
        payload: response.data,
      });
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  return (
    <Modal
      finalFocusRef={finalRef}
      isOpen={isOpen}
      motionPreset="slideInBottom"
      scrollBehavior="inside"
      size="5xl"
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent
        bgImage={letterImage}
        bgPosition="bottom"
        bgRepeat="no-repeat"
        bgSize="cover"
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
          <Avatar name={username} src={avatar} />
          <Box>
            <Text fontSize="md">{username}</Text>
            <Text fontSize="xs">{formattedTimeStamp}</Text>
          </Box>
        </Flex>

        <ModalCloseButton />

        <ModalBody style={{ whiteSpace: "pre-line" }}>
          {post?.content}
          <Box padding={7}>
            <Divider borderWidth="1px" margin={0} w="100%" />
          </Box>
          {comments &&
            comments.map((comment, idx) => (
              // eslint-disable-next-line react/no-array-index-key
              <Comment key={idx} comment={comment} />
            ))}
        </ModalBody>

        <ModalFooter>
          <Input
            mr={2}
            placeholder="Your thought"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <Button colorScheme="teal" size="md" onClick={handlePostComment}>
            Send
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PostModal;

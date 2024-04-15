import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Text,
  CardHeader,
  CardBody,
  CardFooter,
  Card,
  Flex,
  Avatar,
  Box,
  IconButton,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Input,
  Divider,
  Center
} from "@chakra-ui/react";
import { FaHeart, FaComment } from "react-icons/fa";
import Comment from './Comment';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { useCommentsContext } from "../../hooks/useCommentsContext";

const NormalPost = ({ post }) => {

  // data from post 
  const title = post.title;
  const content = post.content;
  const timeStamp = post.createdAt;
  // format the timestamp to be more readable: "x minutes ago"
  const formattedTimeStamp = formatDistanceToNow(new Date(timeStamp), { addSuffix: true })
  const userId = post.userId;
  const postId = post._id;

  const [user, setUser] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [likes, setLikes] = useState("0");

  const { comments, dispatch } = useCommentsContext();

  const finalRef = React.useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();


// to get the User and the Comments object for the post when the modal is opened and closed and when the component is mounted
  useEffect(() => {
    // get the User object by userId
    axios.get(`http://localhost:4000/api/users/findUser/${userId}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
      });
      
    // get the Comments object for the post
    if (isOpen) {
      axios.get(`http://localhost:4000/api/comments/post/${postId}`)
        .then((response) => {
          dispatch({
            type: 'GET_COMMENTS', 
            payload: response.data
          })
          console.log("Comments response", response.data);
        })
        .catch((error) => {
          console.error("Error fetching comments:", error);
        });
    } else {
      dispatch({
        // clear comments when the modal is closed to avoid showing the previous comments when opening the modal again
        type: 'CLEAR_COMMENTS', 
      })
    }

    axios.get(`http://localhost:4000/api/reactions/total/${postId}`)
      .then((response) => {
        const likes = response.data;
        setLikes(likes);
      })
      .catch((error) => {
        console.error("Error fetching likes:", error);
      });

  }, [postId, userId, dispatch, isOpen, onClose]);

  // Temporary user id
  const commentingUserId = "66196ea6536f9e9410f53de9";

  const handlePostComment = async () => {
    if (!newComment.trim()) return; // Avoid posting empty comments

    try {
      const response = await axios.post(`http://localhost:4000/api/comments/${postId}`, {
        userId: commentingUserId,
        content: newComment
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

  const { avatar, username } = user || {};

  const previewNum = 50
  const words = content.split(' ');
  const preview = words.slice(0, previewNum).join(' ');

  return (
    <> 
      <Card w="100%">
        <CardHeader mb="-8">
          <Flex spacing="4">
            <Flex flex="1" gap="5" alignItems="center" flexWrap="wrap">
              <Avatar name={username} src={avatar} />
              <Box>
                <Text fontSize="md">{username}</Text>
                <Text fontSize="xs">
                  {formattedTimeStamp}
                </Text>
              </Box>
            </Flex>
            <IconButton
              variant="ghost"
              colorScheme="gray"
              aria-label="See menu"
            />
          </Flex>
          <Text fontSize="xl">{title}</Text>
        </CardHeader>

        <CardBody>
          <Text>{preview}</Text> 
          <Text onClick={onOpen}
                color="gray.500" 
                fontStyle="italic" 
                _hover={{ color: "blue.500", textDecoration: "underline" }}>
                  Read more...</Text>
        </CardBody>

        <Center>
          <Divider width='95%' borderWidth='1px' margin={0}/>          
        </Center>


        <CardFooter
          justify="space-between"
          flexWrap="wrap"
          sx={{
            "& > button": {
              minW: "136px",
            },
          }}
          padding={2}
        >
          <Button flex="1" variant="ghost" leftIcon={<FaHeart />}>
            {likes.count}
            
          </Button>
          <Button flex="1" variant="ghost" onClick={onOpen} leftIcon={<FaComment />} >
            Comment
          </Button>
        </CardFooter>

      </Card>

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
    </>
  );
};

export default NormalPost;

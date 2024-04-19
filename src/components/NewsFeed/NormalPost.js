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
  useDisclosure,
  Divider,
  Center
} from "@chakra-ui/react";
import { FaHeart, FaComment } from "react-icons/fa";
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { useCommentsContext } from "../../hooks/useCommentsContext";
import PostModal from "./PostModal";
import { useAuthContext } from "../../hooks/useAuthContext";

const NormalPost = ({ post }) => {

  // data from post 
  const { title, content, createdAt: timeStamp, userId, _id: postId } = post
  // format the timestamp to be more readable: "x minutes ago"
  const formattedTimeStamp = formatDistanceToNow(new Date(timeStamp), { addSuffix: true })

  const [user, setUser] = useState(null);
  const { comments, dispatch } = useCommentsContext();

  const finalRef = React.useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

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
  }, [postId, userId, dispatch, isOpen]);

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
              <Avatar name={username} src={avatar} bg='green.100'/>
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
            Like
          </Button>
          <Button flex="1" variant="ghost" onClick={onOpen} leftIcon={<FaComment />} >
            Comment
          </Button>
        </CardFooter>

      </Card>

      <PostModal finalRef={finalRef} isOpen={isOpen} onClose={onClose} post={post} user={user} formattedTimeStamp={formattedTimeStamp}/>
    </>
  );
};

export default NormalPost;

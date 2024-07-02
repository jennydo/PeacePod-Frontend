import React, { useEffect, useState } from 'react';
import {
  Text,
  CardHeader,
  CardBody,
  CardFooter,
  Card,
  Button,
  useDisclosure,
  Center,
  Divider,
  VStack,
  IconButton,
  Flex,
  Avatar,
  Box
} from "@chakra-ui/react";
import { FaHeart, FaComment } from "react-icons/fa";
import axios from 'axios';
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow';
import Comment from './Comment';
import { useCommentsContext } from '../../hooks/useCommentsContext';
import PostModal from "./PostModal";

import Logo from '../../assets/images/sign.png';

const PromptPost = ({ post }) => {
    const timeStamp = post?.createdAt;
    // format the timestamp to be more readable: "x minutes ago"
    const formattedTimeStamp = post && formatDistanceToNow(new Date(timeStamp), { addSuffix: true });

    const [user, setUser] = useState(null);
    const { dispatch } = useCommentsContext();
    const [ displayedComments, setDisplayedComments ] = useState(null);

    const finalRef = React.useRef(null);

    const { isOpen: isOpenPrompt, onOpen: onOpenPrompt, onClose: onClosePrompt } = useDisclosure();

    /// Get all comments for prompt
    useEffect(() => {
      if (!post)
        return;

      // get the User object by userId
      axios.get(`http://localhost:4000/api/users/findUser/${post.userId}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
      });
      
      // get the Comments object for the post
      axios.get(`http://localhost:4000/api/comments/post/${post._id}`)
        .then((response) => {
          const latestComments = response.data.slice(0, 3);
          console.log("Comments previewed ", latestComments);
          setDisplayedComments(latestComments);

          if (isOpenPrompt) {
            dispatch({
              type: 'GET_COMMENTS', 
              payload: response.data
            });
          } else {
              dispatch({
                type: 'CLEAR_COMMENTS', 
              });
          }
        })
        .catch((error) => {
          console.error("Error fetching comments:", error);
        });
    }, [post, dispatch, isOpenPrompt]);

    return (
    <>
      <Card borderRadius={15} mb={4} mt={4}
w='100%'>
        <CardHeader mb="-8">
            <Flex spacing="4">
              <Flex alignItems="center" flex="1" flexWrap="wrap"
gap="5">
                <Avatar bg='green.100' name="PeacePod" src={Logo}/>
                <Box>
                  <Text fontSize="md">PeacePod</Text>
                  <Text fontSize="xs">
                    {formattedTimeStamp}
                  </Text>
                </Box>
              </Flex>
              <IconButton
                aria-label="See menu"
                colorScheme="gray"
                variant="ghost"
              />
            </Flex>
            <Text fontSize="xl">{post && post.title}</Text>
          </CardHeader>

        <CardBody paddingBottom='0px' paddingTop='0px' >
          <Text fontSize='2xl'>{post && post.content}</Text>
        </CardBody>

        <Center margin={0}>
          <Divider borderWidth='1px' margin={0} width='95%'/>          
        </Center>

        <CardFooter
          flexWrap="wrap"
          justify="space-around"
          padding='15px'
          sx={{
            "& > button": {
              minW: "136px",
            },
          }}
        >
          <Button flex="1" leftIcon={<FaHeart />} variant="ghost">
            Like
          </Button>
          <Button flex="1" leftIcon={<FaComment />} variant="ghost"
onClick={onOpenPrompt}>
            Comment
          </Button>
        </CardFooter>

        <Center margin={0}>
          <Divider borderWidth='1px' margin={0} width='95%'/>          
        </Center>

        <Text 
          _hover={{ color: "blue.500", textDecoration: "underline" }} 
          color="gray.500" 
          fontStyle="italic" 
          justifyContent='left'
          marginLeft='15px' marginRight='15px' marginTop='5px' 
          width='max-content' onClick={onOpenPrompt}>
          {displayedComments && displayedComments.length > 0? "View more comments": ""}
        </Text>

        {/* Comment for Prompt Post */}
        <VStack align='left'>
          {
            displayedComments && displayedComments.map((comment, idx) => (
              // eslint-disable-next-line react/no-array-index-key
              <Comment key={idx} comment={comment} />
            ))
          }
        </VStack>
      </Card>
      
      <PostModal finalRef={finalRef} formattedTimeStamp={formattedTimeStamp} isOpen={isOpenPrompt}
post={post} user={user} onClose={onClosePrompt}/>

    </>
  );
};

export default PromptPost;
import React, { useEffect, useState } from 'react'
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

import Logo from '../../assets/images/sign.png'

const PromptPost = ({ post }) => {
    const timeStamp = post?.createdAt;
    // format the timestamp to be more readable: "x minutes ago"
    const formattedTimeStamp = post && formatDistanceToNow(new Date(timeStamp), { addSuffix: true })

    const [user, setUser] = useState(null);
    const { comments, dispatch } = useCommentsContext()
    const [ displayedComments, setDisplayedComments ] = useState(null)

    const finalRef = React.useRef(null);

    const { isOpen: isOpenPrompt, onOpen: onOpenPrompt, onClose: onClosePrompt } = useDisclosure();

    /// Get all comments for prompt
    useEffect(() => {
      if (!post)
        return

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
          const latestComments = response.data.slice(0, 3)
          console.log("Comments previewed ", latestComments)
          setDisplayedComments(latestComments)

          if (isOpenPrompt) {
            dispatch({
              type: 'GET_COMMENTS', 
              payload: response.data
            })
          } else {
              dispatch({
                type: 'CLEAR_COMMENTS', 
              })
          }
        })
        .catch((error) => {
          console.error("Error fetching comments:", error);
        });
    }, [post, dispatch, isOpenPrompt]);

    return (
    <>
      <Card w='100%' mt={4} mb={4} borderRadius={15}>
        <CardHeader mb="-8">
            <Flex spacing="4">
              <Flex flex="1" gap="5" alignItems="center" flexWrap="wrap">
                <Avatar name="PeacePod" src={Logo} bg='green.100'/>
                <Box>
                  <Text fontSize="md">PeacePod</Text>
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
            <Text fontSize="xl">{post && post.title}</Text>
          </CardHeader>

        <CardBody paddingTop='0px' paddingBottom='0px' >
          <Text fontSize='2xl'>{post && post.content}</Text>
        </CardBody>

        <Center margin={0}>
          <Divider width='95%' borderWidth='1px' margin={0}/>          
        </Center>

        <CardFooter
          justify="space-around"
          flexWrap="wrap"
          sx={{
            "& > button": {
              minW: "136px",
            },
          }}
          padding='15px'
        >
          <Button variant="ghost" flex="1" leftIcon={<FaHeart />}>
            Like
          </Button>
          <Button variant="ghost" flex="1" onClick={onOpenPrompt} leftIcon={<FaComment />}>
            Comment
          </Button>
        </CardFooter>

        <Center margin={0}>
          <Divider width='95%' borderWidth='1px' margin={0}/>          
        </Center>

        <Text 
          onClick={onOpenPrompt} 
          color="gray.500" 
          fontStyle="italic" 
          _hover={{ color: "blue.500", textDecoration: "underline" }}
          marginLeft='15px' marginRight='15px' marginTop='5px' 
          justifyContent='left' width='max-content'>
          {displayedComments && displayedComments.length > 0? "View more comments": ""}
        </Text>

        {/* Comment for Prompt Post */}
        <VStack align='left'>
          {
            displayedComments && displayedComments.map((comment, idx) => (
              <Comment comment={comment} key={idx} />
            ))
          }
        </VStack>
      </Card>
      
      <PostModal finalRef={finalRef} isOpen={isOpenPrompt} onClose={onClosePrompt} post={post} user={user} formattedTimeStamp={formattedTimeStamp}/>

    </>
  )
}

export default PromptPost
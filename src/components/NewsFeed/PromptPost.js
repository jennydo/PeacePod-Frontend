import React, { useEffect, useState } from 'react'
import {
  Text,
  CardHeader,
  CardBody,
  CardFooter,
  Card,
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
  Center,
  Divider,
  VStack,
  IconButton,
  Flex,
  Avatar,
  Box
} from "@chakra-ui/react";

import { FaHeart, FaComment } from "react-icons/fa";
import { BsSendFill } from "react-icons/bs";
import axios from 'axios';
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow';

import Comment from './Comment';
import { useCommentsContext } from '../../hooks/useCommentsContext';
import { useAuthContext } from '../../hooks/useAuthContext';

import Logo from '../../assets/images/sign.png'

const PromptPost = ({ post }) => {

    const timeStamp = post?.createdAt;
    // format the timestamp to be more readable: "x minutes ago"
    const formattedTimeStamp = post && formatDistanceToNow(new Date(timeStamp), { addSuffix: true })

    const [ newComment, setNewComment ] = useState("")
    const { comments, dispatch } = useCommentsContext()
    const [ displayedComments, setDisplayedComments ] = useState(null)

    const finalRef = React.useRef(null);

    const { isOpen, onOpen, onClose } = useDisclosure();

    // Id of user currently logged in 
  const { user: commentingUser } = useAuthContext()
  const { _id: commentingUserId } = commentingUser.user

    /// Get all comments for prompt
    useEffect(() => {
      if (!post)
        return
      
      // get the Comments object for the post
      axios.get(`http://localhost:4000/api/comments/post/${post._id}`)
        .then((response) => {

          const latestComments = response.data.slice(0, 3)
          console.log("Comments previewed ", latestComments)
          setDisplayedComments(latestComments)

          if (isOpen) {
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
    }, [post, dispatch, isOpen]);

    /// Send comment
    const handlePostComment = async () => {
      if (!newComment.trim() || !post) return; // Avoid posting empty comments
  
      try {
        const response = await axios.post(`http://localhost:4000/api/comments/${post._id}`, {
          userId: commentingUserId,
          content: newComment
        }, {
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
    /// End handle send comment

    return (
    <>
      <Card w='100%' mt={4} mb={4}>
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
          <Button variant="ghost" flex="1" onClick={onOpen} leftIcon={<FaComment />}>
            Comment
          </Button>
        </CardFooter>

        <Center margin={0}>
          <Divider width='95%' borderWidth='1px' margin={0}/>          
        </Center>

        <Text 
          onClick={onOpen} 
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
      
      {/* Pop up modal when click comment or see more */}
      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose} size='5xl' >
        <ModalOverlay />
        <ModalContent
          sx={{
            borderRadius: "30px",
            paddingLeft: "20px",
            paddingRight: "20px",
            backgroundColor: "aliceblue", // Replace 'yourBackgroundColor' with your desired color
          }}
        >
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Card>
              <CardHeader>
                <Text fontSize='xl'>Prompt of the day!!!</Text>
              </CardHeader>

              <CardBody paddingTop={0} paddingBottom={0}>
                <Text>{post && post.content}</Text>
              </CardBody>

              <Center margin={0}>
                <Divider width='95%' borderWidth='1px' margin={0}/>          
              </Center>

              {/* Comment for Prompt Post */}
              <VStack align='left'>
                {
                  comments && comments.map((comment, idx) => (
                    <Comment comment={comment} key={idx} />
                  ))
                }
              </VStack>
            </Card>
          </ModalBody>
          <ModalFooter>
            <Input placeholder='Your thought' marginRight={3} value={newComment} onChange={(e) => setNewComment(e.target.value)}/>
            <IconButton 
              aria-label='comment' 
              background='blanchedalmond'
              size="md" 
              icon={<div color='red'><BsSendFill style={{color: 'red'}}/></div>}   
              onClick={handlePostComment}
            />
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* End modal */}
    </>
  )
}

export default PromptPost
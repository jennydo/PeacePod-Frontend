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
  
} from "@chakra-ui/react";

import { FaHeart, FaComment } from "react-icons/fa";
import { BsSendFill } from "react-icons/bs";
import axios from 'axios';

import Comment from './Comment';
import { useCommentsContext } from '../../hooks/useCommentsContext';
import { useAuthContext } from '../../hooks/useAuthContext';

const PromptPost = ({ post }) => {

    const { user } = useAuthContext()
    const [ newComment, setNewComment ] = useState("")
    const { comments, dispatch: commentsDispatch} = useCommentsContext()

    const finalRef = React.useRef(null);

    const { isOpen, onOpen, onClose } = useDisclosure();

    // Temporary user id
    const commentingUserId = "661f385d7bc0dc0597752644";

    const handlePostComment = async () => {
      if (!newComment.trim()) return; // Avoid posting empty comments
  
      try {
        const response = await axios.post(`http://localhost:4000/api/comments/${post._id}`, {
          userId: commentingUserId,
          content: newComment
        }, {
          headers: { "Authorization": `Bearer ${user.token}`}
        });
        setNewComment(""); // Clear the input field after posting the comment
        commentsDispatch({
          type: 'CREATE_COMMENT',
          payload: response.data
        })
      } catch (error) {
        console.error("Error posting comment:", error);
      }
    };

    return (
    <>
      <Card w='100%' mt={4} mb={4}>
        <CardHeader mb="-8">
            <Flex spacing="4">
              <Flex flex="1" gap="5" alignItems="center" flexWrap="wrap">
                <Avatar name="PeacePod" src="https://res-console.cloudinary.com/dirace6tl/thumbnails/v1/image/upload/v1713207021/c2lnbl9rcTl3dW4=/preview" bg='green.100'/>
                <Text fontSize="md" marginBottom="0px">PeacePod</Text>
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
          View more comments
        </Text>

        {/* Comment for Prompt Post */}
        <VStack align='left'>
          {
            comments && comments.map((comment, idx) => (
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
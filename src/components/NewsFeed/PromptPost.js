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
} from "@chakra-ui/react";
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { FaHeart, FaComment } from "react-icons/fa";
import axios from 'axios';
import { useCommentsContext } from '../../hooks/useCommentsContext';
import PostModal from "./PostModal";
import Comment from './Comment';

const PromptPost = ({ post }) => {
    console.log("Prompt Post object: ", post)
    const { comments, dispatch: commentsDispatch} = useCommentsContext()
    const [ displayedComments, setDisplayedComments ] = useState([])
    const formattedTimeStamp = formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })

    const finalRef = React.useRef(null);

    const { isOpen: isOpenPrompt, onOpen: onOpenPrompt, onClose: onClosePrompt } = useDisclosure();

    useEffect(() => {   
      axios.get(`http://localhost:4000/api/comments/post/${post._id}`)
        .then((response) => {
          const latestComments = response.data.slice(Math.max(response.data.length - 2, 0));
          setDisplayedComments(latestComments)
          console.log("Display coments ", displayedComments)
          console.log("Comments response", response.data);
          if (isOpenPrompt) {
            commentsDispatch({
              type: 'GET_COMMENTS', 
              payload: response.data
            })
          } else {
              commentsDispatch({
                type: 'CLEAR_COMMENTS', 
              })
          }
        })
        .catch((error) => {
          console.error("Error fetching comments:", error);
        });
    }, [commentsDispatch, isOpenPrompt]);

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
          View more comments
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
      
      <PostModal postId={post._id} isOpen={isOpenPrompt} onClose={onClosePrompt} finalRef={finalRef} 
                title={post.title} username={post.username} avatar={post.avatar} 
                formattedTimeStamp={formattedTimeStamp} 
                content={post.content} comments={comments} dispatch={commentsDispatch}/>
    </>
  )
}

export default PromptPost
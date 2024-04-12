import React, { useEffect, useState } from 'react'
import {
  Text,
  CardHeader,
  CardBody,
  CardFooter,
  Card,
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
  useDisclosure,
  Input,
  Center,
  Divider,
  VStack,
  IconButton,
} from "@chakra-ui/react";
import { FaHeart, FaComment } from "react-icons/fa";
import { BsSendFill } from "react-icons/bs";
import axios from 'axios';

import Comment from './Comment';

const PromptPost = () => {
    const avatar =
        "https://res.cloudinary.com/khoa165/image/upload/q_100/v1577895922/portfolio/avatar.jpg";
    const username = "khoale";

    const [ prompt, setPrompt ] = useState("")
    /// axios to get prompt
    const getPrompt = async () => {

      const newPrompt = await axios.get("http://localhost:4000/api/posts/prompt")
      console.log("New Prompt is ", newPrompt.data)
      setPrompt(newPrompt.data)
    }

    useEffect(() => {
      getPrompt()
      setInterval(() => {
        getPrompt()
      }, 5 * 1000)
    }, [])


    const finalRef = React.useRef(null);
    const timeStamp = new Date();

    const { isOpen, onOpen, onClose } = useDisclosure();

    /// Replace with axios get later to get comments
    const comments = [
      "Hom nay luon ne minh vua tu chuoi non duoc len chuoi noi ne",
      "Anh khue la con de non",
      `Anh khue la con de non, Anh khue la con de non, Anh khue la con de non, Anh khue la con de non
      Anh khue la con de non, Anh khue la con de non, Anh khue la con de non, Anh khue la con de non
      Anh khue la con de non, Anh khue la con de non, Anh khue la con de non, Anh khue la con de non,
      Anh khue la con de non, Anh khue la con de non, Anh khue la con de non, Anh khue la con de non,
      Anh khue la con de non, Anh khue la con de non, Anh khue la con de non, Anh khue la con de non
      Anh khue la con de non, Anh khue la con de non, Anh khue la con de non, Anh khue la con de non`
    ]

    return (
    <>
      <Card w='100%' mt={4} mb={4}>
        <CardHeader>
            <Text fontSize='3xl'>Prompt of the day!!!</Text>
        </CardHeader>

        <CardBody paddingTop='0px' paddingBottom='0px' >
          <Text fontSize='2xl'>{prompt}</Text>
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

        <Button variant='ghost' onClick={onOpen} marginLeft='15px' marginRight='15px' marginTop='5px' justifyContent='left' width='max-content'>
          View more comments
        </Button>

        {/* Comment for Prompt Post */}
        <VStack align='left'>
          {
            comments && comments.slice(0, 2).map((comment, idx) => (
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
                <Text>{prompt}</Text>
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
            <Input placeholder='Your thought' marginRight={3} />
            <IconButton 
              aria-label='comment' 
              background='blanchedalmond'
              size="md" 
              icon={<div color='red'><BsSendFill style={{color: 'red'}}/></div>}   
            />
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* End modal */}
    </>
  )
}

export default PromptPost
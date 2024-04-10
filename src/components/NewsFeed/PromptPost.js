import React from 'react'
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
} from "@chakra-ui/react";

import Comment from './Comment';

const PromptPost = () => {
    const avatar =
        "https://res.cloudinary.com/khoa165/image/upload/q_100/v1577895922/portfolio/avatar.jpg";
    const username = "khoale";
    const prompt = "What is the last time you feel cheerful? 😁";
    const finalRef = React.useRef(null);
    const timeStamp = new Date();

    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
    <>
      <Card width='60%' bg='aliceblue' margin='15px'>
        <CardHeader>
            <Text fontSize='3xl'>Prompt of the day!!!</Text>
        </CardHeader>

        <CardBody paddingTop='0px' paddingBottom='0px' >
          <Text fontSize='2xl'>{prompt}</Text>
        </CardBody>

        <Center margin={0}>
          <Divider width='90%' borderWidth='1px' />          
        </Center>

        <CardFooter
          justify="space-between"
          flexWrap="wrap"
          sx={{
            "& > button": {
              minW: "136px",
            },
          }}
          margin={0}
          padding={0}
        >
          <Button flex="1" variant="ghost">
            Like
          </Button>
          <Button flex="1" variant="ghost" onClick={onOpen}>
            Comment
          </Button>
        </CardFooter>

        <Center margin={0}>
            <Divider width='90%' borderWidth='1px' />          
        </Center>

        {/* Comment for Prompt Post */}
        <VStack align='left'>
          <Comment comment={"Hom nay luon ne minh vua tu chuoi non duoc len chuoi noi ne"} />
          <Comment comment={"Anh khue la con de non"} />
        </VStack>
      </Card>

      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
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
          <Flex flex="1" gap="5" alignItems="center" flexWrap="wrap" p={4}>
            {" "}
            {/* Added padding here */}
            <Avatar name={username} src={avatar} />
            <Box>
              <Text fontSize="md">{username}</Text>
              <Text fontSize="xs">
                {timeStamp.toLocaleDateString()}{" "}
                {timeStamp.toLocaleTimeString()}
              </Text>
            </Box>
          </Flex>
          <ModalCloseButton />
          <ModalBody></ModalBody>
          <ModalFooter>
          <Input placeholder='Basic usage' />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default PromptPost
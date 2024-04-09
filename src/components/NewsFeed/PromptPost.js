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
} from "@chakra-ui/react";

const PromptPost = () => {
    const avatar =
        "https://res.cloudinary.com/khoa165/image/upload/q_100/v1577895922/portfolio/avatar.jpg";
    const username = "khoale";
    const prompt = "What is the lastest time you feel cheerful?";
    const finalRef = React.useRef(null);
    const body =
        "I'm overjoyed to share that I finally completed my 10-page research paper! 📚💪 It was a challenging journey, but I persevered and put in the hard work. Now, I can proudly say that it's done and dusted! 🎓✨";
    const timeStamp = new Date();

    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
    <>
      <Card maxW="lg" >
        <CardHeader>
            <Text fontSize='3xl'>Prompt of the day!!!</Text>
        </CardHeader>

        <CardBody>
          <Text fontSize='2xl'>{prompt}</Text>
        </CardBody>

        <CardFooter
          justify="space-between"
          flexWrap="wrap"
          sx={{
            "& > button": {
              minW: "136px",
            },
          }}
        >
          <Button flex="1" variant="ghost">
            Like
          </Button>
          <Button flex="1" variant="ghost" onClick={onOpen}>
            Comment
          </Button>
        </CardFooter>
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
          <ModalBody>{body}</ModalBody>
          <ModalFooter>
          <Input placeholder='Basic usage' />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default PromptPost
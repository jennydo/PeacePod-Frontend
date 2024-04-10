import React, { useState } from "react";
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

const NormalPost = ({ post }) => {

  // temporary data
  const avatar =
    "https://res.cloudinary.com/khoa165/image/upload/q_100/v1577895922/portfolio/avatar.jpg";
  const username = "khoale";

  // data from post 
  const title = post.title;
  const body = post.body;
  const timeStamp = post.createdAt;
  
  const finalRef = React.useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [comment, setComment] = useState("");

  return (
    <>
      <Card width='60%' margin='15px' bg='#fefefe'>
        <CardHeader>
          <Flex spacing="4">
            <Flex flex="1" gap="5" alignItems="center" flexWrap="wrap">
              <Avatar name={username} src={avatar} />
              <Box>
                <Text fontSize="md">{username}</Text>
                <Text fontSize="xs">
                  {" "}
                  {timeStamp}{" "}
                  {timeStamp}{" "}
                </Text>
              </Box>
              <Text fontSize="md">{title}</Text>
            </Flex>
            <IconButton
              variant="ghost"
              colorScheme="gray"
              aria-label="See menu"
            />
          </Flex>
        </CardHeader>
        <CardBody paddingTop='0px' paddingBottom='0px'>
          <Text>{body}</Text>
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
      </Card>

      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
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
                {timeStamp}{" "}
                {timeStamp}
              </Text>
            </Box>
          </Flex>
          <ModalCloseButton />
          <ModalBody>{body}</ModalBody>
          <ModalFooter>
            <Input placeholder="Your thought" />
            <Button colorScheme="teal" size="md">
              Send
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default NormalPost;

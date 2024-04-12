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
  VStack
} from "@chakra-ui/react";
import { format } from 'date-fns';


const NormalPost = ({ post }) => {

  // temporary data
  const avatar =
    "https://res.cloudinary.com/khoa165/image/upload/q_100/v1577895922/portfolio/avatar.jpg";
  const username = "khoale";

  // data from post 
  const title = post.title;
  const content = post.content;
  const timeStamp = post.createdAt;
  const formattedTimeStamp = format(new Date(timeStamp), 'MMMM dd, yyyy - HH:mm:ss');

  // Split the content into words
  const words = content.split(' ');
  // Select the first 100 words
  const first50Words = words.slice(0, 50).join(' ');
  
  const finalRef = React.useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [comment, setComment] = useState("");

  return (
    <>
      <Card w="100%">
        <CardHeader>
          <Flex spacing="4">
            <Flex flex="1" gap="5" alignItems="center" flexWrap="wrap">
              <Avatar name={username} src={avatar} />
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
          <Text fontSize="lg">{title}</Text>
        </CardHeader>
        <CardBody>
          <Text>{first50Words}</Text> 
          <Text onClick={onOpen}
                color="gray.500" 
                fontStyle="italic" 
                _hover={{ color: "blue.500" }}>
                  Read more...</Text>
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

      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose} size="xl" scrollBehavior="inside">
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
                        {formattedTimeStamp}
                    </Text>
                    </Box>
                </Flex>

                <ModalCloseButton />

                <ModalBody>{content}</ModalBody>

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

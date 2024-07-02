import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Stack,
  Input,
  Button,
  Textarea,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Alert,
  AlertIcon,
  AlertDescription,
  Avatar,
  HStack,
  Image,
} from "@chakra-ui/react";
import { usePostsContext } from "../../../hooks/usePostsContext";
import { useAuthContext } from "../../../hooks/useAuthContext";

const CreatePostcard = ({ isOpen, onClose }) => {
  const { user } = useAuthContext();
  const { username, avatar } = user.user;
  const { dispatch } = usePostsContext();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [postImageUrl, setPostImageUrl] = useState("");
  const [allPostImageUrls, setAllPostImageUrls] = useState([]);
  const isPrompt = false;
  const [isShowingAlert, setIsShowingAlert] = useState(false);
  const [alertMssg, setAlertMssg] = useState("");
  const [chosenImage, setChosenImage] = useState(null);

  const maxLength = 2000;
  const characterCount = content.length;

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/cloudinary/postImages", {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((response) => {
        setAllPostImageUrls(response.data);
      });
  }, [dispatch, user.token]);

  const handleClose = () => {
    setIsShowingAlert(false);
    onClose();
  };

  const handleSave = () => {
    console.log(postImageUrl);
    // Check if title is not empty and content is not empty or exceeds the maximum length
    if (title !== "" && content !== "" && characterCount <= maxLength) {
      const newPost = {
        title,
        content,
        isPrompt,
        postImageUrl,
      };

      axios
        .post("http://localhost:4000/api/posts/", newPost, {
          headers: { Authorization: `Bearer ${user.token}` },
        })
        .then((response) => {
          // console.log(response.data);
          dispatch({
            type: "CREATE_POST",
            payload: response.data,
          });
          onClose();
          setTitle("");
          setContent("");
          setPostImageUrl("");
          setIsShowingAlert(false);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      setIsShowingAlert(true);
      if (title === "") {
        setAlertMssg("You must have a title for your post.");
      } else if (content === "") {
        setAlertMssg("You must have a body for your post.");
      } else if (characterCount > maxLength) {
        setAlertMssg(`The maximum length is ${maxLength} characters.`);
      } else {
        setAlertMssg("Double check your input.");
      }
    }
  };

  return (
    <>
      <Modal
        blockScrollOnMount={false}
        isOpen={isOpen}
        motionPreset="slideInBottom"
        scrollBehavior="inside"
        size="xl"
        onClose={handleClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Let the letter bring your words to the sky</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <Stack spacing={3}>
              <Stack direction="row" spacing="10px">
                <Avatar name={username} src={avatar} />
                <Text>{username}</Text>
              </Stack>

              <Input
                placeholder="Your postcard topic..."
                size="md"
                value={title}
                variant="outline"
                onChange={(e) => setTitle(e.target.value)}
              />

              <Textarea
                bgImage={chosenImage}
                bgSize="cover"
                borderRadius={8}
                h={250}
                isInvalid={characterCount > maxLength}
                placeholder="What did you tell the birds?"
                size="sm"
                value={content}
                variant="filled"
                onChange={(e) => setContent(e.target.value)}
              />

              <Text
                as="i"
                color={characterCount > maxLength ? "red" : "gray"}
                fontSize="sm"
                textAlign="right"
              >
                {characterCount} characters
              </Text>

              {isShowingAlert && (
                <Alert status="error">
                  <AlertIcon />
                  <AlertDescription>{alertMssg}</AlertDescription>
                </Alert>
              )}
            </Stack>

            <HStack>
              {allPostImageUrls &&
                allPostImageUrls.map((imageUrl, idx) => (
                  <Image
                    // eslint-disable-next-line react/no-array-index-key
                    key={idx}
                    border={imageUrl === chosenImage ? '3px solid red' : 'none'}
                    h={30}
                    src={imageUrl}
                    w={30}
                    onClick={() => {
                      setPostImageUrl(imageUrl);
                      setChosenImage(imageUrl);
                    }}
                  />
                ))}
            </HStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" w="100%" onClick={handleSave}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreatePostcard;

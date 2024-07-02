import React, { useState, useEffect } from "react";
import axios from "axios";
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
  useDisclosure,
  Divider,
  Center
} from "@chakra-ui/react";
import { FaHeart, FaComment, FaRegHeart } from "react-icons/fa";
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { useCommentsContext } from "../../hooks/useCommentsContext";
import { useAuthContext } from "../../hooks/useAuthContext";
import PostModal from "./PostModal";

const NormalPost = ({ post }) => {

  // data from post 
  const { title, content, createdAt: timeStamp, userId, _id: postId } = post;
  // format the timestamp to be more readable: "x minutes ago"
  const formattedTimeStamp = formatDistanceToNow(new Date(timeStamp), { addSuffix: true });

  const [user, setUser] = useState(null);
  const [likes, setLikes] = useState("0"); // count of likes
  const [reacted, setReacted] = useState(false); // boolean to check if the user has reacted to the post
  const { dispatch } = useCommentsContext();

  const finalRef = React.useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { user: commentingUser } = useAuthContext();
  const { _id: commentingUserId } = commentingUser.user;

  // to get the User and the Comments object for the post when the modal is opened and closed and when the component is mounted
  useEffect(() => {
    // get the User object by userId
    axios.get(`http://localhost:4000/api/users/findUser/${userId}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
      });

    // get the Comments object for the post
    
      axios.get(`http://localhost:4000/api/comments/post/${postId}`)
        .then((response) => {
          dispatch({
            type: 'GET_COMMENTS',
            payload: response.data
          });
          console.log("Comments response", response.data);
        })
        .catch((error) => {
          console.error("Error fetching comments:", error);
        });
  }, [postId, userId, dispatch, isOpen]);

  // get the count of likes when the component is mounted
  useEffect(() => {
    axios.get(`http://localhost:4000/api/reactions/${postId}/total`)
      .then((response) => {
        const likes = response.data;
        setLikes(likes);
      })
      .catch((error) => {
        console.error("Error fetching likes:", error);
      });
  }, [postId, reacted]);

  // check if the user has reacted to the post
  useEffect(() => {
    axios.get(`http://localhost:4000/api/reactions/${postId}/${commentingUserId}/isReacted`)
      .then((response) => {
        setReacted(response.data);
      })
      .catch((error) => {
        console.error("Error fetching reaction:", error);
      });
  }, [postId]);

  // handle the like/unlike functionality
  const handleReact = async () => {
    if (reacted) {
      await axios.delete(`http://localhost:4000/api/reactions/${postId}/${commentingUserId}`);
      setReacted(false);
      console.log("Unreacted");
    } else {
      await axios.post(`http://localhost:4000/api/reactions/${postId}/${commentingUserId}`);
      setReacted(true);
      console.log("Reacted");
    }
  };
  const { avatar, username } = user || {};

  const previewNum = 50;
  const words = content.split(' ');
  const preview = words.slice(0, previewNum).join(' ');

  return (
    <> 
      <Card borderRadius={15} w="100%">
        <CardHeader mb="-8">
          <Flex spacing="4">
            <Flex alignItems="center" flex="1" flexWrap="wrap"
gap="5">
              <Avatar bg='green.100' name={username} src={avatar}/>
              <Box>
                <Text fontSize="md">{username}</Text>
                <Text fontSize="xs">
                  {formattedTimeStamp}
                </Text>
              </Box>
            </Flex>
            <IconButton
              aria-label="See menu"
              colorScheme="gray"
              variant="ghost"
            />
          </Flex>
          <Text fontSize="xl">{title}</Text>
        </CardHeader>

        <CardBody>
          <Text>{preview}</Text>
          <Text _hover={{ color: "blue.500", textDecoration: "underline" }}
            color="gray.500"
            fontStyle="italic"
            onClick={onOpen}>
            Read more...</Text>
        </CardBody>

        <Center>
          <Divider borderWidth='1px' margin={0} width='95%' />
        </Center>


        <CardFooter
          flexWrap="wrap"
          justify="space-between"
          padding={2}
          sx={{
            "& > button": {
              minW: "136px",
            },
          }}
        >
          <Button flex="1" leftIcon={reacted ? <FaHeart /> : <FaRegHeart />} variant="ghost"
onClick={handleReact}>
            {likes.count === 0 ? "" : likes.count}
          </Button>
          <Button flex="1" leftIcon={<FaComment />} variant="ghost"
onClick={onOpen} >
            Comment
          </Button>
        </CardFooter>

      </Card>

      <PostModal finalRef={finalRef} formattedTimeStamp={formattedTimeStamp} isOpen={isOpen}
post={post} user={user} onClose={onClose}/>
    </>
  );
};

export default NormalPost;

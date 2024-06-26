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
  const { title, content, createdAt: timeStamp, userId, _id: postId } = post
  // format the timestamp to be more readable: "x minutes ago"
  const formattedTimeStamp = formatDistanceToNow(new Date(timeStamp), { addSuffix: true })

  const [user, setUser] = useState(null);
  const [likes, setLikes] = useState("0"); // count of likes
  const [reacted, setReacted] = useState(false); // boolean to check if the user has reacted to the post
  const { comments, dispatch } = useCommentsContext();

  const finalRef = React.useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { user: commentingUser } = useAuthContext()
  const { _id: commentingUserId } = commentingUser.user

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
          })
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
      await axios.delete(`http://localhost:4000/api/reactions/${postId}/${commentingUserId}`)
      setReacted(false);
      console.log("Unreacted");
    } else {
      await axios.post(`http://localhost:4000/api/reactions/${postId}/${commentingUserId}`);
      setReacted(true);
      console.log("Reacted");
    }
  };
  const { avatar, username } = user || {};

  const previewNum = 50
  const words = content.split(' ');
  const preview = words.slice(0, previewNum).join(' ');

  return (
    <> 
      <Card w="100%" borderRadius={15}>
        <CardHeader mb="-8">
          <Flex spacing="4">
            <Flex flex="1" gap="5" alignItems="center" flexWrap="wrap">
              <Avatar name={username} src={avatar} bg='green.100'/>
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
          <Text fontSize="xl">{title}</Text>
        </CardHeader>

        <CardBody>
          <Text>{preview}</Text>
          <Text onClick={onOpen}
            color="gray.500"
            fontStyle="italic"
            _hover={{ color: "blue.500", textDecoration: "underline" }}>
            Read more...</Text>
        </CardBody>

        <Center>
          <Divider width='95%' borderWidth='1px' margin={0} />
        </Center>


        <CardFooter
          justify="space-between"
          flexWrap="wrap"
          sx={{
            "& > button": {
              minW: "136px",
            },
          }}
          padding={2}
        >
          <Button flex="1" variant="ghost" onClick={handleReact} leftIcon={reacted ? <FaHeart /> : <FaRegHeart />}>
            {likes.count === 0 ? "" : likes.count}
          </Button>
          <Button flex="1" variant="ghost" onClick={onOpen} leftIcon={<FaComment />} >
            Comment
          </Button>
        </CardFooter>

      </Card>

      <PostModal finalRef={finalRef} isOpen={isOpen} onClose={onClose} post={post} user={user} formattedTimeStamp={formattedTimeStamp}/>
    </>
  );
};

export default NormalPost;

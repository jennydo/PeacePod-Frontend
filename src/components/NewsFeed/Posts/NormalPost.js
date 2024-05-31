import React from "react";
import {
  Text,
  Flex,
  Box,
  useDisclosure,
  Image,
  GridItem, Grid,
  Spacer,
  Button
} from "@chakra-ui/react";
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import PostModal from "./PostModal";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useCommentsContext } from '../../../hooks/useCommentsContext';
import envelopeImage from '../../../assets/images/envelope.jpg'; 
import stampImage from '../../../assets/images/stamp3.png'; 
import stampLoveImage from '../../../assets/images/stamplove.png';
import letterImage from '../../../assets/images/letter.png';
import { FaHeart, FaComment, FaRegHeart } from "react-icons/fa";

const NormalPost = ({ post }) => {
  const { user } = useAuthContext()
  // data from post 
  const { title, content, createdAt: timeStamp } = post
  const formattedTimeStamp = formatDistanceToNow(new Date(timeStamp), { addSuffix: true })

  const finalRef = React.useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { avatar, username, avatarData } = post.userId;
  const stampBackgroundColor = "#" + avatarData.backgroundColor[0]

  const previewNum = 15
  const words = content.split(' ');
  const preview = words.slice(0, previewNum).join(' ');

  const [likes, setLikes] = useState("0"); // count of likes
  const [reacted, setReacted] = useState(false); // boolean to check if the user has reacted to the post
  const { comments, dispatch } = useCommentsContext();


  // to get the User and the Comments object for the post when the modal is opened and closed and when the component is mounted
  useEffect(() => {
    // get the Comments object for the post
    if (isOpen) {
      axios
        .get(`http://localhost:4000/api/comments/post/${post._id}`)
        .then((response) => {
          dispatch({
            type: "GET_COMMENTS",
            payload: response.data,
          });
          console.log("Comments response", response.data);
        })
        .catch((error) => {
          console.error("Error fetching comments:", error);
        });
    } else {
      dispatch({
        // clear comments when the modal is closed to avoid showing the previous comments when opening the modal again
        type: "CLEAR_COMMENTS",
      });
    }
  }, [post, dispatch, isOpen]);

  // get the count of likes when the component is mounted
  useEffect(() => {
      axios.get(`http://localhost:4000/api/reactions/total/${post._id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
        .then((response) => {
          const likes = response.data;
          setLikes(likes);
        })
        .catch((error) => {
          console.error("Error fetching likes:", error);
        });
    }, [post, reacted]);
  
  // check if the user has reacted to the post
  useEffect(() => {
      axios.get(`http://localhost:4000/api/reactions/isReacted/${post._id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
        .then((response) => {
          setReacted(response.data);
        })
        .catch((error) => {
          console.error("Error fetching reaction:", error);
        });
    }, [post]);
  
  // handle the like/unlike functionality
  const handleReact = async () => {
    if (reacted) {
      await axios.delete(
        `http://localhost:4000/api/reactions/${post._id}`,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      setReacted(false);
      console.log("Unreacted");
    } else {
      await axios.post(
        `http://localhost:4000/api/reactions/${post._id}`,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      setReacted(true);
      console.log("Reacted");
    }
  };

  return (
    <Box
      width="100%"
      p="5"
      bgImage={envelopeImage}
      bgSize="cover"
      bgPosition="center"
      bgRepeat="no-repeat"
      onClick={onOpen}
    >
      <Grid
        templateRows="repeat(5, 1fr)"
        gap={0}
        w="100%"
        h={300}
        p={1}
        bgImage={letterImage}
        bgSize="cover"
        bgPosition="top"
        bgRepeat="no-repeat"
      >
        <GridItem w="100%" h="30%" mt={5} mb={2}>
          <Flex>
            <Box>
              <Text>From: {username}</Text>
              <Text>Date: {formattedTimeStamp}</Text>
            </Box>
            <Spacer />
            <Flex justify="end" position="relative">
              <Box w="80px" mt={8} position="relative" zIndex={2}>
                <Image src={stampLoveImage} />
              </Box>
              <Box
                bgImage={stampImage}
                w="80px"
                h="90px"
                bgSize="cover"
                bgPosition="center"
                bgRepeat="no-repeat"
                display="flex"
                alignItems="center"
                justifyContent="center"
                p="5px"
                position="relative"
                zIndex={1}
                ml="-40px"
              >
                <Box w="80%" h="100%" bg={stampBackgroundColor} ml="7px" pt={3}>
                  <Image src={avatar} />
                </Box>
              </Box>
            </Flex>
          </Flex>
        </GridItem>

        <GridItem w="100%" h="50%" mt={2} mb={2}>
          <Flex flexDir='column'>
          <Box w="100%" h="100%">
            <Text>Title: {title}</Text>
            <Text fontStyle="italic" as="cite" mr={2}>
              {preview}
            </Text>
            <Text
              onClick={onOpen}
              color="gray.500"
              fontStyle="italic"
              as="cite"
              _hover={{ color: "blue.500", textDecoration: "underline" }}
            >
              Read more...
            </Text>
          </Box>

          <Box>
          <Flex
            flexDir='row'
            flexWrap="wrap"
            sx={{
              "& > button": {
                minW: "136px",
              },
            }}
          >
            <Button
              variant="ghost"
              onClick={handleReact}
              leftIcon={reacted ? <FaHeart /> : <FaRegHeart />}
              _hover={{ color: "blue.500" }}
            >
              {likes.count === 0 ? "" : likes.count}
            </Button>
            <Spacer/>
            <Button variant="ghost" onClick={onOpen} leftIcon={<FaComment />}>
              Comment
            </Button>
          </Flex>
          </Box>
          </Flex>
        </GridItem>
        
      </Grid>

      <PostModal
        finalRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        post={post}
        user={user}
        formattedTimeStamp={formattedTimeStamp}
      />
    </Box>
  );
};

export default NormalPost;

import React from "react";
import {
  Text,
  Flex,
  Box,
  Image,
  GridItem,
  Grid,
  Button,
  Heading,
  Container,
  Center,
  Divider,
  Input,
  InputGroup,
  InputRightElement,
  Icon
} from "@chakra-ui/react";
import { IoIosSend } from "react-icons/io";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import PostModal from "./PostModal";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useCommentsContext } from "../../../hooks/useCommentsContext";
// import envelopeImage from '../../../assets/images/envelope.jpg';
import stampImage from "../../../assets/images/stamp3.png";
import stampLoveImage from "../../../assets/images/stamplove.png";
// import letterImage from '../../../assets/images/letter.png';
import { FaHeart, FaComment, FaRegHeart } from "react-icons/fa";
//import postBackgroundImageDefault from "../../../assets/images/Bg9.avif";
import backBackgroundImage from "../../../assets/images/back-background.jpg";
import "./NormalPost.scss";
import Comment from './Comment';

const NormalPost = ({ post }) => {
  const { user } = useAuthContext();
  // data from post
  const { title, content, createdAt: timeStamp, postImageUrl } = post;
  const formattedTimeStamp = formatDistanceToNow(new Date(timeStamp), {
    addSuffix: true,
  });


  const [isFlipped, setIsFlipped] = useState(false);
  const handleFlip = () => setIsFlipped(!isFlipped);

  const { avatar, username, avatarData } = post.userId;
  const stampBackgroundColor = "#" + avatarData.backgroundColor[0];

  const previewNum = 12;
  const words = content.split(" ");
  const preview = words.slice(0, previewNum).join(" ");

  const [likes, setLikes] = useState("0"); // count of likes
  const [reacted, setReacted] = useState(false); // boolean to check if the user has reacted to the post
  const { comments, dispatch } = useCommentsContext();
  const [newComment, setNewComment] = useState("");

  // to get the User and the Comments object for the post when the modal is opened and closed and when the component is mounted
  useEffect(() => {
    // get the Comments object for the post
      axios
        .get(`http://localhost:4000/api/comments/post/${post._id}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        })
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
  }, [post, dispatch, isFlipped]);

  console.log(comments);

  // get the count of likes when the component is mounted
  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/reactions/total/${post._id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((response) => {
        const likes = response.data;
        setLikes(likes);
      })
      .catch((error) => {
        console.error("Error fetching total reactions:", error);
      });
  }, [post, user.token, reacted]);

  // check if the user has reacted to the post
  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/reactions/isReacted/${post._id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((response) => {
        setReacted(response.data);
      })
      .catch((error) => {
        console.error("Error fetching reaction:", error);
      });
  }, [post, user.token]);

  // handle the like/unlike functionality
  const handleReact = async () => {
    if (reacted) {
      await axios.delete(`http://localhost:4000/api/reactions/${post._id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setReacted(false);
      console.log("Unreacted");
    } else {
      const newReaction = {
        postId: post._id,
        userId: user.user._id,
      };
      await axios.post(
        `http://localhost:4000/api/reactions/${post._id}`,
        newReaction,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      setReacted(true);
      console.log("Reacted");
    }
  };


  const handlePostComment = async () => {
    if (!newComment.trim()) return; // Avoid posting empty comments
    const comment = {newComment}

    try {
      const response = await axios.post(
        `http://localhost:4000/api/comments/${post._id}`,
        {
          content: newComment,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`
          },
        }
      );
      setNewComment(""); // Clear the input field after posting the comment
      dispatch({
        type: "CREATE_COMMENT",
        payload: response.data,
      });
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  


  return (
    <div
      // className="flip-container"
      className={`flip-container ${isFlipped ? "flipped" : ""}`} 
      // onTouchStart="this.classList.toggle('hover');"
      // onClick={handleFlip}
    >
      <Center className="flipper">
        <Grid
          className="front"
          // className={`front ${isFlipped ? '' : 'showing'}`}
          // onClick={handleFlip}
          // className= {`flip-container ${isFlipped ? 'flipped' : ''}`}
          gridTemplateRows={"30% 10% 1fr 10%"}
          // m={10}
          w="100%"
          // h="100%"
          maxH={"100%"}
          bgImage={postImageUrl}
          bgSize="cover"
          bgPosition="top"
          bgRepeat="no-repeat"
          mt={3}
        >
          <GridItem w="100%" h="100%" onClick={handleFlip}>
            <Flex justify="end" position="relative">
              <Box w="140px" mt={20} position="relative" zIndex={2}>
                <Image src={stampLoveImage} />
              </Box>
              <Box
                bgImage={stampImage}
                w="140px"
                h="160px"
                bgSize="cover"
                bgPosition="center"
                bgRepeat="no-repeat"
                display="flex"
                alignItems="center"
                justifyContent="center"
                m={6}
                p="5px"
                position="relative"
                zIndex={1}
                ml="-65px"
              >
                <Box w="75%" h="95%" bg={stampBackgroundColor} ml="7px" pt={3}>
                  <Image src={avatar} />
                </Box>
              </Box>
            </Flex>
          </GridItem>

          <GridItem w="100%" h="100%" onClick={handleFlip}>
            <Heading>{title}</Heading>
          </GridItem>

          <GridItem w="100%" h="100%" onClick={handleFlip}>
            <Text>From: {username}</Text>
            {content.length > preview.length ? (
              <Text fontStyle="italic" as="cite" mr={2}>
                {preview} ...
              </Text>
            ) : (
              <Text fontStyle="italic" as="cite" mr={2}>
                {preview}
              </Text>
            )}
          </GridItem>

          <GridItem w="100%" h="100%">
            <Flex
              flexDir="row"
              flexWrap="wrap"
              justify="space-between"
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
              <Button
                variant="ghost"
                leftIcon={<FaComment />}
                onClick={handleFlip}
              >
                Comment
              </Button>
            </Flex>
          </GridItem>
        </Grid>

        <Grid
          className="back scroll"
          // className={`back ${isFlipped ? 'showing' : ''}`}
          gridTemplateRows={"10% 1fr"}
          p={17}
          w="100%"
          h="100%"
          bgImage={postImageUrl}
          bgSize="cover"
          bgPosition="top"
          bgRepeat="no-repeat"
          scrollBehavior="inside"
        >
          <GridItem w="100%" h="100%" mt={1} onClick={handleFlip}>
            <Text fontSize={'3xl'}>{title}</Text>
          </GridItem>

          <GridItem
            w="100%"
            h="100%"
            minH="30vh"
            className="postcard-content"
            display="flex"
            alignItems="center"
            justifyContent="center"
            onClick={handleFlip}
          >
            <Text fontSize={'3xl'}>{content}</Text>
          </GridItem>

          <GridItem w="100%" h="100%">
            <Flex
              flexDir="row"
              flexWrap="wrap"
              justify="space-between"
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
              <Button variant="ghost" leftIcon={<FaComment />}>
                Comment
              </Button>
            </Flex>
          </GridItem>

          <Divider />

          <GridItem>
            {comments &&
              comments.map((comment, idx) => (
                <Comment comment={comment} key={idx} />
              ))}
          </GridItem>

          <GridItem pr={8} pl={8}>
            <InputGroup size="md" w="100%" mt={3}>
              <Input
                placeholder="Your thought"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                size="lg"
                variant="flushed"
              />
              <InputRightElement width="4.5rem">
                <Button
                  rightIcon={<Icon as={IoIosSend} />}
                  h="1.75rem"
                  size="sm"
                  variant="ghost"
                  onClick={handlePostComment}
                >
                  Send
                </Button>
              </InputRightElement>
            </InputGroup>
          </GridItem>
        </Grid>
      </Center>
    </div>
  );
};

export default NormalPost;

import React, { useRef } from "react";
import {
  Text,
  Flex,
  Box,
  Image,
  GridItem,
  Grid,
  Button,
  Heading,
  Center,
  Divider,
  Input,
  InputGroup,
  InputRightElement,
  Icon,
} from "@chakra-ui/react";
import { IoIosSend } from "react-icons/io";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useCommentsContext } from "../../../hooks/useCommentsContext";
import stampImage from "../../../assets/images/stamp3.png";
import stampLoveImage from "../../../assets/images/stamplove.png";
import { FaHeart, FaComment, FaRegHeart } from "react-icons/fa";
import "./NormalPost.scss";
import Comment from "./Comment";

const NormalPost = ({ post }) => {
  const { user } = useAuthContext();
  // data from post
  const { title, content, createdAt: timeStamp, postImageUrl } = post;
  // eslint-disable-next-line no-unused-vars
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

  const inputRef = useRef(null);

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
    // eslint-disable-next-line no-unused-vars
    const comment = {newComment};

    try {
      const response = await axios.post(
        `http://localhost:4000/api/comments/${post._id}`,
        {
          content: newComment,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
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
          bgImage={postImageUrl}
          bgPosition="top"
          bgRepeat="no-repeat"
          bgSize="cover"
          className="front"
          gridTemplateRows="30% 10% 1fr 10%"
          maxH="100%"
          mt={3}
          w="100%"
        >
          <GridItem h="100%" w="100%" onClick={handleFlip}>
            <Flex justify="end" position="relative">
              <Box mt={20} position="relative" w="140px"
zIndex={2}>
                <Image src={stampLoveImage} />
              </Box>
              <Box
                alignItems="center"
                bgImage={stampImage}
                bgPosition="center"
                bgRepeat="no-repeat"
                bgSize="cover"
                display="flex"
                h="160px"
                justifyContent="center"
                m={6}
                ml="-65px"
                p="5px"
                position="relative"
                w="140px"
                zIndex={1}
              >
                <Box bg={stampBackgroundColor} h="95%" ml="7px"
pt={3} w="75%">
                  <Image src={avatar} />
                </Box>
              </Box>
            </Flex>
          </GridItem>

          <GridItem h="100%" w="100%" onClick={handleFlip}>
            <Heading>{title}</Heading>
          </GridItem>

          <GridItem h="100%" w="100%" onClick={handleFlip}>
            <Text fontSize="xl" mt={3}>
              From: {username}
            </Text>
            {content.length > preview.length ? (
              <Text 
                as="cite" 
                fontSize="xl" 
                fontStyle="italic" 
                mr={2}>
                {preview} ...
              </Text>
            ) : (
              <Text 
                as="cite" 
                fontSize="xl" 
                fontStyle="italic" 
                mr={2}>
                {preview}
              </Text>
            )}
          </GridItem>

          <GridItem h="100%" w="100%">
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
                _hover={{ color: "blue.500", bg: "transparent" }}
                fontSize="xl"
                justifyContent="flex-start"
                leftIcon={reacted ? <FaHeart /> : <FaRegHeart />}
                pb={5}
                pl={10}
                variant="ghost"
                onClick={handleReact}
              >
                {likes.count === 0 ? "" : likes.count}
              </Button>
              <Button
                _hover={{ bg: "transparent" }}
                fontSize="xl"
                leftIcon={<FaComment />}
                pb={5}
                pr={10}
                onClick={() => {
                  handleFlip();
                  inputRef.current.focus();
                }}
              >
                Comment
              </Button>
            </Flex>
          </GridItem>
        </Grid>

        <Grid
          bgImage={postImageUrl}
          bgPosition="top"
          bgRepeat="no-repeat"
          bgSize="cover"
          className="back scroll"
          gridTemplateRows="10% 1fr"
          h="100%"
          p={17}
          scrollBehavior="inside"
          w="100%"
          // className={`back ${isFlipped ? 'showing' : ''}`}
        >
          <GridItem 
            h="100%" mt={1} w="100%" 
            onClick={handleFlip}>
            <Text fontSize="3xl">{title}</Text>
          </GridItem>

          <GridItem
            className="postcard-content"
            display="flex"
            h='max-content'
            justifyContent="center"
            minH="45vh"
            p={10}
            w="100%"
            onClick={handleFlip}
          >
            <Text fontSize="3xl" maxH='100%'>{content}</Text>
          </GridItem>

          <GridItem h="100%" w="100%">
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
                _hover={{ color: "blue.500", bg: "transparent" }}
                fontSize="xl"
                justifyContent="flex-start"
                leftIcon={reacted ? <FaHeart /> : <FaRegHeart />}
                variant="ghost"
                onClick={handleReact}
              >
                {likes.count === 0 ? "" : likes.count}
              </Button>
              <Button
                _hover={{ bg: "transparent" }}
                fontSize="xl"
                leftIcon={<FaComment />}
                variant="ghost"
                onClick={() => inputRef.current.focus()}
              >
                Comment
              </Button>
            </Flex>
          </GridItem>

          <Divider />

          <GridItem>
            {comments &&
              comments.map((comment, idx) => (
                // eslint-disable-next-line react/no-array-index-key
                <Comment key={idx} comment={comment} />
              ))}
          </GridItem>

          <GridItem pl={8} pr={8}>
            <InputGroup mt={3} size="md" w="100%">
              <Input
                ref={inputRef}
                placeholder="Your thought"
                size="lg"
                value={newComment}
                variant="flushed"
                onChange={(e) => setNewComment(e.target.value)}
              />
              <InputRightElement width="4.5rem">
                <Button
                  _hover={{ bg: "transparent" }}
                  h="1.75rem"
                  rightIcon={<Icon as={IoIosSend} />}
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

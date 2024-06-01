import React from "react";
import {
  Text,
  Flex,
  Box,
  Image,
  GridItem, Grid,
  Button,
  Heading
} from "@chakra-ui/react";
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import PostModal from "./PostModal";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useCommentsContext } from '../../../hooks/useCommentsContext';
// import envelopeImage from '../../../assets/images/envelope.jpg'; 
import stampImage from '../../../assets/images/stamp3.png'; 
import stampLoveImage from '../../../assets/images/stamplove.png';
// import letterImage from '../../../assets/images/letter.png';
import { FaHeart, FaComment, FaRegHeart } from "react-icons/fa";
import postBackgroundImage from '../../../assets/images/Bg9.avif';
import backBackgroundImage from '../../../assets/images/back-background.jpg';
import './NormalPost.css'

const NormalPost = ({ post }) => {
  const { user } = useAuthContext()
  // data from post 
  const { title, content, createdAt: timeStamp } = post
  const formattedTimeStamp = formatDistanceToNow(new Date(timeStamp), { addSuffix: true })

  const [isFlipped, setIsFlipped] = useState(false);
  const handleFlip = () => setIsFlipped(!isFlipped);

  const { avatar, username, avatarData } = post.userId;
  const stampBackgroundColor = "#" + avatarData.backgroundColor[0]

  const previewNum = 12
  const words = content.split(' ');
  const preview = words.slice(0, previewNum).join(' ');

  const [likes, setLikes] = useState("0"); // count of likes
  const [reacted, setReacted] = useState(false); // boolean to check if the user has reacted to the post
  const { comments, dispatch } = useCommentsContext();


  // to get the User and the Comments object for the post when the modal is opened and closed and when the component is mounted
  useEffect(() => {
    // get the Comments object for the post
    if (!isFlipped) {
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
    } else {
      dispatch({
        // clear comments when the modal is closed to avoid showing the previous comments when opening the modal again
        type: "CLEAR_COMMENTS",
      });
    }
  }, [post, dispatch, isFlipped]);

  console.log(comments)

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
    }, [post, user.token, reacted]);
  
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
      await axios.post(`http://localhost:4000/api/reactions/${post._id}`, 
      newReaction, 
      {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setReacted(true);
      console.log("Reacted");
    }
  };

  return (
  <div className="flip-container" ontouchstart="this.classList.toggle('hover');">
    <div className="flipper">
    <Grid 
      className="front"
      // onClick={handleFlip}
      // className={`flip-container ${isFlipped ? 'flipped' : ''}`}
      gridTemplateRows={'30% 10% 1fr 10%'} 
      // m={10} 
      w="100%" h="100%"
      bgImage={postBackgroundImage}
      bgSize="cover"
      bgPosition="top"
      bgRepeat="no-repeat"
      >
      <GridItem w='100%' h='100%'> 
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

      <GridItem w='100%' h='100%'> 
          <Heading>{title}</Heading>
      </GridItem>

      <GridItem w='100%' h='100%'> 
        <Text>From: {username}</Text>
        <Text fontStyle="italic" as="cite" mr={2}>
          {preview}
        </Text>
      </GridItem>

      <GridItem w='100%' h='100%'> 

           <Flex
            flexDir='row'
            flexWrap="wrap"
            justify='space-between'
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

    </Grid>


    <Grid 
      className="back"
      // onClick={handleFlip}
      gridTemplateRows={'30% 10% 1fr 10%'} 
      // m={10} 
      w="100%" h="100%"
      bgImage={backBackgroundImage}
      bgSize="cover"
      bgPosition="top"
      bgRepeat="no-repeat"
      >
        
      
    </Grid>
    </div>
  </div>
  );
};

export default NormalPost;

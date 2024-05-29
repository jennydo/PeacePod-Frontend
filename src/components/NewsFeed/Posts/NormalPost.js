import React, { useState } from "react";
import {
  Text,
  CardHeader,
  CardBody,
  Card,
  Flex,
  Avatar,
  Box,
  useDisclosure,
  Image,
  CardFooter,
  GridItem, Grid
} from "@chakra-ui/react";
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import PostModal from "./PostModal";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useAvatarContext } from "../../../hooks/useAvatarContext";
import envelopeImage from '../../../assets/images/envelope.jpg'; 
import stampImage from '../../../assets/images/stamp3.png'; 
import stampLoveImage from '../../../assets/images/stamplove.png';

const NormalPost = ({ post }) => {
  const { user } = useAuthContext()
  // data from post 
  const { title, content, createdAt: timeStamp, userId, _id: postId } = post
  const formattedTimeStamp = formatDistanceToNow(new Date(timeStamp), { addSuffix: true })

  const finalRef = React.useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  // const { avatar, username } = user || {};
  // const { avatarData, avatar } = useAvatarContext();
  const { avatar, username, avatarData } = post.userId;
  const stampBackgroundColor = "#" + avatarData.backgroundColor[0]

  const previewNum = 50
  const words = content.split(' ');
  const preview = words.slice(0, previewNum).join(' ');

  return (
    <Box
      width="100%"
      p="5"
      bgImage={envelopeImage}
      bgSize="cover" 
      bgPosition="center" 
      bgRepeat="no-repeat" 
      >
      <Grid templateRows='repeat(5, 1fr)' gap={0}
            w="100%" h={300} p={1}
            bgImage={"https://marketplace.canva.com/EAFTtc-SKzI/1/0/1131w/canva-green-watercolor-illustrated-leaves-nature-letter-uhSqMv8PSxU.jpg"}
      >
        <GridItem w='100%' h='30%'>
          <Flex justify="end" position="relative">
            <Box w='80px' mt={8}
                 position="relative" 
                 zIndex={2}>
              <Image src={stampLoveImage}/>
            </Box>
            <Box 
              bgImage={stampImage} 
              w='80px' h='90px'
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
              <Box w="80%" h="100%" bg={stampBackgroundColor} ml='7px' pt={3}>
                <Image src={avatar}/>
              </Box>
            </Box>
          </Flex>
        </GridItem>

        <GridItem w='100%' h='50%'>
          <Box w="100%" h="100%" overflow='hidden'>
            <Text>From: {username}</Text>
            <Text>Title: {title}</Text>
            <Text fontStyle="italic">
              {preview}
            </Text>
            <Text onClick={onOpen}
              color="gray.500"
              fontStyle="italic"
              _hover={{ color: "blue.500", textDecoration: "underline" }}>
              Read more...</Text>
          </Box> 
        </GridItem>

        <GridItem w='100%' h='20%' >
          <Text>Date: {formattedTimeStamp}</Text>
        </GridItem>
      
      </Grid>

      <PostModal finalRef={finalRef} isOpen={isOpen} onClose={onClose} post={post} user={user} formattedTimeStamp={formattedTimeStamp}/>
    </Box>
  );
};

export default NormalPost;

import React from "react";
import {
  Text,
  Flex,
  Box,
  useDisclosure,
  Image,
  GridItem, Grid,
} from "@chakra-ui/react";
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import PostModal from "./PostModal";
import { useAuthContext } from "../../../hooks/useAuthContext";
import envelopeImage from '../../../assets/images/envelope.jpg'; 
import stampImage from '../../../assets/images/stamp3.png'; 
import stampLoveImage from '../../../assets/images/stamplove.png';

const NormalPost = ({ post }) => {
  const { user } = useAuthContext()
  // data from post 
  const { title, content, createdAt: timeStamp } = post
  const formattedTimeStamp = formatDistanceToNow(new Date(timeStamp), { addSuffix: true })

  const finalRef = React.useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { avatar, username, avatarData } = post.userId;
  const stampBackgroundColor = "#" + avatarData.backgroundColor[0]

  const previewNum = 20
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
      onClick={onOpen}
      >
      <Grid gridTemplateRows={'35% 1fr 10%'} gap={0}
            w="100%" h={300} p={1}
            bgImage={"https://marketplace.canva.com/EAFTtc-SKzI/1/0/1131w/canva-green-watercolor-illustrated-leaves-nature-letter-uhSqMv8PSxU.jpg"}
      >
        <GridItem w='100%' h='100%'>
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

        <GridItem w='100%' h='100%'>
          <Box w="100%" h="100%">
            <Text>{title}</Text>
            <Text>From: {username}</Text>
            <Text fontStyle="italic">
              {preview}
            </Text>
          </Box> 
        </GridItem>

        <GridItem w='100%' h='100%' >
          <Flex justify="end" position="relative">
            <Text>{formattedTimeStamp}</Text>
          </Flex>
        </GridItem>
      
      </Grid>

      <PostModal finalRef={finalRef} isOpen={isOpen} onClose={onClose} post={post} user={user} formattedTimeStamp={formattedTimeStamp}/>
    </Box>
  );
};

export default NormalPost;

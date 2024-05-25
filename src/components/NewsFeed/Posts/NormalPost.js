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
  useDisclosure,
  Divider,
  Center,
  Spacer
} from "@chakra-ui/react";
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import PostModal from "./PostModal";
import { useAuthContext } from "../../../hooks/useAuthContext";

const NormalPost = ({ post }) => {
  const { user } = useAuthContext()
  // data from post 
  const { title, content, createdAt: timeStamp, userId, _id: postId } = post
  // format the timestamp to be more readable: "x minutes ago"
  const formattedTimeStamp = formatDistanceToNow(new Date(timeStamp), { addSuffix: true })

  const finalRef = React.useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  // const { avatar, username } = user || {};

  const previewNum = 50
  const words = content.split(' ');
  const preview = words.slice(0, previewNum).join(' ');

  return (
    <div> 
      <Card w="100%" borderRadius={15} bgImage={"https://marketplace.canva.com/EAFTtc-SKzI/1/0/1131w/canva-green-watercolor-illustrated-leaves-nature-letter-uhSqMv8PSxU.jpg"}>
        <CardHeader>
          <Flex justify="end">
            <Avatar name={user.user.username} src={user.user.avatar}/>
          </Flex>
        </CardHeader>

        <CardBody mt="15">
          <Text>From: {user.user.username}</Text>
          <Text>Date: {formattedTimeStamp}</Text>
          <Text>Title: {title}</Text>
          <Text fontStyle="italic">
            {preview}
          </Text>
          <Text onClick={onOpen}
            color="gray.500"
            fontStyle="italic"
            _hover={{ color: "blue.500", textDecoration: "underline" }}>
            Read more...</Text>
        </CardBody>


      </Card>

      <PostModal finalRef={finalRef} isOpen={isOpen} onClose={onClose} post={post} user={user} formattedTimeStamp={formattedTimeStamp}/>
    </div>
  );
};

export default NormalPost;

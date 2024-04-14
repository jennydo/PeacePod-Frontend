import React from 'react'
import {useState, useEffect} from 'react';
import axios from 'axios';
import {
    Text,
    Avatar,
    Box, 
    Stack,
    Heading
  } from "@chakra-ui/react";
import ShowMoreText from 'react-show-more-text';
import './Comment.css'

const Comment = ({ comment }) => {
  const commentContent = comment.content
  const {username, avatar} = comment.userId;

  return (
    <>
      <Stack direction="row" m={3}>
        <Avatar name={username} src={avatar}/>
        <Box bg="#dee2ff" borderRadius={20} w='auto'>
            <Text size='sm' color='black' marginBottom={0} pl={3} pr={3} pt={3}>{username}</Text>
            <Text color='black' pl={3} pr={5} pb={1} pt={2}>{commentContent}</Text>            
        </Box>
      </Stack>
    </>
  )
}

export default Comment
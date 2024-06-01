import axios from "axios";
import { useState, useEffect } from "react";
import React from "react";
import { usePostsContext } from "../../../hooks/usePostsContext";
import { useAuthContext } from "../../../hooks/useAuthContext";
import PostsLayout from "./PostsLayout";
import { IconButton, Flex, Text, Box, Divider } from "@chakra-ui/react"; 
import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons'

const AllPosts = () => {
  const { user } = useAuthContext();
  const { posts, dispatch } = usePostsContext();
  console.log(posts);

  /// Get all current post
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/posts/", {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((response) => {
        dispatch({
          type: "GET_POSTS",
          payload: response.data,
        });
      });
  }, [dispatch, user.token]);

  // Initialize the first posts layout (first four posts)
  const [pageNum, setPageNum] = useState(0);
  const [fourPosts, setFourPosts] = useState([]);

  useEffect(() => {
    setFourPosts(posts.slice(pageNum, pageNum + 4));
  }, [posts, pageNum]);

  const retrievePreviousPage = () => {
    setPageNum(pageNum - 4);
  };

  const retrieveNewPage = () => {
    setPageNum(pageNum + 4);
  };


  return (
    <Flex flexDir="column" alignItems="center">
      {pageNum > 3 ? (
        <IconButton
          icon={<ChevronUpIcon />}
          onClick={retrievePreviousPage}
          colorScheme="blue"
          size='lg'
        />
      ) : (
        <IconButton icon={<ChevronUpIcon />} disabled size='lg'/>
      )}


      <Box w="100%" m={5} h={800}>
        <PostsLayout fourPosts={fourPosts} />
      </Box>


      {(
        posts.length % 4 === 0
          ? pageNum < posts.length - 4
          : pageNum < posts.length - (posts.length % 4)
      ) ? (
        <IconButton
          icon={<ChevronDownIcon />}
          onClick={retrieveNewPage}
          colorScheme="blue"
          size='lg'
        />
      ) : (
        <IconButton icon={<ChevronDownIcon />} disabled size='lg'/>
      )}
    </Flex>
  );
};

export default AllPosts;
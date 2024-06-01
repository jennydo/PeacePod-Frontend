import axios from "axios";
import { useState, useEffect } from "react";
import React from "react";
import { usePostsContext } from "../../../hooks/usePostsContext";
import { useAuthContext } from "../../../hooks/useAuthContext";
import PostsLayout from "./PostsLayout";
import { IconButton, Flex, Text, Box } from "@chakra-ui/react"; 
import { ArrowUpIcon, ArrowDownIcon } from '@chakra-ui/icons'

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
          icon={<ArrowUpIcon />}
          onClick={retrievePreviousPage}
          colorScheme="blue"
          mb={5}
        />
      ) : (
        <IconButton icon={<ArrowUpIcon />} disabled mb={5} />
      )}


      <Box w="100%">
        <PostsLayout fourPosts={fourPosts} />
      </Box>


      {(
        posts.length % 4 === 0
          ? pageNum < posts.length - 4
          : pageNum < posts.length - (posts.length % 4)
      ) ? (
        <IconButton
          icon={<ArrowDownIcon />}
          onClick={retrieveNewPage}
          colorScheme="blue"
          mt={5}
        />
      ) : (
        <IconButton icon={<ArrowDownIcon />} disabled mt={5} />
      )}
      <Text>{pageNum}</Text>
    </Flex>
  );
};

export default AllPosts;
import axios from "axios";
import { useState, useEffect } from "react";
import React from "react";
import { usePostsContext } from "../../../hooks/usePostsContext";
import { useAuthContext } from "../../../hooks/useAuthContext";
// import PostsLayout from "./PostsLayout";
import { IconButton, Flex, Text, Box, Divider, HStack } from "@chakra-ui/react"; 
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import NormalPost from "../Posts/NormalPost";

const AllPosts = () => {
    const { user } = useAuthContext();
    const { posts, dispatch } = usePostsContext();
    // console.log(posts);

    // Get all current post
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

    const [idx, setIdx] = useState(0);
    const [postShowing, setPostShowing] = useState(null);

    useEffect(() => {
        setPostShowing(posts[idx]);
      }, [posts, idx]);
    
    const retrievePreviousPost = () => {
        setIdx(idx - 1);
    };

    const retrieveNewPost = () => {
        setIdx(idx + 1);
    };

    console.log('Post showing: ' + postShowing);

    return ( 
        <>
        <HStack>
          <IconButton
            icon={<ChevronLeftIcon />}
            onClick={retrievePreviousPost}
            colorScheme="blue"
            size='lg'
          />
          {postShowing && <NormalPost post={postShowing}/>}
          <IconButton
            icon={<ChevronRightIcon />}
            onClick={retrieveNewPost}
            colorScheme="blue"
            size='lg'
          />
        </HStack>
        </>
     );
}
 
export default AllPosts;




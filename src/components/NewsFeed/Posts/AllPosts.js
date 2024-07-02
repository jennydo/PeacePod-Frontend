import axios from "axios";
import { useState, useEffect } from "react";
import React from "react";
import { usePostsContext } from "../../../hooks/usePostsContext";
import { useCommentsContext } from "../../../hooks/useCommentsContext";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { IconButton, Grid, GridItem, Center } from "@chakra-ui/react"; 
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import NormalPost from "../Posts/NormalPost";

const AllPosts = () => {
    const { user } = useAuthContext();
    const { posts, dispatch } = usePostsContext();
    const { dispatch : commentDispatch } = useCommentsContext();
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
        commentDispatch({
          // clear comments when the modal is closed to avoid showing the previous comments when opening the modal again
          type: "CLEAR_COMMENTS",
        });
    };

    const retrieveNewPost = () => {
        setIdx(idx + 1);
        commentDispatch({
          // clear comments when the modal is closed to avoid showing the previous comments when opening the modal again
          type: "CLEAR_COMMENTS",
        });
    };

    console.log('Post showing: ' + postShowing);

    return ( 
        <>
        <Grid gap={2} gridTemplateColumns="5% 1fr 5%" h="60vh"
m={0} w="60%">
          <GridItem 
            alignItems='center' display='flex' 
            h='100%' 
            justifyContent='center' 
            w='100%'> 
            <IconButton
              colorScheme="blue"
              disabled={ idx < 1 }
              icon={<ChevronLeftIcon />}
              size='lg'
              variant='ghost'
              onClick={idx < 1 ? ()=>{} : retrievePreviousPost}
            />
          </GridItem>
          <GridItem h='100%' w='100%'> 
            {postShowing && <NormalPost post={postShowing}/>}
          </GridItem>
          <GridItem 
            alignItems='center' display='flex'
            h='100%' 
            justifyContent='center' 
            w='100%'> 
            <IconButton
              colorScheme="blue"
              disabled={idx > posts.length - 2}
              icon={<ChevronRightIcon />}
              size='lg'
              variant='ghost'
              onClick={idx > posts.length - 2 ? ()=>{} : retrieveNewPost}
            />
          </GridItem>
        </Grid>
        </>
     );
};
 
export default AllPosts;




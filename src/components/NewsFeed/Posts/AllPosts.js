import axios from "axios";
import { useState, useEffect } from "react";
import React from "react";
import { usePostsContext } from "../../../hooks/usePostsContext";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { IconButton, Grid, GridItem, Center } from "@chakra-ui/react"; 
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
        <Grid gridTemplateColumns={'5% 1fr 5%'} m={10} h="60vh" w="70%">
          <GridItem w='100%' h='100%' > 
            <IconButton
              icon={<ChevronLeftIcon />}
              onClick={idx < 1 ? ()=>{} : retrievePreviousPost}
              colorScheme="blue"
              variant='ghost'
              size='lg'
              disabled={ idx < 1 }
            />
          </GridItem>
          <GridItem w='100%' h='100%'> 
            {postShowing && <NormalPost post={postShowing}/>}
          </GridItem>
          <GridItem w='100%' h='100%'> 
            <IconButton
              icon={<ChevronRightIcon />}
              onClick={idx > posts.length - 2 ? ()=>{} : retrieveNewPost}
              colorScheme="blue"
              variant='ghost'
              size='lg'
              disabled={idx > posts.length - 2}
            />
          </GridItem>
        </Grid>
        </>
     );
}
 
export default AllPosts;




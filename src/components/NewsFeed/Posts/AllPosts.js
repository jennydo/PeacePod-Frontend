import axios from "axios";
import { useState, useEffect } from "react";
import React from "react";
import { usePostsContext } from "../../../hooks/usePostsContext";
import { useCommentsContext } from "../../../hooks/useCommentsContext";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { IconButton, Grid, GridItem, Center } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import NormalPost from "../Posts/NormalPost";

const AllPosts = () => {
  const { user } = useAuthContext();
  const { posts, dispatch } = usePostsContext();
  const { dispatch: commentDispatch } = useCommentsContext();
  // console.log(posts);

  const [flipped, setFlipped] = useState(false);

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
    setFlipped(false);
    setIdx(idx - 1);
    commentDispatch({
      // clear comments when the modal is closed to avoid showing the previous comments when opening the modal again
      type: "CLEAR_COMMENTS",
    });
  };

  const retrieveNewPost = () => {
    setFlipped(false);
    setIdx(idx + 1);
    commentDispatch({
      // clear comments when the modal is closed to avoid showing the previous comments when opening the modal again
      type: "CLEAR_COMMENTS",
    });
  };

  console.log("Post showing: " + postShowing);

  return (
    <>
      <Grid gridTemplateColumns={"5% 1fr 5%"} gap={2} m={0} h="60vh" w="60%">
        <GridItem
          w="100%"
          h="100%"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <IconButton
            icon={<ChevronLeftIcon />}
            onClick={idx < 1 ? () => {} : retrievePreviousPost}
            colorScheme="blue"
            variant="ghost"
            size="lg"
            disabled={idx < 1}
          />
        </GridItem>
        <GridItem w="100%" h="100%">
          {postShowing && (
            <NormalPost
              flipped={flipped}
              setFlipped={setFlipped}
              post={postShowing}
            />
          )}
        </GridItem>
        <GridItem
          w="100%"
          h="100%"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <IconButton
            icon={<ChevronRightIcon />}
            onClick={idx > posts.length - 2 ? () => {} : retrieveNewPost}
            colorScheme="blue"
            variant="ghost"
            size="lg"
            disabled={idx > posts.length - 2}
          />
        </GridItem>
      </Grid>
    </>
  );
};

export default AllPosts;

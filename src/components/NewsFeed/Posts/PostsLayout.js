import axios from "axios";
import { useEffect } from "react";
import React from "react";
import NormalPost from "./NormalPost";
import { VStack, Grid, GridItem } from "@chakra-ui/react";
import { usePostsContext } from "../../../hooks/usePostsContext";
import { useAuthContext } from "../../../hooks/useAuthContext";

const PostsLayout = ({fourPosts}) => {
  if (fourPosts.length > 4) {
    console.error("Can have at most 4 posts");
  }

  return (
    <div>
      <Grid
        h="200px"
        templateRows="repeat(2, 1fr)"
        templateColumns="repeat(2, 1fr)"
        gap={4}
      >
        {fourPosts.map((post) => (
          <GridItem>
            <NormalPost key={post._id} post={post} />
          </GridItem>
        ))}
      </Grid>
    </div>
  );
};

export default PostsLayout;

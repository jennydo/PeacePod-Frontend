import React from "react";
import NormalPost from "./NormalPost";
import { Grid, GridItem } from "@chakra-ui/react"; 

const PostsLayout = ({fourPosts}) => {
  if (fourPosts.length > 4) {
    console.error("Can have at most 4 posts");
  }
  const postsArray = Array.isArray(fourPosts) ? fourPosts : [];

  return (
    <div>
      <Grid
        h="200px"
        templateRows="repeat(2, 1fr)"
        templateColumns="repeat(2, 1fr)"
        gap={5}
      >
        {postsArray.map((post) => (
          <GridItem key={post._id}>
            <NormalPost post={post} />
          </GridItem>
        ))}
      </Grid>
    </div>
  );
};

export default PostsLayout;

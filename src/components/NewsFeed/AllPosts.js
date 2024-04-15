import axios from "axios";
import { useEffect } from "react";
import React from "react";
import NormalPost from "./NormalPost";
import { VStack } from "@chakra-ui/react";
import { usePostsContext } from "../../hooks/usePostsContext";

const AllPosts = () => {

    const { posts, dispatch } = usePostsContext();

    useEffect(() => {
        axios.get("http://localhost:4000/api/posts/")
            .then((response) => {
                dispatch({
                    type: "GET_POSTS",
                    payload: response.data
                })
            });
    }, [dispatch]);

    return (
        <VStack
            spacing={4}
            align='stretch'
            >
            {posts && posts.filter((post) => post.isPrompt == false).map((post) => (
                <NormalPost key={post._id} post={post}/>
            ))}
        </VStack>
    );
}

export default AllPosts;
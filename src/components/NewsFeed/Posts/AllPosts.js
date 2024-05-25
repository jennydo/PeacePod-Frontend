import axios from "axios";
import { useEffect } from "react";
import React from "react";
import NormalPost from "./NormalPost";
import { VStack } from "@chakra-ui/react";
import { usePostsContext } from "../../../hooks/usePostsContext";
import { useAuthContext } from "../../../hooks/useAuthContext";
import PostsLayout from "./PostsLayout";

const AllPosts = () => {
    const { user } = useAuthContext()
    const { posts, dispatch } = usePostsContext();


    /// Get all current post
    useEffect(() => {
        axios.get("http://localhost:4000/api/posts/", {
          headers: { "Authorization": `Bearer ${user.token}`}
        })
            .then((response) => {
                dispatch({
                    type: "GET_POSTS",
                    payload: response.data
                })
            });
    }, [dispatch, user.token])

    return (
        <div>
            <PostsLayout fourPosts = {posts.slice(0,4)}/>
            {/* <VStack
                spacing={4}
                align='stretch'
                >
                {posts && posts.filter((post) => post.isPrompt === false).map((post) => (
                    <NormalPost key={post._id} post={post}/>
                ))}
            </VStack>             */}
        </div>

    );
}

export default AllPosts;
import axios from "axios";
import { useState, useEffect } from "react";
import React from "react";
import NormalPost from "./NormalPost";
import { Button, Box } from "@chakra-ui/react";
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


    const [pageNum, setPageNum] = useState(0);
    const [fourPosts, setFourPosts] = useState(posts.slice(0, 4));

    const retrievePreviousPage = () => {
        setPageNum(pageNum - 4);
        setFourPosts(posts.slice(pageNum, pageNum + 4))
    }

    const retrieveNewPage = () => {
        setPageNum(pageNum + 4);
        setFourPosts(posts.slice(pageNum, pageNum + 4))
    }

    return (
        <div>
            {/* <PostsLayout fourPosts = {posts.slice(0,4)}/> */}
            {pageNum > 3 ? <Button onClick={retrievePreviousPage}><i class="bi bi-caret-up-fill"></i></Button> : <Button disabled><i class="bi bi-caret-up-fill"></i></Button>}
            <div><PostsLayout fourPosts = {fourPosts}/></div>
            {pageNum < (posts.length - (posts.length % 4)) ? <Button onClick={retrieveNewPage}><i class="bi bi-caret-down-fill"></i></Button> : <Button disabled><i class="bi bi-caret-down-fill"></i></Button>}
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
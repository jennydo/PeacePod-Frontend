import axios from "axios";
import { useEffect } from "react";
import React from "react";
import NormalPost from "./NormalPost";
import { VStack } from "@chakra-ui/react";
import { usePostsContext } from "../../hooks/usePostsContext";
import PromptPost from "./PromptPost";
import { useAuthContext } from '../../hooks/useAuthContext'

const AllPosts = () => {
    const { user } = useAuthContext()
    const { posts, dispatch } = usePostsContext();
    const promptPost = posts.find(p => p.isPrompt === true);

    const userId = "661f3d5f7bc0dc0597752679"

    /// axios to get prompt
    const getPrompt = async () => {
      let response
      try {
        dispatch({
          type: 'UPDATE_POST'
        })
        response = await axios.post("http://localhost:4000/api/posts/prompt/", { userId }, {
          headers: { "Authorization": `Bearer ${user.token}`}
        })
        dispatch({
          type: 'CREATE_POST',
          payload: response.data
        })        
        console.log("Response from get prompt ", response.data)
      } catch (err) {
        console.log("error while creating prompt ", err)
      }
    }
  
    const scheduleDailyPrompt = () => {

      const now = new Date()
      const tmr = new Date(now)
      tmr.setDate(now.getDate() + 1)
      tmr.setTime(0, 0, 0, 0)

      const timeUntilMidnight = tmr - now
      // const timeUntilMidnight = 15 * 1000;
      setTimeout(() => {
        getPrompt()
        scheduleDailyPrompt()
      }, timeUntilMidnight)
    }

    useEffect(() => {
        scheduleDailyPrompt()

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
        <>
            {promptPost && <PromptPost post={promptPost}/>}
            <VStack
                spacing={4}
                align='stretch'
                >
                {posts && posts.filter((post) => post.isPrompt === false).map((post) => (
                    <NormalPost key={post._id} post={post}/>
                ))}
            </VStack>            
        </>

    );
}

export default AllPosts;
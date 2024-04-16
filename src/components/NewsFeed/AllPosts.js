import axios from "axios";
import { useEffect, useState } from "react";
import React from "react";
import NormalPost from "./NormalPost";
import { VStack } from "@chakra-ui/react";
import { usePostsContext } from "../../hooks/usePostsContext";
import PromptPost from "./PromptPost";

const AllPosts = () => {

    const { posts, dispatch } = usePostsContext();

    const userId = "661d771224e3217738f8310d"
    const [ prompt, setPrompt ] = useState(null)

    /// axios to get prompt
    const getPrompt = async () => {

        let response
        try {
          
          dispatch({
            type: 'UPDATE_POST'
          })

          response = await axios.post("http://localhost:4000/api/posts/prompt/", { userId })
  
          dispatch({
            type: 'CREATE_POST',
            payload: response.data
          })        
  
          console.log("Response from get prompt ", response.data)
  
          setPrompt(response.data)
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
  
        setTimeout(() => {
          getPrompt()
          scheduleDailyPrompt()
        }, timeUntilMidnight)
      }
  
      useEffect(() => {
        async function scheduleGetPrompt () {
          getPrompt()
          scheduleDailyPrompt()
    
          const allPosts = await axios.get("http://localhost:4000/api/posts/")
            
          dispatch({
              type: 'GET_POSTS',
              payload: allPosts.data
          })
        }
        scheduleGetPrompt()
      }, [])

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
        <>
            <PromptPost post={posts.filter(p => p.isPrompt === true)[0]}/>
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
import axios from "axios";
import { useEffect, useState } from "react";
import React from "react";
import NormalPost from "./NormalPost";
import { VStack } from "@chakra-ui/react";
import { usePostsContext } from "../../hooks/usePostsContext";
import PromptPost from "./PromptPost";
import { useAuthContext } from '../../hooks/useAuthContext';

const AllPosts = () => {
    const { user } = useAuthContext();
    const { posts, dispatch } = usePostsContext();
    const promptPost = posts.find(p => p.isPrompt === true);

    const peacepodUserId = "661f3d5f7bc0dc0597752679";
    const [ prompt, setPrompt ] = useState(() => {
        const currentPrompt = JSON.parse(localStorage.getItem('prompt'));

        if (currentPrompt)
        {
            /// New day, clear local storage prompt
            const currentDate = new Date().getDate();
            const promptDate = new Date(currentPrompt.createdAt).getDate();

            if (currentDate !== promptDate)
                return null;
            else
                return currentPrompt;
        }
        else
            return null;
    });

    /// axios to get prompt
    const getPrompt = async () => {
        if (prompt)
        {
            return;
        }
        /// Else during the day and already get the prompt
        let response;
        try {
          
          dispatch({
            type: 'UPDATE_POST'
          });

          response = await axios.post("http://localhost:4000/api/posts/prompt/", { userId: peacepodUserId }, {
            headers: { "Authorization": `Bearer ${user.token}`}
          });
  
          dispatch({
            type: 'CREATE_POST',
            payload: response.data
          });        
  
          console.log("Response from get prompt ", response.data);
          
          localStorage.setItem('prompt', JSON.stringify(response.data));
        
          setPrompt(response.data);
        } catch (err) {
          console.log("error while creating prompt ", err);
        }
    };
  
    const scheduleDailyPrompt = () => {
        const now = new Date();
        const tmr = new Date(now);

        // tmr.setTime(tmr.getTime() + 10 * 1000)        
        tmr.setDate(now.getDate() + 1);
        tmr.setTime(0, 0, 0, 0);

        const timeUntilMidnight = tmr - now;

        setTimeout(() => {
            getPrompt();
            scheduleDailyPrompt();
        }, timeUntilMidnight);
    };

    /// Get first prompt if no prompt, schedule new prompt
    useEffect(() => {
        getPrompt();
        scheduleDailyPrompt();
    }, []);

    /// Get all current post
    useEffect(() => {
        axios.get("http://localhost:4000/api/posts/", {
          headers: { "Authorization": `Bearer ${user.token}`}
        })
            .then((response) => {
                dispatch({
                    type: "GET_POSTS",
                    payload: response.data
                });
            });
    }, [dispatch, user.token]);

    return (
        <>
            {promptPost && <PromptPost post={promptPost}/>}
            <VStack
                align='stretch'
                spacing={4}
                >
                {posts && posts.filter((post) => post.isPrompt === false).map((post) => (
                    <NormalPost key={post._id} post={post}/>
                ))}
            </VStack>            
        </>

    );
};

export default AllPosts;
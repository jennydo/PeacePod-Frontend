import axios from "axios";
import { useEffect } from "react";
import React from "react";
import NormalPost from "./NormalPost";
import { VStack } from "@chakra-ui/react";

const AllPosts = () => {

    const [posts, setPosts] = React.useState(null);

    useEffect(() => {
        axios.get("http://localhost:4000/api/posts/")
            .then((response) => {
                setPosts(response.data);
            });
    }, []);

    // check if GET request works 
    useEffect(() => {
        console.log(posts);
    }, [posts]);

    return ( 
        <VStack
            spacing={4}
            align='stretch'
            >
            {posts && posts.map((post) => (
                <NormalPost key={post._id} post={post}/>
            ))}
        </VStack>
     );
}
 
export default AllPosts;
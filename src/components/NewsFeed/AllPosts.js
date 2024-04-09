import axios from "axios";
import { useEffect } from "react";
import React from "react";
import NormalPost from "./NormalPost";

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
        <div>
            {posts && posts.map((post) => (
                <NormalPost key={post._id} post={post}/>
            ))}
        </div>
     );
}
 
export default AllPosts;
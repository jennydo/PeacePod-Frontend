import CreatePost from "../components/NewsFeed/CreatePost";
import AllPosts from "../components/NewsFeed/AllPosts";
import PromptPost from "../components/NewsFeed/PromptPost";

const NewsFeed = () => {
    return ( 
        <div>
            <h1>NewsFeed</h1>
            <CreatePost/>
            <PromptPost />
            <AllPosts/>
        </div>
     );
}
 
export default NewsFeed;
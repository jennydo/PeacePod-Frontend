import CreatePost from "../components/NewsFeed/CreatePost";
import AllPosts from "../components/NewsFeed/AllPosts";
import PromptPost from "../components/NewsFeed/PromptPost";
import { Grid, GridItem, Text } from "@chakra-ui/react";

const NewsFeed = () => {
    return ( 
        <div className="newsfeed">
            <h1>NewsFeed</h1>
            
            <Grid gridTemplateColumns={'1fr 30%'} m={10} gap={6}>
                <GridItem w='100%' h='10'> 
                    <CreatePost/>
                    <PromptPost />
                    <AllPosts/>
                </GridItem>
                <GridItem w='100%' >
                    <Text>Under here are the 2 quotes for you</Text>
                </GridItem>
            </Grid>
        </div>
     );
}
 
export default NewsFeed;
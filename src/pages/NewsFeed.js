import CreatePost from "../components/NewsFeed/CreatePost";
import AllPosts from "../components/NewsFeed/AllPosts";
import PromptPost from "../components/NewsFeed/PromptPost";
import { Grid, GridItem } from "@chakra-ui/react";

const NewsFeed = () => {
    return ( 
        <div>
            <h1>NewsFeed</h1>
            <CreatePost/>
            <Grid gridTemplateColumns={'1fr 30%'} m={10} gap={6}>
                <GridItem w='100%' h='10' bg='blue.500'> 
                    {/* <PromptPost /> */}
                    <AllPosts/>
                </GridItem>
                <GridItem w='100%' h='10' bg='blue.500' />
            </Grid>
            
            
        </div>
     );
}
 
export default NewsFeed;
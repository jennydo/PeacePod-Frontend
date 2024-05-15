import CreatePost from "../components/NewsFeed/CreatePost";
import AllPosts from "../components/NewsFeed/AllPosts";
import QuotesAndTipsCards from "../components/NewsFeed/QuotesAndTipsCards";
import {Grid, GridItem } from "@chakra-ui/react"
import Prompts from "../components/NewsFeed/Prompts/Prompts";

const NewsFeed = () => {
    return (
        <div className="newsfeed">
            <h1>NewsFeed</h1>

            <Prompts/>

            {/* <Grid gridTemplateColumns={'1fr 30%'} m={10} gap={6}>
                <GridItem w='100%' h='10'> 
                  <CreatePost/>
                  <AllPosts/>
                </GridItem>
                <GridItem w='100%' >
                  <QuotesAndTipsCards />
                </GridItem>
            </Grid> */}
        </div>
    );
}

export default NewsFeed;
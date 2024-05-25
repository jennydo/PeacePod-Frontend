// import CreatePost from "../components/NewsFeed/CreatePost";
import AllPosts from "../components/NewsFeed/Posts/AllPosts";
// import QuotesAndTipsCards from "../components/NewsFeed/QuotesAndTipsCards";
import {Grid, GridItem, Text } from "@chakra-ui/react"
import Prompt from "../components/NewsFeed/Prompts/Prompt";
import '../components/NewsFeed/Prompts/Prompt.css';

const NewsFeed = () => {
    return (
        <div className="newsfeed">
            <h1>NewsFeed</h1>
            <div className="wave"></div>
            <Grid gridTemplateColumns={'25% 1fr'} m={10} gap={6} minHeight="75vh"> 
              <GridItem w='100%' pt='100px' m='20px'> 
                <Prompt/>
              </GridItem>
              <GridItem w='100%' m='20px'>
                <AllPosts/>
              </GridItem>
            </Grid>

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
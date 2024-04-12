import CreatePost from "../components/NewsFeed/CreatePost";
import AllPosts from "../components/NewsFeed/AllPosts";
import PromptPost from "../components/NewsFeed/PromptPost";
import QuotesAndTipsCards from "../components/NewsFeed/QuotesAndTipsCards";
import {Grid, GridItem } from "@chakra-ui/react"

const NewsFeed = () => {
    return (
      <div>
        <h1>NewsFeed</h1>
        <Grid templateColumns="repeat(1, 2fr 1fr)">
          <GridItem>
            <CreatePost />
            <PromptPost />
            <AllPosts />
          </GridItem>
          <GridItem>
            <QuotesAndTipsCards />
          </GridItem>
        </Grid>
      </div>
    );
}
 
export default NewsFeed;
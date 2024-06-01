// import CreatePost from "../components/NewsFeed/CreatePost";
import AllPosts from "../components/NewsFeed/Posts/AllPosts";
// import QuotesAndTipsCards from "../components/NewsFeed/QuotesAndTipsCards";
import {Grid, GridItem, useDisclosure, IconButton, Icon, Tabs, TabList, TabPanels, Tab, TabPanel, Box  } from "@chakra-ui/react"
import Prompt from "../components/NewsFeed/Prompts/Prompt";
import '../components/NewsFeed/Prompts/Prompt.css';
import CreatePostcard from "../components/NewsFeed/Posts/CreatePostcard";
import { BsFillSendPlusFill } from "react-icons/bs";

const NewsFeed = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <div className="newsfeed">
            <h1>NewsFeed</h1>
            <Tabs align='center' isFitted>
              <TabList>
                <Tab>Catch a Postcard flying in the Sky</Tab>
                <Tab>The Waterfall of Messages</Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  <Box>
                    <IconButton
                      onClick={onOpen}
                      isRound={true}
                      variant='solid'
                      bg='transparent'
                      aria-label='Done'
                      fontSize='20px'
                      marginBottom={50}
                      icon={<Icon as={BsFillSendPlusFill} boxSize={8}/>}
                    />
                    <AllPosts/>
                    <CreatePostcard isOpen={isOpen} onClose={onClose}/>
                  </Box>
                </TabPanel>
                
                <TabPanel>
                  <Prompt/>
                </TabPanel>
              </TabPanels>
            </Tabs>
        </div>
    );
}

export default NewsFeed;
// import CreatePost from "../components/NewsFeed/CreatePost";
import AllPosts from "../components/NewsFeed/Posts/AllPosts";
// import QuotesAndTipsCards from "../components/NewsFeed/QuotesAndTipsCards";
import {Grid, GridItem, useDisclosure, IconButton, Icon, Tabs, TabList, TabPanels, Tab, TabPanel, Box  } from "@chakra-ui/react"
import Prompt from "../components/NewsFeed/Prompts/Prompt";
import '../components/NewsFeed/Prompts/Prompt.scss';
import CreatePostcard from "../components/NewsFeed/Posts/CreatePostcard";
import { BsFillSendPlusFill } from "react-icons/bs";

const NewsFeed = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <div className="newsfeed">
            <h1>NewsFeed</h1>
            <Tabs align='center' isFitted mt={5}>
              <TabList>
                <Tab>Catch a Postcard flying in the Sky</Tab>
                <Tab>The Waterfall of Messages</Tab>
              </TabList>

              <TabPanels>
                <TabPanel pb={0} pt={3}>
                <Box position="relative">
                  <Box position="absolute" bottom="0" right="20%">
                    <IconButton
                      onClick={onOpen}
                      isRound={true}
                      variant='solid'
                      bg='transparent'
                      aria-label='Done'
                      fontSize='20px'
                      icon={<Icon as={BsFillSendPlusFill} boxSize={10}/>}
                    />
                  </Box>
                  <Box display="flex" justifyContent="center">
                    <AllPosts/>
                  </Box>
                  <CreatePostcard isOpen={isOpen} onClose={onClose}/>
                </Box>
                </TabPanel>
                
                <TabPanel  pb={0}>
                  <Prompt/>
                </TabPanel>
              </TabPanels>
            </Tabs>
        </div>
    );
}

export default NewsFeed;
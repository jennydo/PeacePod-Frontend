// import CreatePost from "../components/NewsFeed/CreatePost";
import AllPosts from "../components/NewsFeed/Posts/AllPosts";
// import QuotesAndTipsCards from "../components/NewsFeed/QuotesAndTipsCards";
import {Grid, GridItem, useDisclosure, IconButton, Icon, Tabs, TabList, TabPanels, Tab, TabPanel  } from "@chakra-ui/react"
import Prompt from "../components/NewsFeed/Prompts/Prompt";
import '../components/NewsFeed/Prompts/Prompt.css';
import CreatePostcard from "../components/NewsFeed/Postcards/CreatePostcard";
import { BsFillSendPlusFill } from "react-icons/bs";


const NewsFeed = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <div className="newsfeed">
            <h1>NewsFeed</h1>
            <Tabs align='center' variant='enclosed'>
              <TabList>
                <Tab>Catch a Postcard flying in the Sky</Tab>
                <Tab>The Waterfall of Messages</Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  {/* <Grid gridTemplateColumns={'25% 1fr'} m={10} gap={6} minHeight="75vh">  */}
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
                  {/* </Grid> */}
                </TabPanel>
                
                <TabPanel>
                  <Prompt/>
                </TabPanel>
              </TabPanels>
            </Tabs>




            

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
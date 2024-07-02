// import CreatePost from "../components/NewsFeed/CreatePost";
import AllPosts from "../components/NewsFeed/Posts/AllPosts";
// import QuotesAndTipsCards from "../components/NewsFeed/QuotesAndTipsCards";
import {
  useDisclosure,
  IconButton,
  Icon,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Box,
  Text,
} from "@chakra-ui/react";
import Prompt from "../components/NewsFeed/Prompts/Prompt";
import "../components/NewsFeed/Prompts/Prompt.scss";
import CreatePostcard from "../components/NewsFeed/Posts/CreatePostcard";
import { BsFillSendPlusFill } from "react-icons/bs";

const NewsFeed = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div className="newsfeed">
      <h1>NewsFeed</h1>
      <Tabs isFitted align="center" mt={5}>
        <TabList>
          <Tab h={10} p={0}>
            <Text fontSize={20}>Catch a Postcard flying in the Sky</Text>
          </Tab>
          <Tab h={10} p={0}>
            <Text fontSize={20}>The Waterfall of Messages</Text>
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel pb={0} pt={3}>
            <Box position="relative">
              <Box bottom="0" position="absolute" right="20%">
                <IconButton
                  aria-label="Done"
                  bg="transparent"
                  fontSize="20px"
                  icon={<Icon as={BsFillSendPlusFill} boxSize={10} />}
                  isRound={true}
                  variant="solid"
                  onClick={onOpen}
                />
              </Box>
              <Box display="flex" justifyContent="center">
                <AllPosts />
              </Box>
              <CreatePostcard isOpen={isOpen} onClose={onClose} />
            </Box>
          </TabPanel>

          <TabPanel pb={0}>
            <Prompt />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default NewsFeed;

import React, { useState } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  VStack,
  Box,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import SpotifyMain from "./Music/SpotifyMain";
import CreateOwnSession from "./CreateOwnSession";
import axios from "axios";

const MeditationDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const user = JSON.parse(localStorage.getItem('user'))

  const [ownSession, setOwnSession] = useState();
  const [tabIndex, setTabIndex] = useState(0);

  const handleCreateSession = async () => {
    console.log("Current tab index ", tabIndex)

    /// Index == 0 <=> Create Own Session
    if (tabIndex == 0) {

      console.log("Submitted session", ownSession)

      try {
        const response = await axios.post(
          'http://localhost:4000/api/meditation/sessions',
          ownSession,
          {
            headers: {
              Authorization: `Bearer ${user?.token}`
            }
          }
        )

        console.log("Response from creating session", response.data)
        
      } catch (err) {
        console.log("Error while creating session...", err)
      }
    }
  };

  return (
    <>
      <Button ref={btnRef} onClick={onOpen} rightIcon={<HamburgerIcon />}>
        Menu
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size="sm"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Create your Meditation Session</DrawerHeader>

          <DrawerBody>
            <VStack>
              <Box h="50%">
                <Text>Background</Text>
              </Box>
              <Box h="50%">
                <Tabs onChange={(idx) => setTabIndex(idx)}>
                  <TabList>
                    <Tab>Create your own</Tab>
                    <Tab>Choose from Spotify</Tab>
                    <Tab>Saved Voices</Tab>
                  </TabList>

                  <TabPanels>
                    <TabPanel>
                      <CreateOwnSession
                        session={ownSession}
                        setSession={setOwnSession}
                      />
                    </TabPanel>
                    <TabPanel>
                      <SpotifyMain />
                    </TabPanel>
                    <TabPanel>
                      <p>Choose from your list of saved voices</p>
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </Box>
            </VStack>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={handleCreateSession}>
              Save
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default MeditationDrawer;

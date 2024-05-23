import React, { useState, useRef, useContext } from "react";
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
  IconButton,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { GiHamburger } from "react-icons/gi";
import SpotifyMain from "./Music/SpotifyMain";
import BackgroundMain from "./Background/BackgroundMain";
import axios from "axios";
import AudioList from "./MeditationAudio/MeditationAudioList";
import { TiPlus } from "react-icons/ti";
import NewAudioModal from "./MeditationAudio/NewAudioModal";
import { CloudinaryContext } from "../../context/CloudinaryContext";
import { useAuthContext } from "../../hooks/useAuthContext";
import { SpotifyContext } from "../../context/SpotifyContext";
import { AudioContext } from "../../context/AudioContext";

const MeditationDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const user = JSON.parse(localStorage.getItem("user"));
  const [tabIndex, setTabIndex] = useState(0);
  const [isFilter, setIsFilter] = useState(false);

  /// Get chosen image from cloudinary context
  const { userImages, displayedImage } = useContext(CloudinaryContext);
  /// Get spotify from Spotify Context
  const { playingTrack } = useContext(SpotifyContext)
  /// Get audio from Audio Context
  const { chosenAudio } = useContext(AudioContext)

  /// Modal logic
  const finalRef = useRef(null);

  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();

  /// This is old version for old design, not working for new design yet
  const handleSave = async () => {
    console.log("Current tab index ", tabIndex);

    const session = {
      lastBackground: displayedImage,
      meditationAudio: chosenAudio,
      music: playingTrack,
      isPlayingAudio: tabIndex == 0, /// index === 0: audio, index = 1: spotify
    };

    try {
      const response = await axios.post(
        "http://localhost:4000/api/meditation/sessions",
        session,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );

      console.log("Response from creating session", response.data);
    } catch (err) {
      console.log("Error while creating session...", err);
    }
  };

  return (
    <>
      <Button
        marginLeft={10}
        marginBottom={1}
        ref={btnRef}
        onClick={onOpen}
        rightIcon={<GiHamburger fontSize={20} />}
      >
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
          <DrawerHeader paddingTop={0} paddingBottom={0}>
            Create your Meditation Session
          </DrawerHeader>

          <DrawerBody
            sx={{
              "::-webkit-scrollbar": {
                display: "none",
              },
            }}
          >
            <VStack h="100%">
              <Box w="100%" h="50%">
                <BackgroundMain />
              </Box>
              <Box w="100%" h="50%">
                <Tabs
                  onChange={(idx) => setTabIndex(idx)}
                  isFitted={true}
                  h="100%"
                >
                  <Text fontSize="xl" marginBottom={0} mt={3}>
                    Meditation Audio
                  </Text>
                  <TabList>
                    <Tab>Your list</Tab>
                    <Tab>Spotify</Tab>
                  </TabList>

                  <TabPanels>
                    <TabPanel padding={0}>
                      <Button
                        mt={3}
                        borderRadius={10}
                        size="sm"
                        onClick={() => setIsFilter(!isFilter)}
                        bg={isFilter ? "pink.100" : "gray.100"}
                      >
                        Filter favorite
                      </Button>
                      <AudioList isFilter={isFilter} />
                      <Button
                        leftIcon={<TiPlus />}
                        borderRadius={10}
                        size="sm"
                        onClick={onModalOpen}
                      >
                        Generate new audio
                      </Button>
                      <NewAudioModal
                        finalRef={finalRef}
                        onClose={onModalClose}
                        isOpen={isModalOpen}
                      />
                      {/* <CreateOwnSession
                        session={ownSession}
                        setSession={setOwnSession}
                      /> */}
                    </TabPanel>
                    <TabPanel>
                      <SpotifyMain />
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
            <Button colorScheme="blue" onClick={handleSave}>
              Save
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default MeditationDrawer;

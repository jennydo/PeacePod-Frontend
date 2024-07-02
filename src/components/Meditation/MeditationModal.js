import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  IconButton,
  Icon,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Button,
  DrawerFooter,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Tooltip,
} from "@chakra-ui/react";
import { LuSettings2 } from "react-icons/lu";
import { useContext, useRef } from "react";
import { CloudinaryContext } from "../../context/CloudinaryContext";
import { useSpotifyContext } from "../../hooks/useSpotifyContext";
import { AudioContext } from "../../context/AudioContext";
import SongPlayer from "./Music/SongPlayer";
import Player from "./MeditationAudio/AudioPlayer";
import BackgroundMain from "./Background/BackgroundMain";
import BackgroundColorList from "./Background/BackgroundColorList";
import axios from "axios";
import { useAuthContext } from "../../hooks/useAuthContext";

const MeditationModal = ({ isOpen, onClose }) => {
  const { displayedImage } = useContext(CloudinaryContext);
  const { accessToken, playingTrack, isPlayingSpotify } = useSpotifyContext();
  const { isPlayingAudio, chosenAudio } = useContext(AudioContext);

  const {
    isOpen: isDrawerOpen,
    onOpen: onDrawerOpen,
    onClose: onDrawerClose,
  } = useDisclosure();
  const drawerBtnRef = useRef(null);

  const { user } = useAuthContext();

  const handleSave = async () => {
    const session = {
      lastBackground: displayedImage,
      meditationAudio: chosenAudio,
      music: playingTrack?.uri,
      isPlayingAudio,
    };

    try {
      /// Create session
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

    onDrawerClose();
  };

  return (
    <Modal isOpen={isOpen} size="full" onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton color="white" zIndex={3}/>
        <ModalBody
          h="100vh"
          m={0}
          p={0}
          style={{
            backgroundImage:
              displayedImage && displayedImage[0] == "#"
                ? "none"
                : `url(${displayedImage})`,
            backgroundColor:
              displayedImage && displayedImage[0] == "#"
                ? displayedImage
                : "transparent",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
          w="100vw"
        >
          <div className="meditation modal-icon">
            <Tooltip label="Customize your background here">
              <IconButton
                _hover={{ bg: "transparent" }}
                color="white"
                fontSize="25px"
                icon={<Icon as={LuSettings2} />}
                variant="ghost"
                onClick={onDrawerOpen}
              />
            </Tooltip>
          </div>
          <div className="meditation media-player">
            {isPlayingSpotify && playingTrack && (
              <SongPlayer
                accessToken={accessToken}
                trackUri={playingTrack?.uri}
              />
            )}
            {isPlayingAudio && <Player />}
          </div>  
          
          {/* Drawer to customize background */}
          <Drawer
            finalFocusRef={drawerBtnRef}
            isOpen={isDrawerOpen}
            placement="right"
            onClose={onDrawerOpen}
          >
            <DrawerOverlay />
            <DrawerContent>
              <DrawerHeader p={0}>
                <Text fontSize="2xl" mb={0} textAlign="center">
                  Background
                </Text>
              </DrawerHeader>

              <DrawerBody p={3}>
                <Tabs isFitted variant="soft-rounded">
                  <TabList>
                    <Tab>Color</Tab>
                    <Tab>Image</Tab>
                  </TabList>

                  <TabPanels>
                    <TabPanel>
                      <BackgroundColorList />
                    </TabPanel>

                    <TabPanel>
                      <BackgroundMain />
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </DrawerBody>

              <DrawerFooter>
                <Button mr={3} variant="outline" onClick={onDrawerClose}>
                  Cancel
                </Button>
                <Button colorScheme="blue" onClick={handleSave}>
                  Save
                </Button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default MeditationModal;

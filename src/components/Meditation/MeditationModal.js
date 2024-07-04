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
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Button,
  DrawerFooter,
  Input,
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
    <Modal isOpen={isOpen} onClose={onClose} size="full">
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton color="white" zIndex={3}/>
        <ModalBody
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
          w={'100vw'}
          h={'100vh'}
          p={0}
          m={0}
        >
          <div className="meditation modal-icon">
            <Tooltip label="Customize your background here">
              <IconButton
                fontSize="25px"
                color="white"
                variant="ghost"
                _hover={{ bg: "transparent" }}
                icon={<Icon as={LuSettings2} />}
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
            isOpen={isDrawerOpen}
            placement="right"
            onClose={onDrawerOpen}
            finalFocusRef={drawerBtnRef}
          >
            <DrawerOverlay />
            <DrawerContent>
              <DrawerHeader p={0}>
                <Text fontSize={"2xl"} textAlign={"center"} mb={0}>
                  Background
                </Text>
              </DrawerHeader>

              <DrawerBody p={3}>
                <Tabs variant={"soft-rounded"} isFitted>
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
                <Button variant="outline" mr={3} onClick={onDrawerClose}>
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

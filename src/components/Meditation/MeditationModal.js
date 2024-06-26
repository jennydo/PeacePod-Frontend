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

const MeditationModal = ({ isOpen, onClose }) => {
  const { displayedImage } = useContext(CloudinaryContext);
  const { accessToken, playingTrack, isPlayingSpotify } = useSpotifyContext();
  const { isPlayingAudio } = useContext(AudioContext);

  const {
    isOpen: isDrawerOpen,
    onOpen: onDrawerOpen,
    onClose: onDrawerClose,
  } = useDisclosure();
  const drawerBtnRef = useRef();

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="full">
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton color="white" />
        <ModalBody
          style={{
            backgroundImage: `url(${displayedImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
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

          <Drawer
            isOpen={isDrawerOpen}
            placement="right"
            onClose={onDrawerOpen}
            finalFocusRef={drawerBtnRef}
          >
            <DrawerOverlay />
            <DrawerContent>
              <DrawerHeader>
                <Text fontSize={"2xl"} textAlign={"center"} mb={0}>
                  Background
                </Text>
              </DrawerHeader>

              <DrawerBody>
                {/* <Tab></Tab> */}
                <BackgroundMain />
              </DrawerBody>

              <DrawerFooter>
                <Button variant="outline" mr={3} onClick={onDrawerClose}>
                  Cancel
                </Button>
                <Button colorScheme="blue" onClick={onDrawerClose}>
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

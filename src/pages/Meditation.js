
import { Grid, GridItem, useDisclosure, Button, IconButton, Icon, Divider, Flex } from "@chakra-ui/react";
import { TiPlus } from "react-icons/ti";
import { CloudinaryContext, CloudinaryContextProvider } from "../context/CloudinaryContext";
import { useState, useRef, useContext, useEffect } from "react";
import '../components/Meditation/Meditation.scss';
import AudioList from "../components/Meditation/MeditationAudio/MeditationAudioList";
import NewAudioModal from "../components/Meditation/MeditationAudio/NewAudioModal";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import SpotifyMain from "../components/Meditation/Music/SpotifyMain";
import { SpotifyContext } from "../context/SpotifyContext";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";
import { AudioContext } from "../context/AudioContext";
import MeditationModal from "../components/Meditation/MeditationModal";
import { StyledButton } from '../styles/components/StyledComponents';

const Meditation = () => {
  const { user } = useAuthContext();
  const [tab, setTab] = useState(false);
  const [isFilter, setIsFilter] = useState(false);
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();
  const finalRef = useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    displayedImage,
    dispatch: cloudinaryDispatch,
  } = useContext(CloudinaryContext);

  const {
    playingTrack,
    dispatch: spotifyDispatch,
  } = useContext(SpotifyContext);

  const {
    chosenAudio,
    dispatch: audioDispatch,
    isPlayingAudio,
  } = useContext(AudioContext);

  // Function to fetch session from DB
  const fetchSession = async () => {
    try {
      const res = await axios.get(
        "http://localhost:4000/api/meditation/sessions/last",
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      console.log("Response from get last session", res.data);

      cloudinaryDispatch({
        type: "DISPLAY_IMAGE",
        payload: res.data.lastBackground,
      });
      audioDispatch({
        type: "CHOOSE_AUDIO",
        payload: res.data.meditationAudio,
      });
      spotifyDispatch({
        type: "SET_SPOTIFY_PLAYING_TRACK",
        payload: res.data.music
      });

      /// Update state of choosing audio for choosing spotify
      audioDispatch({ type: "CHOOSE_PLAY_AUDIO" });
      spotifyDispatch({ type: "UNCHOOSE_PLAY_SPOTIFY" });

    } catch (error) {
      console.log("Error while getting session", error);
    }
  };

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
  };

  useEffect(() => {
    fetchSession();
  }, []);

  return (
    <>
      <h1>Meditation</h1>
      <div className='meditation page'>
        <Grid className="meditation-box" gridTemplateRows={"10% 10% 2% 1fr 10%"} h={"65vh"}>
          {/* <Grid className="meditation-box" gridTemplateRows={"10% 10% 2% 1fr 10%"} h={"calc(100vh - 300px)"}> */}

          <GridItem w='100%' h='100%' className="meditation textbox">
            <h2>Let's start your meditation! ☮️</h2>
          </GridItem>

          <GridItem w='100%' h='100%'>
            <Grid gridTemplateColumns={"50% 1fr"} w='100%' h='100%' marginTop="20px">
              {/* <GridItem className="meditation audio-source-buttons" marginLeft={10}> */}
                <h4 className={`text-${tab ? "" : "selected"}`} onClick={() => setTab(false)}>Choose your own voices</h4>
              {/* </GridItem> */}
              {/* <GridItem className="meditation audio-source-buttons"> */}
                <h4 className={`text-${!tab ? "" : "selected"}`} onClick={() => setTab(true)}>Choose from Spotify</h4>
              {/* </GridItem> */}
            </Grid>
          </GridItem>

          <GridItem w='100%' h='100%' className="meditation textbox" mt={1}>
          </GridItem>

          <GridItem w='100%' h='100%'>
            {(!tab) && (
              <Grid gridTemplateRows={"10% 1fr"} w='100%' h='100%' marginTop="14px">
                <GridItem w='100%' h='100%' className="meditation-icons" marginTop="20px">

                  <Flex justifyContent="flex-end" paddingRight="38px" >
                    <IconButton
                      className="meditation-icon"
                      icon={<Icon as={TiPlus} />}
                      onClick={onModalOpen}
                      variant='ghost'
                      fontSize='30px'
                    />
                    <IconButton
                      className="meditation-icon"
                      icon={isFilter ? <Icon as={FaHeart} fill="#FFAFCC" /> : <Icon as={FaRegHeart} />}
                      onClick={() => setIsFilter(!isFilter)}
                      variant='ghost'
                      fontSize='30px'
                    />
                  </Flex>
                </GridItem>
                <GridItem w='100%' h='100%' maxHeight='30vh'>
                  <AudioList isFilter={isFilter} />
                </GridItem>
              </Grid>
              
            )}

        {(tab) && (
          <SpotifyMain />
        )}
      </GridItem>

      <GridItem w='100%' h='100%' className="meditation">
        <StyledButton text={"Start"} onClick={() => {
          handleSave();
          onOpen();
        }} />
      </GridItem>

    </Grid >
      </div >

      <NewAudioModal
        finalRef={finalRef}
        onClose={onModalClose}
        isOpen={isModalOpen}
      />

      <MeditationModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default Meditation;

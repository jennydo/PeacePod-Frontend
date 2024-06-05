import { useSpotifyContext } from "../hooks/useSpotifyContext";
import MeditationDrawer from "../components/Meditation/MeditationDrawer";
import SongPlayer from "../components/Meditation/Music/SongPlayer";
import { Grid, GridItem, calc } from "@chakra-ui/react";
import { CloudinaryContextProvider } from "../context/CloudinaryContext";
import DisplayedBackground from "../components/Meditation/Background/DisplayedBackground";
import Player from "../components/Meditation/MeditationAudio/AudioPlayer";
import { AudioContext } from "../context/AudioContext";
import { useContext } from "react";

const Meditation = () => {
  const { accessToken, playingTrack, isPlayingSpotify } = useSpotifyContext();
  const { isPlayingAudio } = useContext(AudioContext);

  return (
    <CloudinaryContextProvider>
      <Grid
        gridTemplateRows={"1fr 12%"}
        bg="green.100"
        h={'calc(100vh - 101px)'}
      >
        <GridItem w="100%" h="100%">
          <MeditationDrawer />
          <DisplayedBackground />
        </GridItem>
        <GridItem w="100%" h="100%">
          {isPlayingSpotify && playingTrack && (
            <SongPlayer
              accessToken={accessToken}
              trackUri={playingTrack?.uri}
            />
          )}
          {isPlayingAudio && <Player />}
        </GridItem>
      </Grid>
    </CloudinaryContextProvider>
  );
};

export default Meditation;

import { useSpotifyContext } from '../hooks/useSpotifyContext'
import MeditationDrawer from '../components/Meditation/MeditationDrawer';
import SongPlayer from '../components/Meditation/Music/SongPlayer';
import { Grid, GridItem } from '@chakra-ui/react';
import { CloudinaryContextProvider } from '../context/CloudinaryContext';
import DisplayedBackground from '../components/Meditation/Background/DisplayedBackground';
import Player from '../components/Meditation/MeditationAudio/AudioPlayer';

const Meditation = () => {
    const { accessToken, playingTrack } = useSpotifyContext();

    return (
        <CloudinaryContextProvider>
            <Grid gridTemplateRows={'1fr 10%'} height="85vh" gap={6}>
                <GridItem w='100%' h='100%'>
                    <MeditationDrawer />
                    <DisplayedBackground />
                </GridItem>
                <GridItem w='100%' h='100%'>
                    {playingTrack && <SongPlayer accessToken={accessToken} trackUri={playingTrack?.uri} />}
                    <Player />
                </GridItem>
            </Grid>
        </CloudinaryContextProvider>

    );
}

export default Meditation;
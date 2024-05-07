import { useSpotifyContext } from '../hooks/useSpotifyContext'
import MeditationDrawer from '../components/Meditation/MeditationDrawer';
import SongPlayer from '../components/Meditation/Music/SongPlayer';
import { Grid, GridItem } from '@chakra-ui/react';

const Meditation = () => {
    const {accessToken, playingTrack} = useSpotifyContext();

    return (  
        <Grid gridTemplateRows={'1fr 10%'} height="85vh" gap={6}>
            <GridItem w='100%' h='100%' bg='blue.500'>
                <MeditationDrawer/>
            </GridItem>
            <GridItem w='100%' h='100%'>
                {playingTrack && <SongPlayer accessToken={accessToken} trackUri={playingTrack?.uri}/>}
            </GridItem>
        </Grid>
     );
}
 
export default Meditation;
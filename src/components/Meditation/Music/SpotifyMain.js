import SpotifyList from '../Music/SpotifyList';
import SpotifyLogin from '../Music/SpotifyLogin';
import { useSpotifyContext } from '../../../hooks/useSpotifyContext';
import { Box } from '@chakra-ui/react';

const SpotifyMain = () => {
    const {spotifyCode} = useSpotifyContext();
    console.log('spotifyCode in SpotifyMain', spotifyCode)
    return ( 
        <Box>
            <p>Choose from spotify</p>
            {spotifyCode? <SpotifyList code={spotifyCode}/> : <SpotifyLogin/>}
        </Box>
     );
}
 
export default SpotifyMain;
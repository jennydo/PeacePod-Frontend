import SpotifyList from '../Music/SpotifyList';
import SpotifyLogin from '../Music/SpotifyLogin';
import { useSpotifyContext } from '../../../hooks/useSpotifyContext';
import { Box } from '@chakra-ui/react';

const SpotifyMain = () => {
    const {spotifyCode} = useSpotifyContext();
    return ( 
        <Box>
            {spotifyCode? <SpotifyList code={spotifyCode}/> : <SpotifyLogin/>}
        </Box>
     );
}
 
export default SpotifyMain;
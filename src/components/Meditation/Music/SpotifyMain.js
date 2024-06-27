import SpotifyList from '../Music/SpotifyList';
import SpotifyLogin from '../Music/SpotifyLogin';
import { useSpotifyContext } from '../../../hooks/useSpotifyContext';
import { Box, Center } from '@chakra-ui/react';

const SpotifyMain = () => {
    const {spotifyCode} = useSpotifyContext();
    return ( 
        <Center h='100%'>
            <Box>
                {spotifyCode? <SpotifyList code={spotifyCode}/> : <SpotifyLogin/>}
            </Box>
        </Center>
     );
}
 
export default SpotifyMain;
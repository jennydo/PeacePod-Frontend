import Spotify from '../components/Meditation/Music/Spotify';
import SpotifyList from '../components/Meditation/Music/SpotifyList';
import SpotifyLogin from '../components/Meditation/Music/SpotifyLogin';
import { useSpotifyContext } from '../hooks/useSpotifyContext'

const Meditation = () => {
    const {spotifyCode} = useSpotifyContext();

    return ( 
        <>
            {/* <Spotify/> */}
            {spotifyCode? <SpotifyList code={spotifyCode}/> : <SpotifyLogin/>}
        </>

     );
}
 
export default Meditation;
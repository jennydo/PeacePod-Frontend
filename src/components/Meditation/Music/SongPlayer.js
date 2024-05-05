import { useState, useEffect } from'react';
import SpotifyWebPlayer from "react-spotify-web-playback";

const SongPlayer = ({accessToken, trackUri}) => {
    const [play, setPlay] = useState(false)

    useEffect(() => setPlay(true), [trackUri])

    if (!accessToken) return null;

    return ( 
        <SpotifyWebPlayer
            token={accessToken}
            showSaveIcon
            callback={state => {
                if (!state.isPlaying) setPlay(false)
            }}
            play={play}
            uris={trackUri ? [trackUri] : []}/>
     );
}
 
export default SongPlayer;
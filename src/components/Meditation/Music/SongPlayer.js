import { useState, useEffect } from'react';
import SpotifyWebPlayer from "react-spotify-web-playback";
import './SongPlayer.css';

const SongPlayer = ({accessToken, trackUri}) => {
    const [play, setPlay] = useState(false)

    useEffect(() => setPlay(true), [trackUri])

    if (!accessToken) return null;

    const styles = {
        bgColor: "white",
        color: "#eb4b98",
        // height: number,
        // loaderColor: "black",
        // loaderSize: number | string,
        sliderColor: "#b298dc", // purple 
        sliderHandleColor: "#c21e99", // pink
        // sliderHeight: number,
        // sliderTrackBorderRadius: number | string,
        sliderTrackColor: "#6f2dbd", // purple 
        trackArtistColor: "#ef6fad",
        trackNameColor: "#eb4b98",
        ".ButtonRSWP": {
            display: "none",
          }
      }

    return ( 
        <SpotifyWebPlayer
            token={accessToken}
            callback={state => {
                if (!state.isPlaying) setPlay(false)
            }}
            hideAttribution
            magnifySliderOnHover
            layout="responsive"
            play={play}
            uris={trackUri ? [trackUri] : []}
            styles={styles}
        />
     );
}
 
export default SongPlayer;
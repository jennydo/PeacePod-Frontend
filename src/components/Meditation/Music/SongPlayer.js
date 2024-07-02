import { useState, useEffect } from 'react';
import SpotifyWebPlayer from "react-spotify-web-playback";
import './SongPlayer.css';
import { Box } from '@chakra-ui/react';

const SongPlayer = ({ accessToken, trackUri }) => {
    const [play, setPlay] = useState(false);

    useEffect(() => setPlay(true), [trackUri]);

    if (!accessToken) return null;

    // eslint-disable-next-line no-unused-vars
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
    };

    return (
        <Box bg="green" borderRadius={40} overflowWrap={true}>
            <SpotifyWebPlayer
                hideAttribution
                magnifySliderOnHover
                callback={state => {
                    if (!state.isPlaying) setPlay(false);
                }}
                layout="responsive"
                play={play}
                token={accessToken}
                uris={trackUri ? [trackUri] : []}
                // styles={styles}
            />
        </Box>

    );
};

export default SongPlayer;
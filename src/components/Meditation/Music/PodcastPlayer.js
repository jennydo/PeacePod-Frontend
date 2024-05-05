import SpotifyPlayer from 'react-spotify-web-playback';
import React from 'react';

const PodcastPlayer = ( {accessToken, trackUri}) => {
    if (!accessToken) return null;
    return ( 
    <>
    <SpotifyPlayer
        token={accessToken}
        showSaveIcon
        uris={trackUri ? [trackUri] : []}/>
    </> );
}
 
export default PodcastPlayer;
import React from 'react';
import { Button } from "@chakra-ui/react";


const SpotifyLogin = () => {
    const baseURL = "https://accounts.spotify.com/authorize";
    const clientId = "4689c7fc29174c6d9523aca2473efe45";
    const responseType = "code";
    const redirectURI = "http://localhost:3000";
    // const redirectURI = "http://localhost:3000/meditation"
    const scopes = [
        "streaming",
        "user-read-email",
        "user-read-private",
        "user-library-read",
        "user-library-modify",
        "user-read-playback-state",
        "user-modify-playback-state"
    ];

    // https://accounts.spotify.com/en/login?continue=https%3A%2F%2Faccounts.spotify.com%2Fauthorize%3Fscope%3Dstreaming%2Buser-read-email%2Buser-read-private%2Buser-library-read%2Buser-library-modify%2Buser-read-playback-state%2Buser-modify-playback-state%26response_type%3Dcode%26redirect_uri%3Dhttp%253A%252F%252Flocalhost%253A3000%252Fmeditation%26client_id%3D4689c7fc29174c6d9523aca2473efe45
    
    const AUTH_URL = `${baseURL}?client_id=${clientId}&response_type=${responseType}&redirect_uri=${redirectURI}&scope=${encodeURIComponent(scopes.join(' '))}`;
    
    return ( 
    <>
        <a href={AUTH_URL}><Button>Login with Spotify</Button></a>
    </> );
}
 
export default SpotifyLogin;
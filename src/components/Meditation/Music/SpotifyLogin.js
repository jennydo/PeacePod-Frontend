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
    
    const AUTH_URL = `${baseURL}?client_id=${clientId}&response_type=${responseType}&redirect_uri=${redirectURI}&scope=${encodeURIComponent(scopes.join(' '))}`;
    
    return ( 
    <>
        <a href={AUTH_URL}><Button>Login with Spotify</Button></a>
    </> );
}
 
export default SpotifyLogin;
import {createContext, useReducer, useEffect } from 'react';

export const SpotifyContext = createContext();

export const spotifyReducer = (state, action) => {
    switch (action.type) {
        case 'SET_SPOTIFY_CODE':
            return {
                ...state,
                spotifyCode: action.payload
            };
        case 'SET_SPOTIFY_TOKEN':
            return {
               ...state,
                accessToken: action.payload.accessToken,
            };
        case 'SET_SPOTIFY_PLAYING_TRACK':
            return {
                ...state,
                playingTrack: action.payload
            };
        case "CHOOSE_PLAY_SPOTIFY":
            return {
                ...state,
                isPlayingSpotify: true 
            };
        case "UNCHOOSE_PLAY_SPOTIFY":
            return {
                ...state,
                isPlayingSpotify: false
            };
        default:
            return state;
    }
};

export const SpotifyContextProvider = ( {children} ) => {
    const [state, dispatch] = useReducer(spotifyReducer, {
        spotifyCode: null,
        accessToken: null,
        playingTrack: null,
        isPlayingSpotify: null
    });
    
    return (
        <SpotifyContext.Provider value={ {...state, dispatch} }>
            {children}
        </SpotifyContext.Provider>
    );
};
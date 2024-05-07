import {createContext, useReducer, useEffect } from 'react';

export const SpotifyContext = createContext();

export const spotifyReducer = (state, action) => {
    switch (action.type) {
        case 'SET_SPOTIFY_CODE':
            return {
                ...state,
                spotifyCode: action.payload
            }
        case 'SET_SPOTIFY_TOKEN':
            return {
               ...state,
                accessToken: action.payload.accessToken,
                // refreshToken: action.payload.refreshToken !== undefined ? action.payload.refreshToken : state.refreshToken,
                // expiresIn: action.payload.expiresIn !== undefined ? action.payload.expiresIn : state.expiresIn,
            }
        case 'SET_SPOTIFY_PLAYING_TRACK':
            return {
                ...state,
                playingTrack: action.payload
            }
        default:
            return state
    }
}

export const SpotifyContextProvider = ( {children} ) => {
    const [state, dispatch] = useReducer(spotifyReducer, {
        spotifyCode: null,
        accessToken: null,
        // refreshToken: null, 
        // expiresIn: null,
        playingTrack: null
    })

    useEffect(()=> {
        const spotifyCode = JSON.parse(localStorage.getItem('spotifyCode'))
        if (spotifyCode) {
            dispatch({
                type: 'SET_SPOTIFY_CODE', 
                payload: spotifyCode
            })
        }
    }, [])

    useEffect(() => {
        if (state.spotifyCode) {
            localStorage.setItem('spotifyCode', JSON.stringify(state.spotifyCode))
        }
    }, [state.spotifyCode])
    
    console.log("SpotifyContext state: ", state)

    return (
        <SpotifyContext.Provider value={ {...state, dispatch} }>
            {children}
        </SpotifyContext.Provider>
    )
}
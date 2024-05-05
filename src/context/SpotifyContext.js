import {createContext, useReducer } from 'react';

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
                refreshToken: action.payload.refreshToken !== undefined ? action.payload.refreshToken : state.refreshToken,
                expiresIn: action.payload.expiresIn
            }
        case 'REMOVE_SPOTIFY_TOKEN': 
            return {
               ...state,
                accessToken: null,
                refreshToken: null,
                expiresIn: null
            }
        default:
            return state
    }
}

export const SpotifyContextProvider = ( {children} ) => {
    const [state, dispatch] = useReducer(spotifyReducer, {
        spotifyCode: null,
        accessToken: null,
        refreshToken: null, 
        expiresIn: null
    })

    // useEffect(()=> {
    //     const spotifyCode = JSON.parse(localStorage.getItem('spotify-code'))
    //     if (spotifyCode) {
    //         dispatch({
    //             type: 'SET_SPOTIFY_CODE', 
    //             payload: spotifyCode
    //         })
    //     }
    // }, [])
    
    console.log("SpotifyContext state: ", state)

    return (
        <SpotifyContext.Provider value={ {...state, dispatch} }>
            {children}
        </SpotifyContext.Provider>
    )
}
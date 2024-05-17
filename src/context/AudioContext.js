import { createContext, useReducer } from "react";

export const AudioContext = createContext()

export const audioReducer = (state, action) => {
    switch (action.type) {
        case 'GET_AUDIOS':
            return {
                ...state,
                audios: action.payload
            }
        case 'CHOOSE_AUDIO':
            return {
                ...state,
                chosenAudio: action.payload
            }
        case 'ADD_AUDIO':
            return {
                ...state,
                audios: [action.payload, ...state.audios]
            }
        default: 
            return state
    }
}

export const AudioContextProvider = ( { children }) => {
    const [ state, dispatch ] = useReducer(audioReducer, {
        audios: [],
        chosenAudio: null
    })

    /// TODO: useEffect here to get current voices attached with this user

    return (
        <AudioContext.Provider value={ {...state, dispatch }}>
            {children}
        </AudioContext.Provider>
    )
}
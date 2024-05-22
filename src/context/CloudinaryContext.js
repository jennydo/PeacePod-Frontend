import {createContext, useReducer } from 'react';

export const CloudinaryContext = createContext();


export const cloudinaryReducer = (state, action) => {
    switch (action.type) {
        case 'GET_IMAGES':
            return {
                ...state,
                // images: [...state.images,...action.payload]
                images: Array.from(new Set([...state.images, ...action.payload]))
            }
        case 'GET_USER_IMAGES':
            return {
                ...state,
                userImages: action.payload,
                // images: [...action.payload, ...state.images]
                images: Array.from(new Set([...action.payload, ...state.images]))
            }
        case 'UPLOAD_IMAGE':
            return {
                ...state,
                userImages: [action.payload, ...state.userImages],
                // images: [action.payload, ...state.images]
                images: Array.from(new Set([action.payload, ...state.images]))
            }
        case 'DISPLAY_IMAGE':
            return {
                ...state,
                displayedImage: action.payload
            }
        default:
            return state
    }
}

export const CloudinaryContextProvider = ( {children} ) => {
    const [state, dispatch] = useReducer(cloudinaryReducer, {
        images: [],
        userImages: [],
        displayedImage: null // change to the initial value of the list of images or the last image used
    })

    return (
        <CloudinaryContext.Provider value={ {...state, dispatch} }>
            {children}
        </CloudinaryContext.Provider>
    )
}
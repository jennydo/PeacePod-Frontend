import {createContext, useReducer } from 'react';

export const CloudinaryContext = createContext();


export const cloudinaryReducer = (state, action) => {
    switch (action.type) {
        case 'GET_IMAGES':
            return {
                ...state,
                images: action.payload
            }
        case 'UPLOAD_IMAGE':
            return {
                ...state,
                images: [action.payload, ...state.images]
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
        displayedImage: null // change to the initial value of the list of images or the last image used
    })

    return (
        <CloudinaryContext.Provider value={ {...state, dispatch} }>
            {children}
        </CloudinaryContext.Provider>
    )
}
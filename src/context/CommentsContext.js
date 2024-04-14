import {createContext, useReducer } from 'react';

export const CommentsContext = createContext();

export const commentsReducer = (state, action) => {
    switch (action.type) {
        case 'GET_COMMENTS':
            return {
                comments: action.payload
            }
        case 'CREATE_COMMENT':
            return {
                comments: [action.payload, ...state.comments]
            }
        case 'DELETE_COMMENT':
            return {
                comments: state.comments.filter(p => p._id !== action.payload._id) 
            }
        default:
            return state
    }
}

export const CommentsContextProvider = ( {children} ) => {
    const [state, dispatch] = useReducer(commentsReducer, {
        comments: null
    })

    return (
        <CommentsContext.Provider value={ {...state, dispatch} }>
            {children}
        </CommentsContext.Provider>
    )
}
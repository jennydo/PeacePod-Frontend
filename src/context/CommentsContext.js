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
                comments: [...state.comments, action.payload]
            }
        case 'DELETE_COMMENT':
            return {
                comments: state.comments.filter(p => p._id !== action.payload._id) 
            }
        case 'CLEAR_COMMENTS':
            return {
                comments: []
            }
        default:
            return state
    }
}


export const CommentsContextProvider = ( {children} ) => {
    // const [state, dispatch] = useReducer(commentsReducer, {
    //     comments: null
    // })

    const [state, dispatch] = useReducer(commentsReducer, {
        comments: []
    })

    return (
        <CommentsContext.Provider value={ {...state, dispatch} }>
            {children}
        </CommentsContext.Provider>
    )
}
import {createContext, useReducer } from 'react';

export const ChatsContext = createContext();

export const chatsReducer = (state, action) => {
    switch (action.type) {
        case 'GET_CHATS':
            return {
                ...state,
                chats: action.payload
            }
        case 'CREATE_CHAT':
            return {
                ...state, 
                chats: [action.payload, ...state.chats]
            }
        case 'SELECT_CHAT':
            return {
                ...state,
                selectedChat: action.payload
            }
        default:
            return state
    }
}

export const ChatsContextProvider = ( {children} ) => {
    const [state, dispatch] = useReducer(chatsReducer, {
        chats: [],
        selectedChat: null
    })

    return (
        <ChatsContext.Provider value={ {...state, dispatch} }>
            {children}
        </ChatsContext.Provider>
    )
}
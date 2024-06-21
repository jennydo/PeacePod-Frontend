import {createContext, useReducer } from 'react';

export const MessagesContext = createContext();

export const messagesReducer = (state, action) => {
    switch (action.type) {
        case 'GET_MESSAGES':
            return {
                ...state,
                messages: {
                    ...state.messages,
                    [action.payload.chatId]: action.payload.messages
                },
                // previewMessages: {
                //     ...state.previewMessages,
                //     [action.payload.chatId]: action.payload.messages[0]
                // }
            }
        case 'SET_PREVIEW_MESSAGE':
            return {
                ...state, 
                previewMessages: {
                    ...state.previewMessages,
                    [action.payload.chatId]: action.payload.message
                }
            }
        case 'NEW_MESSAGE': 
            const currentMessages = state.messages[action.payload.chatId] || [];
            return {
                ...state, 
                messages: {
                    ...state.messages,
                    [action.payload.chatId]: [
                        ...currentMessages, 
                        action.payload.message
                    ]
                },
                previewMessages: {
                   ...state.previewMessages,
                    [action.payload.chatId]: action.payload.message.content
                }
            }
        default:
            return state
    }
}

export const MessagesContextProvider = ( {children} ) => {
    const [state, dispatch] = useReducer(messagesReducer, {
        messages: {},
        previewMessages: {}
    })

    return (
        <MessagesContext.Provider value={ {...state, dispatch} }>
            {children}
        </MessagesContext.Provider>
    )
}
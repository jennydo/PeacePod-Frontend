import {createContext, useReducer } from 'react';
import { format, isToday, isThisWeek } from 'date-fns';

export const MessagesContext = createContext();

const formatDate = (dateString) => {
    const date = new Date(dateString);

    if (isToday(date)) {
        return format(date, 'HH:mm');
    } else if (isThisWeek(date)) {
        return format(date, 'EEEE');
    } else {
        return format(date, 'MM/dd');
    }
};

export const messagesReducer = (state, action) => { 

    switch (action.type) {
        case 'GET_MESSAGES':
            return {
                ...state,
                messages: {
                    ...state.messages,
                    [action.payload.chatId]: action.payload.messages
                },
            };
        case 'SET_PREVIEW_MESSAGE':
            return {
                ...state, 
                previewMessages: {
                    ...state.previewMessages,
                    [action.payload.chatId]: action.payload.message ? action.payload.message : ""
                },
                previewMessagesTimestamp: {
                    ...state.previewMessagesTimestamp,
                    [action.payload.chatId]: action.payload.timestamp ? formatDate(action.payload.timestamp): action.payload.timestamp,
                },
            };
        case 'NEW_MESSAGE': 
            // eslint-disable-next-line no-case-declarations
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
                },
                previewMessagesTimestamp: {
                    ...state.previewMessagesTimestamp,
                    // [action.payload.chatId]: formatDistanceToNow(new Date(action.payload.message.createdAt), { addSuffix: true })
                    [action.payload.chatId]: formatDate(action.payload.message.createdAt)

                },
            };
        case 'SET_CHAT_NAME': 
            return {
                ...state,
                chatNames: {
                    ...state.chatNames,
                    [action.payload.chatId]: action.payload.chatName
                }
            };
        default:
            return state;
    }
};

export const MessagesContextProvider = ( {children} ) => {
    const [state, dispatch] = useReducer(messagesReducer, {
        messages: {},
        previewMessages: {},
        previewMessagesTimestamp: {},
        chatNames: {},
    });

    return (
        <MessagesContext.Provider value={ {...state, dispatch} }>
            {children}
        </MessagesContext.Provider>
    );
};
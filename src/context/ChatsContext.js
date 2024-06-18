import {createContext, useReducer } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import io from 'socket.io-client';
import { useEffect } from 'react';
import { useChatsContext } from '../hooks/useChatsContext';

export const ChatsContext = createContext();

export const chatsReducer = (state, action) => {
    switch (action.type) {
        case 'GET_CHATS':
            return {
                ...state,
                chats: action.payload,
                selectedChat: action.payload[0]
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
        case 'NEW_NOTI':
            return {
                ...state,
                notifications: [action.payload, ...state.notifications]
            }
        // case 'SET_SOCKET':
        //     return {
        //         ...state, 
        //         socket: action.payload
        //     }
        // case 'SET_SELECTED_CHAT_COMPARE':
        //     return {
        //         ...state,
        //         selectedChatCompare: action.payload
        //     }
        default:
            return state
    }
}

export const ChatsContextProvider = ( {children} ) => {
    const [state, dispatch] = useReducer(chatsReducer, {
        chats: [],
        selectedChat: null, 
        notifications: [],
        // socket: null,
        // selectedChatCompare: null
    })

    // const { user } = useAuthContext();

    // useEffect(() => {
    //     if (!user) {
    //         return;
    //     }
    //     // connect to server
    //     const socket = io.connect('http://localhost:4000');
    //     dispatch({ type: 'SET_SOCKET', payload: socket });

    //     if (socket && state.socket) {
    //         state.socket.emit("setup", user);

    //         state.socket.on("message received", (newMessageReceived) => {
    //             console.log('getting pass firt one')
    //             if (newMessageReceived.sender._id !== user._id) {
    //                 // if chat is not selected or doesn't match current chat
    //                 console.log("new message received in receiver", newMessageReceived)
    //                 if (!state.selectedChatCompare || state.selectedChatCompare._id !== newMessageReceived.chat._id) {
    //                     console.log('getting to here')
    //                     if (!state.notifications.includes(newMessageReceived.sender)) {
    //                         dispatch({type: 'NEW_NOTI', payload: newMessageReceived.sender})
    //                     }
    //                 }
    //         }})
    //     }

    // }, [user]) 

    return (
        <ChatsContext.Provider value={ {...state, dispatch} }>
            {children}
        </ChatsContext.Provider>
    )
}
import {createContext, useReducer } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import io from 'socket.io-client';
import { useEffect } from 'react';

export const ChatsContext = createContext();

export const chatsReducer = (state, action) => {
    switch (action.type) {
        case 'GET_CHATS':
            return {
                ...state,
                chats: action.payload,
                selectedChat: action.payload ? action.payload[0] : null
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
                notifications: {
                    ...state.notifications,
                    [action.payload.username] : action.payload
                }
            }
        case 'SET_SOCKET':
            return {
                ...state, 
                socket: action.payload
            }
        case 'SET_SELECTED_CHAT_COMPARE':
            return {
                ...state,
                selectedChatCompare: action.payload
            }
        default:
            return state
    }
}

export const ChatsContextProvider = ( {children} ) => {
    const [state, dispatch] = useReducer(chatsReducer, {
        chats: [],
        selectedChat: null, 
        notifications: {},
        socket: null, 
        selectedChatCompare: null 
    })

    const { user } = useAuthContext();

    useEffect(() => {
        if (!user) {
            return;
        }
        // connect to server
        const socket = io.connect('http://localhost:4000');
        dispatch({ type: 'SET_SOCKET', payload: socket });
    }, [user]) 

    useEffect(() => {
        console.log('state.socket:', state.socket)

        if (state.socket) {
            state.socket.emit("setup", user.user);

            state.socket.on("message received", (newMessageReceived) => {
                if (newMessageReceived.sender._id !== user.user._id) {
                    // if chat is not selected or doesn't match current chat
                    if (!state.selectedChatCompare || state.selectedChatCompare._id !== newMessageReceived.chat._id) {
                        if (!Object.keys(state.notifications).some(key => key === newMessageReceived.sender.username)) {
                            const noti = {
                                username: newMessageReceived.sender.username,
                                avatar: newMessageReceived.sender.avatar,
                                chat: newMessageReceived.chat
                            }
                            dispatch({type: 'NEW_NOTI', payload: noti})
                        }
                    }
            }})
        }
    }, [state.socket])

    return (
        <ChatsContext.Provider value={ {...state, dispatch} }>
            {children}
        </ChatsContext.Provider>
    )
}
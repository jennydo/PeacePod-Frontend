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
        case 'DELETE_CHAT':
            const newChats = state.chats.filter(chat => chat._id !== action.payload)
            return {
                ...state,
                chats: newChats,
                selectedChat: newChats.length > 0? newChats[0] : null
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
        case 'ADD_ONLINE_USER':
            // if (!state.onlineUsers.some(user => user._id === action.payload._id)) {
                return {
                    ...state,
                    onlineUsers: [...state.onlineUsers, action.payload]
                };
            // }
            // return state;
        case 'REMOVE_ONLINE_USER':
            return {
                ...state,
                onlineUsers: state.onlineUsers.filter(user => user._id!== action.payload)
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
        selectedChatCompare: null,
        onlineUsers: []
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

    useEffect(() => console.log(state.onlineUsers), [state.onlineUsers])

    useEffect(() => {
        console.log('state.socket:', state.socket)

        if (state.socket) {
            state.socket.emit("setup", user.user);
            state.socket.emit('userConnected', user.user._id);

            state.socket.on('onlineUsers', (onlineUserIds) => {
                onlineUserIds.forEach(userId => {
                    dispatch({type: 'ADD_ONLINE_USER', payload: userId});
                });
            });

            state.socket.on('updateUserStatus', (data) => {
                if (data.status === 'online') {
                    dispatch({type: 'ADD_ONLINE_USER', payload: data.userId})
                    console.log(data.userId, data.username, 'has been online')
                } else if (data.status === 'offline') {
                    dispatch({type: 'REMOVE_ONLINE_USER', payload: data.userId})
                }
            });

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
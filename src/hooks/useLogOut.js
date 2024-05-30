import { useContext } from 'react'
import { useAuthContext } from './useAuthContext'
import { AudioContext } from '../context/AudioContext'
import { PromptResponsesContext } from '../context/PromptResponseContext'

export const useLogOut = () => {
    const { dispatch } = useAuthContext()
    const { dispatch: audioDispatch } = useContext(AudioContext)
    const { dispatch: promptResponsesDispatch } = useContext(PromptResponsesContext)
    const logOut = async () => {
        localStorage.removeItem('user')
        // localStorage.removeItem('spotifyCode')
        dispatch({type: "LOGOUT"})
        audioDispatch({ type: "CLEAR"})
        promptResponsesDispatch({ type: "CLEAR"})
    }
    return {logOut}
}
import { useContext } from 'react'
import { useAuthContext } from './useAuthContext'
import { AudioContext } from '../context/AudioContext'

export const useLogOut = () => {
    const { dispatch } = useAuthContext()
    const { dispatch: audioDispatch } = useContext(AudioContext)
    const logOut = () => {
        localStorage.removeItem('user')
        // localStorage.removeItem('spotifyCode')
        dispatch({type: "LOGOUT"})
        audioDispatch({ type: "CLEAR"})
    }
    return {logOut}
}
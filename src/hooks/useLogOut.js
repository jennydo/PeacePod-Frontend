import { useAuthContext } from './useAuthContext'

export const useLogOut = () => {
    const { dispatch } = useAuthContext()
    const logOut = () => {
        localStorage.removeItem('user')
        // localStorage.removeItem('spotifyCode')
        dispatch({type: "LOGOUT"})
    }
    return {logOut}
}
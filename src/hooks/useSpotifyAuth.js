import axios from 'axios';
import { useSpotifyContext } from '../hooks/useSpotifyContext'
import { useEffect } from'react';

function useSpotifyAuth(code) {
    const { refreshToken, accessToken, expiresIn, dispatch } = useSpotifyContext();

    useEffect(() => {

        axios.post('http://localhost:4000/api/spotify/login', {
            code
        })
        .then(res => {
            dispatch({
                type: 'SET_SPOTIFY_TOKEN', 
                payload: {
                    accessToken: res.data.accessToken,
                    refreshToken: res.data.refreshToken,
                    expiresIn: res.data.expiresIn
                }
            })
            // window.history.pushState({}, null, '/') 
        })
        .catch(err => {
            console.log(err)
            // window.location = '/';
        })
    }, [code])

    useEffect(() => {
        if (!refreshToken ||!expiresIn) return;

        const timeout = setInterval(() => {
            axios.post('http://localhost:4000/api/spotify/refreshToken', {
                refreshToken
            })
            .then(res => {
                console.log(res)
                dispatch({
                    type: 'SET_SPOTIFY_TOKEN', 
                    payload: {
                        accessToken: res.data.accessToken,
                        expiresIn: res.data.expiresIn
                    }
                })
            })
            .catch(err => {
                console.log(err)
                // window.location = '/';
            })
        }, (expiresIn - 60) * 1000)

        return () => { clearTimeout(timeout) }
    }, 
    [refreshToken, expiresIn])

    return accessToken
}
 
export default useSpotifyAuth;
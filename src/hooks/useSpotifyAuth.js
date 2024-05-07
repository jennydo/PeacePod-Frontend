import axios from 'axios';
import { useSpotifyContext } from '../hooks/useSpotifyContext'
import { useEffect, useState } from'react';

function useSpotifyAuth(code) {
    const { accessToken, dispatch } = useSpotifyContext();
    const [refreshToken, setRefreshToken] = useState()
    const [expiresIn, setExpiresIn] = useState()

    useEffect(() => {

        axios.post('http://localhost:4000/api/spotify/login', {
            code
        })
        .then(res => {
            setRefreshToken(res.data.refreshToken)
            setExpiresIn(res.data.expiresIn)
            dispatch({
                type: 'SET_SPOTIFY_TOKEN', 
                payload: {
                    accessToken: res.data.accessToken,
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
                setExpiresIn(res.data.expiresIn)
                dispatch({
                    type: 'SET_SPOTIFY_TOKEN', 
                    payload: {
                        accessToken: res.data.accessToken,
                    }
                })
            })
            .catch(err => {
                console.log(err)
                // window.location = '/';
            })
        }, (expiresIn - 60) * 1000)

        return () => { clearTimeout(timeout) }
    }, [refreshToken, expiresIn])

    return accessToken
}
 
export default useSpotifyAuth;
import axios from 'axios';
import { useSpotifyContext } from '../hooks/useSpotifyContext'
import { useEffect, useState } from'react';

function useSpotifyAuth(code) {
    const { refreshToken, accessToken, expiresIn, dispatch } = useSpotifyContext();
    const [isAuthComplete, setAuthComplete] = useState(false);

    useEffect(() => {
        if (!code) {
            setAuthComplete(true); // Mark as complete if no code is provided
            return;
        }

        axios.post('http://localhost:4000/api/spotify/login', {
            code
        })
        .then(res => {
            // console.log(res.data)
            dispatch({
                type: 'SET_SPOTIFY_TOKEN', 
                payload: {
                    accessToken: res.data.accessToken,
                    refreshToken: res.data.refreshToken,
                    expiresIn: res.data.expiresIn
                }
            })
            // window.history.pushState({}, null, '/') // check this again 
        })
        .catch(err => {
            console.log(err)
            window.location = '/';
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
                // dispatch({
                //     type: 'SET_SPOTIFY_TOKEN', 
                //     payload: {
                //         accessToken: res.data.accessToken,
                //         refreshToken: res.data.refreshToken,
                //         expiresIn: res.data.expiresIn
                //     }
                // })
                // window.history.pushState({}, null, '/') // check this again 
            })
            .catch(err => {
                console.log(err)
                window.location = '/';
            })
        }, (expiresIn - 60) * 1000)

        return () => { clearTimeout(timeout) }
    }, 
    [refreshToken, expiresIn])

    return isAuthComplete; 
}
 
export default useSpotifyAuth;
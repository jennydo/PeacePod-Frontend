import Home from '../components/Home/Home.js';
import { useSpotifyContext } from '../hooks/useSpotifyContext'
import { useAuthContext } from '../hooks/useAuthContext'
import { useEffect, useState } from'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const { dispatch } = useSpotifyContext();
    const { user } = useAuthContext()
    const navigate = useNavigate();

    useEffect(() => {
        const code = new URLSearchParams(window.location.search).get('code');
        console.log('user object before set spotify code: ', user);
        if (code) {
            dispatch({type: 'SET_SPOTIFY_CODE', payload: code});
            console.log('user object after set spotify code: ', user);
            navigate('/meditation'); 
        }
    }, [dispatch]); 
    
    
    return (
        <div>
            <Home /> 
        </div> 
    );
}
export default HomePage;
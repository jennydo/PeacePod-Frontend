import Home from '../components/Home/Home.js';
import { useSpotifyContext } from '../hooks/useSpotifyContext'
import { useEffect } from'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const { dispatch } = useSpotifyContext();
    const navigate = useNavigate();

    useEffect(() => {
        const code = new URLSearchParams(window.location.search).get('code');
        if (code) {
            dispatch({type: 'SET_SPOTIFY_CODE', payload: code});
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
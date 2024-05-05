import Home from '../components/Home/Home.js';
import { useSpotifyContext } from '../hooks/useSpotifyContext'
import { useEffect } from'react';

const HomePage = () => {
    // const code = new URLSearchParams(window.location.search).get('code');
    const {dispatch} = useSpotifyContext();
    // if (code) {
    //     // localStorage.setItem('spotify-code', JSON.stringify(code));
    //     dispatch({type: 'SET_SPOTIFY_CODE', payload: code});
    // }

    useEffect(() => {
        const code = new URLSearchParams(window.location.search).get('code');
        if (code) {
            // localStorage.setItem('spotify-code', JSON.stringify(code));
            dispatch({type: 'SET_SPOTIFY_CODE', payload: code});
        }
    }, [dispatch]); 
    
    
    return (
        <div>
            <Home /> 
        </div> 
    );
}
export default HomePage;
import Home from '../components/Home/Home.js';
import { useSpotifyContext } from '../hooks/useSpotifyContext'
import { useAuthContext } from '../hooks/useAuthContext'
import { useEffect } from'react';
import axios from 'axios';

const HomePage = () => {
    const { dispatch } = useSpotifyContext();
    const { user } = useAuthContext()

    useEffect(() => {
        const code = new URLSearchParams(window.location.search).get('code');
        console.log('user object before set spotify code: ', user);
        if (code) {
            dispatch({type: 'SET_SPOTIFY_CODE', payload: code});
            console.log('user object after set spotify code: ', user);
            // axios.patch(`http://localhost:4000/api/users/${user.user._id}`, 
            //     { spotifyCode: code }, 
            //     // { headers: {Authorization: `Bearer ${user.token}`} }
            // )
            //     .then(response => {
            //         console.log('Update user SpotifyCode successful:', response.data);
            //     })
            //     .catch(error => {
            //         console.error('Error while updating user SpotifyCode', error);
            //     });
        }
    }, [dispatch]); 
    
    
    return (
        <div>
            <Home /> 
        </div> 
    );
}
export default HomePage;
import {useEffect, useState} from 'react'
import axios from "axios";
import PodcastPlayer from './PodcastPlayer';

const Spotify = () => {
    const [items, setItems] = useState([])
    const [acessToken, setAccessToken] = useState("")
    const [playingTrack, setPlayingTrack] = useState(null)

    const getAccessToken = async () => {        
        const response = await axios.post("http://localhost:4000/api/spotify/getAccessToken")
        setAccessToken(response.data.accessToken)
        return response.data.accessToken
      };

    const getPlaylistItems = async (accessToken, playlistId) => {
        // const queryParams = new URLSearchParams({
        //     market: 'ES',
        //     fields: 'items(track(name,artists(name),album(name),duration_ms))',
        //     limit: 20,
        //     offset: 0
        // }).toString();
        
        // const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks?${queryParams}`, {
        // const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks?limit=20`, {
        const response = await fetch(`https://api.spotify.com/v1/shows/${playlistId}/episodes?limit=20`, {

            method: "GET",
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        if (!response.ok) {
            throw new Error(`API request failed: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        console.log('data', data.items);
        return data.items
    };
    

    useEffect(() => {
        // const playlistId = '37i9dQZF1DZ06evO4iRboc'
        // const playlistId = '37i9dQZF1DWZqd5JICZI0u'
        const playlistId = '69Jm0pfRlpnaBDaioynNaX'
        getAccessToken()
            .then(accessToken => 
                getPlaylistItems(accessToken, playlistId)
                    .then(data => {
                        setItems(data)
                    }))
            .catch(error => console.error('Error:', error));
    }, []);

    return ( 
        <>
            <h1>Meditation</h1>      
            {/* {items && items.map((item, idx) => (
                <div key={idx}>
                     <h5>{item.track.name} - {item.track.artists[0].name}</h5>
                     <h6>{item.track.duration_ms}</h6>
                     <h6>{item.track.external_urls.spotify.replace("open.spotify.com/track", "open.spotify.com/embed/track") + "?utm_source=generator"}</h6>
                     <iframe
                        style={{ borderRadius: '12px' }}
                        src={item.track.external_urls.spotify.replace("open.spotify.com/track", "open.spotify.com/embed/track") + "?utm_source=generator"}
                        width="30%"
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                     ></iframe>
                </div>
            ))} */}
            {items && items.map((item, idx) => (
                <div key={idx}>
                     <h5>{item.name}</h5>
                     <h6>{item.duration_ms}</h6>
                </div>
            ))}

            {/* <PodcastPlayer accessToken={acessToken} trackUri={items[0]}/> */}
            
        </>

     );
}
 
export default Spotify;
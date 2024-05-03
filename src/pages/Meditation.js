import {useEffect, useState} from 'react'
import axios from "axios";

const Meditation = () => {
    const [items, setItems] = useState([])

    const getAccessToken = async () => {        
        const response = await axios.post("http://localhost:4000/api/spotify/getAccessToken")
        return response.data.accessToken
      };

    const getPlaylistItems = async (accessToken, playlistId) => {
        const limit = 20;
        let offset = 0;

        const queryParams = new URLSearchParams({
            market: 'ES',
            fields: 'items(track(name,artists(name),album(name),duration_ms))',
            limit,
            offset
        }).toString();
        
        // const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks?${queryParams}`, {
        const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
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
        const playlistId = '37i9dQZF1DZ06evO4iRboc'
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
            {items && items.map((item, idx) => (
                <div key={idx}>
                     <h4>{item.track.name} - {item.track.artists[0].name}</h4>
                     <h5>{item.track.duration_ms}</h5>
                     <h5>{item.track.external_urls.spotify.replace("open.spotify.com/track", "open.spotify.com/embed/track") + "?utm_source=generator"}</h5>
                     {/* <iframe src={item.track.external_urls.spotify} width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
                     <iframe 
                         style={{ borderRadius: '12px' }} 
                         src="https://open.spotify.com/embed/track/2SPbioo65CuUB3H0aW1ID5?utm_source=generator" 
                         width="100%" height="352" allowFullScreen={true} 
                         allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                         loading="lazy"></iframe> */}
                </div>
            ))}
        </>

     );
}
 
export default Meditation;
import { Container, FormControl, Input } from '@chakra-ui/react';
import useSpotifyAuth from '../../../hooks/useSpotifyAuth';
import SpotifyWebApi from 'spotify-web-api-node';
import { useState, useEffect } from'react';
import { useSpotifyContext } from '../../../hooks/useSpotifyContext'

const SpotifyList = ({code}) => {
    const isAuthComplete = useSpotifyAuth(code);
    const { accessToken } = useSpotifyContext();
    // const accessToken = useSpotifyAuth(code);

    // if (!isAuthComplete) {
    //     return <div>Loading...</div>; // Render loading state until auth is complete
    // }

    console.log('after useSpotifyAuth:',accessToken)
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([])
    const spotifyApi = new SpotifyWebApi({
        clientId: '4689c7fc29174c6d9523aca2473efe45'
    });

    useEffect(() => {
        if (!accessToken) return;
        console.log('about to set access token')
        spotifyApi.setAccessToken(accessToken);
    }, [accessToken])

    useEffect(() => {
        if (!search) return setSearchResults([]);
        console.log('pass the first search')
        if (!accessToken) return;

        console.log("searching...")
        spotifyApi.searchTracks(search)
            .then(res => {
                console.log(res.body.tracks.items)
            })
            .catch(err => {
                console.error("Failed to search tracks:", err);
            });

    }, [search, accessToken])
    
    return ( 
        <Container>
            <div>{code}</div>
            {/* <FormControl> */}
                <Input 
                    type='search' 
                    placeholder='Search songs/artists'
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
            {/* </FormControl> */}
            
        </Container>
       
     );
}
 
export default SpotifyList;
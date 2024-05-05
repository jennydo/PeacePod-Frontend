import { Container, Input } from '@chakra-ui/react';
import useSpotifyAuth from '../../../hooks/useSpotifyAuth';
import SpotifyWebApi from 'spotify-web-api-node';
import { useState, useEffect } from'react';
import TrackSearchResult from './TrackSearchResult';
import SongPlayer from './SongPlayer';

const SpotifyList = ({code}) => {
    const accessToken = useSpotifyAuth(code);
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([])
    const [playingTrack, setPlayingTrack] = useState(null);

    const chooseTrack = (track) => {
        setPlayingTrack(track)
        setSearch('')
    }

    const spotifyApi = new SpotifyWebApi({
        clientId: '4689c7fc29174c6d9523aca2473efe45'
    });

    // useEffect(() => {
    //     if (!accessToken) return;
    //     console.log('about to set access token')
    //     spotifyApi.setAccessToken(accessToken);
    // }, [accessToken])

    useEffect(() => {
        if (!search) return setSearchResults([]);
        if (!accessToken) return;

        let cancel = false;
        spotifyApi.setAccessToken(accessToken);
        spotifyApi.searchTracks(search)
            .then(res => {
                if (cancel) return;
                setSearchResults(res.body.tracks.items.map(track => {
                    const smallestAlbImg = track.album.images.reduce((smallest, img) => {
                        if (img.height < smallest.height) return img;
                        return smallest;
                    }, track.album.images[0]);

                    return {
                        artist: track.artists[0].name,
                        title: track.name,
                        uri: track.uri,
                        albumUrl: smallestAlbImg.url
                    }
                }))
            })
            .catch(err => {
                console.error("Failed to search tracks:", err);
            });
        return () => { cancel = true }
    }, [search, accessToken])
    
    return ( 
        <Container>
            <Input 
                type='search' 
                placeholder='Search songs/artists'
                value={search}
                onChange={e => setSearch(e.target.value)}
            />
            {searchResults && searchResults.map((track, idx) => (
                <TrackSearchResult key={track.uri} track={track} chooseTrack={chooseTrack}/>
            ))}
            <SongPlayer accessToken={accessToken} trackUri={playingTrack?.uri}/>
        </Container>
       
     );
}
 
export default SpotifyList;
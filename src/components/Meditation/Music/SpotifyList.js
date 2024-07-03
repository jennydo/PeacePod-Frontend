import { Container, Input } from '@chakra-ui/react';
import useSpotifyAuth from '../../../hooks/useSpotifyAuth';
import SpotifyWebApi from 'spotify-web-api-node';
import { useState, useEffect, useContext } from 'react';
import { useState, useEffect, useContext } from 'react';
import TrackSearchResult from './TrackSearchResult';
import { useSpotifyContext } from '../../../hooks/useSpotifyContext';
import { AudioContext } from '../../../context/AudioContext';

const SpotifyList = ({ code }) => {
const SpotifyList = ({ code }) => {
    const accessToken = useSpotifyAuth(code);
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([])
    const { dispatch } = useSpotifyContext();
    const { dispatch: audioDispatch } = useContext(AudioContext);

    const { dispatch: audioDispatch } = useContext(AudioContext);


    const chooseTrack = (track) => {
        dispatch({
            type: 'SET_SPOTIFY_PLAYING_TRACK',
            payload: track
        })
        dispatch({ type: "CHOOSE_PLAY_SPOTIFY" })
        audioDispatch({ type: "UNCHOOSE_PLAY_AUDIO" });
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

    return (
        <Container>
            <Input
                type='search'
                placeholder='Search Songs/Artists on Spotify'
                value={search}
                onChange={e => setSearch(e.target.value)}
                w="400px"
                h="70px"
                p={4}
                borderRadius="full"
                border="2px solid #FFB6C1"
                focusBorderColor="#FFB6C1"
                _placeholder={{
                    color: 'gray.400',
                    fontStyle: 'italic'
                }}
                _hover={{
                    borderColor: '#FFB6C1'
                }}
                _focus={{
                    outline: 'none',
                    boxShadow: '0 0 10px rgba(255, 105, 180, 0.5)'
                }}
            />
            <div style={{
                maxHeight: '400px',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column'
            }}>
                {searchResults && searchResults.map((track, idx) => (
                    <TrackSearchResult key={track.uri} track={track} chooseTrack={chooseTrack} />
                ))}
            </div>
        </Container>
    );
}

export default SpotifyList;
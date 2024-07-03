import { Container, Input } from '@chakra-ui/react';
import useSpotifyAuth from '../../../hooks/useSpotifyAuth';
import SpotifyWebApi from 'spotify-web-api-node';
import { useState, useEffect, useContext } from 'react';
import TrackSearchResult from './TrackSearchResult';
import { useSpotifyContext } from '../../../hooks/useSpotifyContext';
import { AudioContext } from '../../../context/AudioContext';

const SpotifyList = ({ code }) => {
    const accessToken = useSpotifyAuth(code);
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const { dispatch } = useSpotifyContext();
    const { dispatch: audioDispatch } = useContext(AudioContext);


    const chooseTrack = (track) => {
        dispatch({
            type: 'SET_SPOTIFY_PLAYING_TRACK',
            payload: track
        });
        dispatch({ type: "CHOOSE_PLAY_SPOTIFY" });
        audioDispatch({ type: "UNCHOOSE_PLAY_AUDIO" });
        setSearch('');
    };

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
                    };
                }));
            })
            .catch(err => {
                console.error("Failed to search tracks:", err);
            });
        return () => { cancel = true; };
    }, [search, accessToken]);

    return (
        <Container>
            <Input
                placeholder='Search songs/artists'
                type='search'
                value={search}
                onChange={e => setSearch(e.target.value)}
            />
            {searchResults && searchResults.map((track) => (
                <TrackSearchResult key={track.uri} chooseTrack={chooseTrack} track={track} />
            ))}
        </Container>

    );
};

export default SpotifyList;
import { renderHook, act } from '@testing-library/react';
import { SpotifyContextProvider } from '../../context/SpotifyContext';
import { useSpotifyContext} from '../../hooks/useSpotifyContext';

const wrapper = ({ children }) => (
    <SpotifyContextProvider>{children}</SpotifyContextProvider>
);

describe('useSpotifyContext', () => {
  it('throws an error when used outside SpotifyContextProvider', () => {
    const { result } = renderHook(() => {
      try {
        useSpotifyContext();
      } catch (error) {
        return error;
      }
    });
    expect(result.current).toEqual(Error('useSpotifyContext must be used inside a SpotifyContextProvider'));
  });

  it('returns the context value when used within SpotifyContextProvider', () => {
    const { result } = renderHook(() => useSpotifyContext(), { wrapper });
    expect(result.current.spotifyCode).toEqual(null);
    expect(result.current.accessToken).toEqual(null);
    expect(result.current.playingTrack).toEqual(null);
    expect(result.current.isPlayingSpotify).toEqual(null);
    expect(typeof result.current.dispatch).toBe('function');
  });

  it('dispatches SET_SPOTIFY_CODE action correctly', () => {
    const { result } = renderHook(() => useSpotifyContext(), { wrapper });
    const testSpotifyCode = "spotify_code";
    act(() => { 
        result.current.dispatch({ type: 'SET_SPOTIFY_CODE', payload: testSpotifyCode });
      });
    expect(result.current.spotifyCode).toEqual(testSpotifyCode);
  });

  it('dispatches SET_SPOTIFY_TOKEN action correctly', () => {
    const { result } = renderHook(() => useSpotifyContext(), { wrapper });
    const testSpotifyToken = {accessToken: "spotify_token"};
    act(() => { 
        result.current.dispatch({ type: 'SET_SPOTIFY_TOKEN', payload: testSpotifyToken });
      });
    expect(result.current.accessToken).toEqual(testSpotifyToken.accessToken);
  });

  it('dispatches SET_SPOTIFY_PLAYING_TRACK action correctly', () => {
    const { result } = renderHook(() => useSpotifyContext(), { wrapper });
    const testPlayingTrack = "spotify_playing_track";
    act(() => { 
        result.current.dispatch({ type: 'SET_SPOTIFY_PLAYING_TRACK', payload: testPlayingTrack });
      });
    expect(result.current.playingTrack).toEqual(testPlayingTrack);
  });

  it('dispatches CHOOSE_PLAY_SPOTIFY action correctly', () => {
    const { result } = renderHook(() => useSpotifyContext(), { wrapper });
    act(() => { 
        result.current.dispatch({ type: 'CHOOSE_PLAY_SPOTIFY' });
      });
    expect(result.current.isPlayingSpotify).toEqual(true);
  });

  it('dispatches UNCHOOSE_PLAY_SPOTIFY action correctly', () => {
    const { result } = renderHook(() => useSpotifyContext(), { wrapper });
    act(() => { 
        result.current.dispatch({ type: 'UNCHOOSE_PLAY_SPOTIFY' });
      });
    expect(result.current.isPlayingSpotify).toEqual(false);
  });
});

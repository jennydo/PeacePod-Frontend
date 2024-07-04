/* eslint-disable no-undef */
import { renderHook, act } from '@testing-library/react';
import { PostsContextProvider } from '../../context/PostsContext';
import { usePostsContext} from '../../hooks/usePostsContext';

const wrapper = ({ children }) => (
    <PostsContextProvider>{children}</PostsContextProvider>
);

describe('usePostsContext', () => {
  it('throws an error when used outside PostsContextProvider', () => {
    const { result } = renderHook(() => {
      try {
        usePostsContext();
      } catch (error) {
        return error;
      }
    });
    expect(result.current).toEqual(Error('usePostsContext must be used inside a PostsContextProvider'));
  });

  it('returns the context value when used within PostsContextProvider', () => {
    const { result } = renderHook(() => usePostsContext(), { wrapper });
    expect(result.current.posts).toEqual([]);
    expect(typeof result.current.dispatch).toBe('function');
  });

  it('dispatches GET_POSTS action correctly', () => {
    const { result } = renderHook(() => usePostsContext(), { wrapper });
    const testPosts = [{ _id: '1', title: 'Test Post' }, { _id: '2', title: 'Test Post 2' }];
    act(() => { // Wrap the update in act(...)
        result.current.dispatch({ type: 'GET_POSTS', payload: testPosts });
      });
    expect(result.current.posts).toEqual(testPosts);
  });

  it('dispatches CREATE_POST action correctly', () => {
    const { result } = renderHook(() => usePostsContext(), { wrapper });
    const initialPosts = result.current.posts;
    const newPost = { _id: '2', title: 'New Post' };
    act(() => {
        result.current.dispatch({ type: 'CREATE_POST', payload: newPost });
    });
    expect(result.current.posts).toEqual([newPost, ...initialPosts]);
  });

  it('dispatches UPDATE_POST action correctly', () => {
    const { result } = renderHook(() => usePostsContext(), { wrapper });
    const initialPost = { _id: '3', title: 'Initial Post', isPrompt: true };
    act(() => {
        result.current.dispatch({ type: 'GET_POSTS', payload: [initialPost] });
    });
    expect(result.current.posts[0].isPrompt).toBe(true);
    act(() => {
        result.current.dispatch({ type: 'UPDATE_POST', payload: initialPost });
    });
    expect(result.current.posts[0].isPrompt).toBe(false);
  });

  it('dispatches DELETE_POST action correctly', () => {
    const { result } = renderHook(() => usePostsContext(), { wrapper });
    const initialPosts = [
      { _id: '4', title: 'Post 1' },
      { _id: '5', title: 'Post 2' },
    ];
    act(() => {
        result.current.dispatch({ type: 'GET_POSTS', payload: initialPosts });
    });
    expect(result.current.posts.length).toBe(2);
    const postToDelete = { _id: '4', title: 'Post 1' };
    act(() => {
        result.current.dispatch({ type: 'DELETE_POST', payload: postToDelete });
    });
    expect(result.current.posts.length).toBe(1);
    expect(result.current.posts[0]._id).toBe('5');
  });
});

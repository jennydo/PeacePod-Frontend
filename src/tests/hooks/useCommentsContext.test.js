import { renderHook, act } from '@testing-library/react';
import { CommentsContextProvider } from '../../context/CommentsContext';
import { useCommentsContext} from '../../hooks/useCommentsContext';

const wrapper = ({ children }) => (
    <CommentsContextProvider>{children}</CommentsContextProvider>
);

describe('useCommentsContext', () => {
  it('throws an error when used outside CommentsContextProvider', () => {
    const { result } = renderHook(() => {
      try {
        useCommentsContext();
      } catch (error) {
        return error;
      }
    });
    expect(result.current).toEqual(Error('useCommentsContext must be used inside a CommentsContextProvider'));
  });

  it('returns the context value when used within CommentsContextProvider', () => {
    const { result } = renderHook(() => useCommentsContext(), { wrapper });
    expect(result.current.comments).toEqual([]);
    expect(typeof result.current.dispatch).toBe('function');
  });

  it('dispatches GET_COMMENTS action correctly', () => {
    const { result } = renderHook(() => useCommentsContext(), { wrapper });
    const testComments = [{ _id: '0', content: 'Test Comment 1' }, { _id: '1', content: 'Test Comment 2' }];
    act(() => { 
        result.current.dispatch({ type: 'GET_COMMENTS', payload: testComments });
      });
    expect(result.current.comments).toEqual(testComments);
  });

  it('dispatches CREATE_COMMENT action correctly', () => {
    const { result } = renderHook(() => useCommentsContext(), { wrapper });
    const initialComments = result.current.comments;
    const newComment = { _id: '2', title: 'New Comment' };
    act(() => {
        result.current.dispatch({ type: 'CREATE_COMMENT', payload: newComment });
    });
    expect(result.current.comments).toEqual([...initialComments, newComment]);
  });

  it('dispatches DELETE_COMMENT action correctly', () => {
    const { result } = renderHook(() => useCommentsContext(), { wrapper });
    const testComments = [{ _id: '0', content: 'Test Comment 1' }, { _id: '1', content: 'Test Comment 2' }];
    act(() => {
        result.current.dispatch({ type: 'GET_COMMENTS', payload: testComments });
    });
    expect(result.current.comments.length).toBe(2);
    const commentToDelete = { _id: '1', content: 'Test Comment 2' };
    act(() => {
        result.current.dispatch({ type: 'DELETE_COMMENT', payload: commentToDelete });
    });
    expect(result.current.comments.length).toBe(1);
    expect(result.current.comments[0]._id).toBe('0');
  });

  it('dispatches CLEAR_COMMENTS action correctly', () => {
    const { result } = renderHook(() => useCommentsContext(), { wrapper });
    const testComments = [{ _id: '0', content: 'Test Comment 1' }, { _id: '1', content: 'Test Comment 2' }];
    act(() => {
        result.current.dispatch({ type: 'GET_COMMENTS', payload: testComments });
    });
    expect(result.current.comments.length).toBe(2);
    act(() => {
        result.current.dispatch({ type: 'CLEAR_COMMENTS'});
    });
    expect(result.current.comments.length).toBe(0);
  });
});

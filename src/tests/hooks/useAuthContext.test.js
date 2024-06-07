import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { AuthContextProvider, AuthContext } from '../../context/AuthContext';
import { useAuthContext } from '../../hooks/useAuthContext';

// Helper to wrap components in AuthContextProvider
const wrapper = ({ children }) => (
  <AuthContextProvider>{children}</AuthContextProvider>
);

describe('useAuthContext', () => {
    it('returns the context value when used within AuthContextProvider', () => {
        const { result } = renderHook(() => useAuthContext(), { wrapper });
        expect(result.current.user).toBeNull(); // result.current: This represents the current value returned by the hook.
        expect(typeof result.current.dispatch).toBe('function');
    });

    it('throws an error when used outside AuthContextProvider', () => {
        const { result } = renderHook(() => {
            try { useAuthContext(); } 
            catch (error) { return error; }
        });
        expect(result.current).toEqual(Error('useAuthContext must be used inside an AuthContextProvider'));
    });

    it('dispatches LOGIN action correctly', () => {
        const user = { name: 'John Doe', token: 'abc123' };
        const { result } = renderHook(() => useAuthContext(), { wrapper });
        act(() => {
            result.current.dispatch({ type: 'LOGIN', payload: user });
        });
        expect(result.current.user).toEqual(user);
    });
    
    it('dispatches LOGOUT action correctly', () => {
        const user = { name: 'John Doe', token: 'abc123' };
        const { result } = renderHook(() => useAuthContext(), { wrapper });
        // First log in the user
        act(() => {
            result.current.dispatch({ type: 'LOGIN', payload: user });
        });
        expect(result.current.user).toEqual(user);
    
        // Then log out the user
        act(() => {
            result.current.dispatch({ type: 'LOGOUT' });
        });
        expect(result.current.user).toBeNull();
    });
});


// import { render, screen } from '@testing-library/react';
// import App from '../App';

// it('renders learn react link', () => {
//   render(<App />); 
//   const linkElement = screen.queryByText("");
//   expect(linkElement).toBeInTheDocument();
// });

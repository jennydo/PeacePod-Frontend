import React from 'react'; 
import { renderHook, act } from '@testing-library/react';
import { useLogOut } from '../../hooks/useLogOut';
import { useAuthContext } from '../../hooks/useAuthContext';
import { AudioContext } from '../../context/AudioContext';
import { PromptResponsesContext } from '../../context/PromptResponseContext';

// Mock the contexts and localStorage
// automatically mock the module located at ./useAuthContext
// replaces the actual implementation of useAuthContext with a mock version
jest.mock('../../hooks/useAuthContext');
// mocks the useContext hook from the react library
jest.mock('react', () => ({
  ...jest.requireActual('react'), 
  // a spread operator that imports the actual react module
  // By doing this, we keep all the actual functionalities of the react module, except for the ones we explicitly override.
  useContext: jest.fn() 
  // override the actual useContext implementation with a mock function (jest.fn()). 
  // This allows us to control how useContext behaves in our tests.
}));

describe('useLogOut', () => {
  const dispatch = jest.fn();
  const audioDispatch = jest.fn();
  const promptResponsesDispatch = jest.fn();

  // The beforeEach function runs before each test case within the describe block
  beforeEach(() => {
    useAuthContext.mockReturnValue({ dispatch });
    React.useContext.mockImplementation((context) => {
      if (context === AudioContext) {
        return { dispatch: audioDispatch };
      }
      if (context === PromptResponsesContext) {
        return { dispatch: promptResponsesDispatch };
      }
    });

    // Mock localStorage
    // global is an object that provides access to global variables and functions from any part of your codebase.
    // global.localStorage = {
    //     removeItem: jest.fn() // Mock removeItem function
    // };
    Object.defineProperty(window, 'localStorage', {
        value: {
          removeItem: jest.fn()
        },
        writable: true
      });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should remove user from localStorage', async () => {
    const { result } = renderHook(() => useLogOut());

    await act(async () => {
      await result.current.logOut();
    });

    expect(localStorage.removeItem).toHaveBeenCalledWith('user');
  });

  it('should dispatch LOGOUT action to auth context', async () => {
    const { result } = renderHook(() => useLogOut());

    await act(async () => {
      await result.current.logOut();
    });

    expect(dispatch).toHaveBeenCalledWith({ type: 'LOGOUT' });
  });

  it('should dispatch CLEAR action to audio context', async () => {
    const { result } = renderHook(() => useLogOut());

    await act(async () => {
      await result.current.logOut();
    });

    expect(audioDispatch).toHaveBeenCalledWith({ type: 'CLEAR' });
  });

  it('should dispatch CLEAR action to prompt responses context', async () => {
    const { result } = renderHook(() => useLogOut());

    await act(async () => {
      await result.current.logOut();
    });

    expect(promptResponsesDispatch).toHaveBeenCalledWith({ type: 'CLEAR' });
  });
});

import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { ChatsContextProvider, ChatsContext } from '../../context/ChatsContext';
import { useChatsContext } from '../../hooks/useChatsContext';

const wrapper = ({ children }) => (
  <ChatsContextProvider>{children}</ChatsContextProvider>
);

describe('useChatsContext', () => {
    it('throws an error when used outside ChatsContextProvider', () => {
      const { result } = renderHook(() => {
        try {
            useChatsContext();
        } catch (error) {
          return error;
        }
      });
      expect(result.current).toEqual(Error('useChatsContext must be used inside a ChatsContextProvider'));
    });
  
    it('returns the context value when used within ChatsContextProvider', () => {
      const { result } = renderHook(() => useChatsContext(), { wrapper });
      expect(result.current.chats).toEqual([]);
      expect(typeof result.current.dispatch).toBe('function');
    });
  
    it('dispatches GET_CHATS action correctly', () => {
      const { result } = renderHook(() => useChatsContext(), { wrapper });
      const testChats = [{ _id: '1', chat: 'Test Chat' }, { _id: '2', chat: 'Test Chat 2' }];
      act(() => { // Wrap the update in act(...)
          result.current.dispatch({ type: 'GET_CHATS', payload: testChats });
        });
      expect(result.current.chats).toEqual(testChats);
    });
  
    it('dispatches CREATE_CHAT action correctly', () => {
      const { result } = renderHook(() => useChatsContext(), { wrapper });
      const initialChats = result.current.chats;
      const newChat = { _id: '2', chat: 'New Chat' };
      act(() => {
          result.current.dispatch({ type: 'CREATE_CHAT', payload: newChat });
      })
      expect(result.current.chats).toEqual([newChat, ...initialChats]);
    });
  
    it('dispatches SELECT_CHAT action correctly', () => {
      const { result } = renderHook(() => useChatsContext(), { wrapper });
      const testChats = [{ _id: '1', chat: 'Test Chat' }, { _id: '2', chat: 'Test Chat 2' }];
      act(() => { // Wrap the update in act(...)
          result.current.dispatch({ type: 'GET_CHATS', payload: testChats });
        });
      const selectChat = testChats[1];
      act(() => { // Wrap the update in act(...)
        result.current.dispatch({ type: 'SELECT_CHAT', payload: result.current.chats[1] });
      });
      expect(result.current.selectedChat).toEqual(selectChat)
    });
  });
  
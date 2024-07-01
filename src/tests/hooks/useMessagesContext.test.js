import { renderHook, act } from '@testing-library/react';
import { MessagesContextProvider } from '../../context/MessagesContext';
import { useMessagesContext} from '../../hooks/useMessagesContext';

const wrapper = ({ children }) => (
    <MessagesContextProvider>{children}</MessagesContextProvider>
);

describe('useMessagesContext', () => {
  it('throws an error when used outside MessagesContextProvider', () => {
    const { result } = renderHook(() => {
      try {
        useMessagesContext();
      } catch (error) {
        return error;
      }
    });
    expect(result.current).toEqual(Error('useMessagesContext must be used inside a MessagesContextProvider'));
  });

  it('returns the context value when used within MessagesContextProvider', () => {
    const { result } = renderHook(() => useMessagesContext(), { wrapper });
    expect(result.current.messages).toEqual({});
    expect(result.current.previewMessages).toEqual({});
    expect(result.current.previewMessagesTimestamp).toEqual({});
    expect(typeof result.current.dispatch).toBe('function');
  });

  it('dispatches GET_MESSAGES action correctly', () => {
    const { result } = renderHook(() => useMessagesContext(), { wrapper });
    const testMessages = {
        chatId: "chat-id-test",
        messages: [
            { _id: '1', content: 'Hello, World!' },
            { _id: '2', content: 'This is a test message.' },
        ]
    };
    act(() => { 
        result.current.dispatch({ type: 'GET_MESSAGES', payload: testMessages });
      });
    const expectedResult = {[testMessages.chatId]: testMessages.messages}
    expect(result.current.messages).toEqual(expectedResult);
  });

  it('dispatches SET_PREVIEW_MESSAGE action correctly', () => {
    const { result } = renderHook(() => useMessagesContext(), { wrapper });
    const testMessage = {
        chatId: "chat-id-test",
        message: 'Hello, World!',
        timestamp: "2021-06-02T14:17:57.981Z"
    };
    act(() => {
        result.current.dispatch({ type: 'SET_PREVIEW_MESSAGE', payload: testMessage });
    })
    expect(result.current.previewMessages[testMessage.chatId]).toEqual(testMessage.message);
    expect(result.current.previewMessagesTimestamp[testMessage.chatId]).toEqual('06/02');
  });

  it('dispatches NEW_MESSAGE action correctly', () => {
    const { result } = renderHook(() => useMessagesContext(), { wrapper });
    const testMessages = {
        chatId: "chat-id-test",
        messages: [
            { _id: '1', content: 'Hello, World!', createdAt: "2020-06-03T14:18:27.981Z" },
            { _id: '2', content: 'This is a test message.', createdAt: "2019-09-02T14:18:27.981Z" },
        ]
    };
    act(() => { 
        result.current.dispatch({ type: 'GET_MESSAGES', payload: testMessages });
    });
    const expectedResult = {[testMessages.chatId]: testMessages.messages}
    expect(result.current.messages).toEqual(expectedResult);

    const newMessage = {
        chatId: testMessages.chatId,
        message: { _id: '3', content: 'This is a new message.', createdAt: "2021-06-02T14:18:27.981Z" },
    }
    act(() => {
        result.current.dispatch({ type: 'NEW_MESSAGE', payload: newMessage });
    })

    const expectedMessages = [...testMessages.messages, newMessage.message];
    expect(result.current.messages[newMessage.chatId]).toStrictEqual(expectedMessages);
    expect(result.current.previewMessages[newMessage.chatId]).toEqual(newMessage.message.content);
    expect(result.current.previewMessagesTimestamp[newMessage.chatId]).toEqual('06/02');
  });
});

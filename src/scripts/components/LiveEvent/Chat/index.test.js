import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { WSContext } from '../../../common/WSContext';
import { EventProvider } from '../../../common/EventContext';
import Chat from '.';

describe('Chat component', () => {
  test('it renders and initially shows no messages', async () => {
    const { getByText } = render(
      <WSContext.Provider
        value={{
          ws: { addEventListener() {}, removeEventListener() {} },
          fallback: false,
        }}
      >
        <EventProvider>
          <Chat />
        </EventProvider>
      </WSContext.Provider>
    );

    expect(getByText('No messages yet')).toBeInTheDocument();
  });

  test('it renders the fallback state if websocket is unavailable', () => {
    const { getByText } = render(
      <WSContext.Provider
        value={{
          ws: { addEventListener() {}, removeEventListener() {} },
          fallback: true,
        }}
      >
        <EventProvider>
          <Chat />
        </EventProvider>
      </WSContext.Provider>
    );

    expect(getByText('Currently unavailable')).toBeInTheDocument();
  });

  test('it will fire a a websocket message when the chat form is submitted', () => {
    const send = jest.fn();

    const { getByPlaceholderText, getByTitle } = render(
      <WSContext.Provider
        value={{
          ws: { addEventListener() {}, removeEventListener() {}, send },
          fallback: false,
        }}
      >
        <EventProvider>
          <Chat />
        </EventProvider>
      </WSContext.Provider>
    );

    fireEvent.change(getByPlaceholderText('Enter message...'), {
      target: { value: 'Hello' },
    });
    fireEvent.click(getByTitle('Send message'));

    expect(send).toHaveBeenCalled();

    const json = JSON.parse(send.mock.calls[0][0]);
    expect(json.data.content).toBe('Hello');
  });
});

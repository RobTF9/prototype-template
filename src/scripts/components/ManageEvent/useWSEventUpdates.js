import { useState, useRef, useEffect } from 'react';
import ReconnectingWebSocket from 'reconnecting-websocket';
import { useQueryClient } from 'react-query';

export default (wsEndpoint, jwt) => {
  const MAX_RETRIES = 3;
  const [ready, setReady] = useState(false);
  const ws = useRef(null);
  const queryClient = useQueryClient();

  // Connect to websocket
  useEffect(() => {
    // Check for valid URL
    let url = {};
    try {
      url = new URL(wsEndpoint);
    } catch (error) {
      console.log('Invalid WS endoint');
    }

    // Connect websocket
    if (url.href) {
      ws.current = new ReconnectingWebSocket(`${url.href}?token=${jwt}`, [], {
        maxRetries: MAX_RETRIES + 1,
      });

      ws.current.addEventListener('open', () => {
        setReady(true);
      });

      // If it errors and reaches max retries, set fallback to true to use polling
      ws.current.addEventListener('error', () => {
        if (ws.current.retryCount > MAX_RETRIES) {
          ws.current.close();
          console.log('WS connection max retries reached');
        }
      });
    }
  }, [jwt, wsEndpoint]);

  // Websocket message listener
  useEffect(() => {
    const handleEventMessage = e => {
      const { type, body } = JSON.parse(e.data);

      if (type === 'event-update') {
        switch (body.type) {
          case 'eventReady':
          case 'eventPaused':
          case 'eventStarted':
          case 'eventFinished':
          case 'eventNameChanged':
          case 'eventTimesChanged':
            queryClient.invalidateQueries('event');
            break;

          default:
            break;
        }
      }
    };

    if (ready) {
      ws.current.addEventListener('message', handleEventMessage);
    }

    return () => {
      if (ws.current) {
        ws.current.removeEventListener('message', handleEventMessage);
      }
    };
  }, [queryClient, ready]);
};

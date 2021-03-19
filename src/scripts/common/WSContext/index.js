import React, { createContext, useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReconnectingWebSocket from 'reconnecting-websocket';

export const WSContext = createContext(null);

export const WSProvider = ({ children, wsEndpoint, jwt }) => {
  const MAX_RETRIES = 3;
  const [ready, setReady] = useState(false);
  const [fallback, setFallback] = useState(false);
  const ws = useRef(null);

  useEffect(() => {
    // Check for valid URL
    let url = {};
    try {
      url = new URL(wsEndpoint);
    } catch (error) {
      setFallback(true);
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
          setFallback(true);
        }
      });
    }
  }, [jwt, wsEndpoint]);

  return (
    <WSContext.Provider value={{ ws: ws.current, ready, fallback }}>
      {children}
    </WSContext.Provider>
  );
};

WSProvider.propTypes = {
  children: PropTypes.object,
  wsEndpoint: PropTypes.string,
  jwt: PropTypes.string,
};

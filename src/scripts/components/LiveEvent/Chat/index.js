import React, {
  Fragment,
  useState,
  useEffect,
  useRef,
  useContext,
} from 'react';
import PropTypes from 'prop-types';
import format from 'date-fns/format';
import { WSContext } from '../../../common/WSContext';
import { EventContext } from '../../../common/EventContext';

function Chat({ displayName }) {
  const MAX_MESSAGES = 100;
  const [messages, setMessages] = useState([]);
  const [scrolledToBottom] = useState(true);
  const [message, setMessage] = useState('');
  const messagesEl = useRef(null);

  const { ws, ready, fallback } = useContext(WSContext);
  const {
    event: { hashedTeamId },
  } = useContext(EventContext);

  // If already scrolled to bottom - pin scroll to bottom when new messages added
  useEffect(() => {
    if (scrolledToBottom && messagesEl.current) {
      const { scrollHeight, clientHeight } = messagesEl.current;
      messagesEl.current.scrollTop = scrollHeight - clientHeight;
    }
  }, [messages, scrolledToBottom]);

  useEffect(() => {
    const handleChatMessage = e => {
      const { type, body } = JSON.parse(e.data);

      if (type === 'chat-message') {
        setMessages(existingMessages =>
          [...existingMessages, body].slice(-MAX_MESSAGES)
        );
      }
    };

    if (ready) {
      ws.addEventListener('message', handleChatMessage);
    }

    return () => {
      if (ws) {
        ws.removeEventListener('message', handleChatMessage);
      }
    };
  }, [ready, ws]);

  const handleSubmit = e => {
    e.preventDefault();
    const mes = message.trim();

    // If there is a message to send
    if (mes) {
      // Send message
      ws.send(
        JSON.stringify({
          action: 'onMessage',
          data: {
            teamId: hashedTeamId,
            id: `chat-${new Date().getTime()}`,
            timestamp: Math.floor(Date.now() / 1000),
            displayName,
            content: message,
          },
        })
      );
    }

    // Clear input
    setMessage('');
  };

  return (
    <Fragment>
      <div
        className={`messages ${fallback ? 'fallback' : ''}`}
        ref={messagesEl}
      >
        {fallback ? (
          <p className="core-text">Currently unavailable</p>
        ) : (
          <Fragment>
            {messages.map(m => (
              <div className="message" key={m.id}>
                <span className="time">
                  {format(new Date(m.timestamp * 1000), 'HH:mm')}
                </span>{' '}
                <span
                  className={
                    m.displayName === displayName ? 'name-you' : 'name'
                  }
                >
                  {m.displayName === displayName ? 'You' : m.displayName}
                </span>{' '}
                <span className="content">{m.content}</span>
              </div>
            ))}
            {!messages.length && <p className="core-text">No messages yet</p>}
          </Fragment>
        )}
      </div>

      {!fallback && (
        <form className="core-form message-form" onSubmit={handleSubmit}>
          <input
            id="standard-text-input"
            className="input-text input-text--shallow"
            type="text"
            name="standard-text-input"
            autoComplete="off"
            value={message}
            onChange={({ target }) => setMessage(target.value)}
            placeholder="Enter message..."
            aria-label="Enter message"
            maxLength={1000}
          />

          <input type="submit" value=">" title="Send message" />
        </form>
      )}
    </Fragment>
  );
}

Chat.propTypes = {
  displayName: PropTypes.string,
};

export default Chat;

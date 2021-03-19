import { useEffect, useContext } from 'react';
import { WSContext } from '../../common/WSContext';
import { ScoreCardContext } from './ScoreCardContext';

export default () => {
  const { scoreCardDispatch } = useContext(ScoreCardContext);

  const { ws, ready } = useContext(WSContext);

  // Listen for webscoket messages if ready
  useEffect(() => {
    const handleScoreCardInfoMessage = e => {
      const { type, body } = JSON.parse(e.data);

      // Check for challenges scored update
      if (type === 'event-update' && body.type === 'challengeScoredCount') {
        scoreCardDispatch({
          type: 'UPDATE_CHALLENGES',
          payload: body.event.challengeScoredCount,
        });
      }

      // Check for badges awarded update
      if (type === 'event-update' && body.type === 'badgeAwardedToSomeone') {
        scoreCardDispatch({
          type: 'UPDATE_BADGES',
          payload: body.count,
        });
      }
    };

    if (ready) {
      ws.addEventListener('message', handleScoreCardInfoMessage);
    }

    return () => {
      if (ws) {
        ws.removeEventListener('message', handleScoreCardInfoMessage);
      }
    };
  }, [ready, scoreCardDispatch, ws]);
};

import { useContext, useEffect } from 'react';
import queryString from 'query-string';
import { useLocation } from '@reach/router';
import jsonRequest from '../../common/jsonRequest';
import { LobbyContext } from '../Lobby/LobbyContext';

const getPlayers = async ({ getPlayersLink, lobbyDispatch, filters = {} }) => {
  try {
    lobbyDispatch({ type: 'PLAYERS_LOADING' });

    let query = '';
    if (Object.keys(filters).length !== 0) {
      query = queryString.stringify(filters);
    }

    const response = await jsonRequest(
      getPlayersLink + (query ? `?${query}` : '')
    );
    const payload = await response.json();

    if (typeof payload.players === 'undefined') {
      lobbyDispatch({ type: 'PLAYERS_ERROR' });
      return;
    }

    lobbyDispatch({ type: 'PLAYERS_FETCH_SUCCESS', payload });
  } catch (error) {
    lobbyDispatch({ type: 'PLAYERS_ERROR' });
  }
};

export default () => {
  const {
    lobby: {
      links: { getPlayers: getPlayersLink },
    },
    lobbyDispatch,
  } = useContext(LobbyContext);

  const location = useLocation();

  useEffect(() => {
    getPlayers({
      getPlayersLink,
      lobbyDispatch,
      filters: queryString.parse(location.search),
    });
  }, [getPlayersLink, lobbyDispatch, location.search]);
};

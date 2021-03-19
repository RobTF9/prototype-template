import { useContext, useEffect } from 'react';
import queryString from 'query-string';
import { useLocation } from '@reach/router';
import jsonRequest from '../../common/jsonRequest';
import { LobbyContext } from '../Lobby/LobbyContext';

const getTeams = async ({ getTeamsLink, lobbyDispatch, filters = {} }) => {
  try {
    lobbyDispatch({ type: 'TEAMS_LOADING' });

    let query = '';
    if (Object.keys(filters).length !== 0) {
      query = queryString.stringify(filters);
    }

    const response = await jsonRequest(
      getTeamsLink + (query ? `?${query}` : '')
    );
    const payload = await response.json();

    if (typeof payload.teams === 'undefined') {
      lobbyDispatch({ type: 'TEAMS_ERROR' });
      return;
    }

    lobbyDispatch({ type: 'TEAMS_FETCH_SUCCESS', payload });
  } catch (error) {
    lobbyDispatch({ type: 'TEAMS_ERROR' });
  }
};

export default () => {
  const {
    lobby: {
      links: { getTeams: getTeamsLink },
    },
    lobbyDispatch,
  } = useContext(LobbyContext);

  const location = useLocation();

  useEffect(() => {
    getTeams({
      getTeamsLink,
      lobbyDispatch,
      filters: queryString.parse(location.search),
    });
  }, [getTeamsLink, lobbyDispatch, location.search]);
};

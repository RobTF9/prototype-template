import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { navigate, useLocation } from '@reach/router';
import queryString from 'query-string';
import { LobbyContext } from '../Lobby/LobbyContext';
import { EventContext } from '../../common/EventContext';
import usePlayersData from './usePlayersData';
import Card from '../Card';
import Signal from '../Signal';
import { Wrapper, PlayerCards, Filter, NoPlayers } from './styles';

const Players = ({ displayName }) => {
  const { search } = useLocation();
  usePlayersData();

  const currentSearch = queryString.parse(search).team;

  const {
    event: { id },
  } = useContext(EventContext);

  const {
    lobby: { players },
    lobbyDispatch,
  } = useContext(LobbyContext);
  const { data, loading, error } = players;

  const handleClear = e => {
    e.preventDefault();
    lobbyDispatch({ type: 'PLAYERS_LOADING' });
    navigate(`/event/${id}/players`);
  };

  return (
    <Wrapper>
      {error && (
        <Signal
          {...{
            reasons: [
              'An unexpected error occurred getting this page. Please try again',
            ],
            center: true,
            severity: 'danger',
            shallow: true,
          }}
        />
      )}
      {currentSearch && (
        <Filter className="core-text">
          Showing players in '{currentSearch}'{' '}
          <a
            href={`/event/${id}/players`}
            className="core-link"
            onClick={e => handleClear(e)}
          >
            Clear
          </a>
        </Filter>
      )}
      <PlayerCards>
        {loading
          ? Array.from(Array(50)).map((_, index) => (
              <Card
                {...{
                  border: 'greydarkest',
                  loading,
                  key: index,
                }}
              />
            ))
          : data.map(player => (
              <Card
                {...{
                  border:
                    displayName === player.display_name
                      ? 'blueprime'
                      : 'greydarkest',
                  header: {
                    title:
                      displayName === player.display_name ? (
                        <>
                          <span className="you">You:</span>{' '}
                          {player.display_name}
                        </>
                      ) : (
                        player.display_name
                      ),
                    subTitle: player.team_name,
                  },
                  link: { text: 'Profile', href: player.profile_url },
                  key: player.id,
                }}
              />
            ))}
      </PlayerCards>
      {!loading && currentSearch && data.length === 0 && (
        <NoPlayers>
          <p className="core-text">
            There are no players in {currentSearch} yet
          </p>
        </NoPlayers>
      )}
    </Wrapper>
  );
};

Players.propTypes = {
  displayName: PropTypes.string,
};

export default Players;

import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { navigate } from '@reach/router';
import { EventContext } from '../../common/EventContext';
import { LobbyContext } from '../Lobby/LobbyContext';
import { Wrapper, Header, AccessCode, NumberOfPlayers } from './styles';

const Team = ({
  id: teamId,
  id_hash: idHash,
  name,
  players,
  membershipTeam,
  permissions,
}) => {
  const yourTeam = membershipTeam.id_hash === idHash;
  const { can_edit: canEdit, can_join: canJoin } = permissions;

  const {
    event: { id, isInviteOnly },
  } = useContext(EventContext);

  const { lobbyDispatch } = useContext(LobbyContext);

  const action = () => {
    if (canEdit) {
      return (
        <a
          href={`/event/${id}/team/${teamId}/edit`}
          className="core-link core-link--positive"
          title="Edit team"
        >
          Edit Team
        </a>
      );
    }

    if (canJoin) {
      return (
        <a
          href={`/event/${id}/team/${teamId}/join`}
          className="core-link core-link--positive"
          title="Join team"
        >
          Join Team
        </a>
      );
    }

    return null;
  };

  const showPlayersLink = `/event/${id}/players?${queryString.stringify({
    team: name,
    exact: 1,
  })}`;

  const handleShowPlayers = e => {
    e.preventDefault();
    lobbyDispatch({ type: 'PLAYERS_LOADING' });
    navigate(showPlayersLink);
  };

  return (
    <Wrapper>
      <Header>
        <h4 className="core-heading core-heading--quaternary">
          {yourTeam ? <span className="your-team">Your team: </span> : ''}
          {name}
        </h4>
        <div>
          {action()}
          <a
            href={showPlayersLink}
            className="core-link"
            onClick={e => handleShowPlayers(e)}
          >
            Show Players
          </a>
        </div>
      </Header>
      {yourTeam && membershipTeam.accessCode && !isInviteOnly && (
        <AccessCode {...{ className: 'core-text core-text--secondary' }}>
          The access code for others to join your team is:{' '}
          <span>{membershipTeam.accessCode}</span>
        </AccessCode>
      )}
      <NumberOfPlayers {...{ className: 'core-text core-text--secondary' }}>
        {players.length} player{players.length === 1 ? '' : 's'}
      </NumberOfPlayers>
    </Wrapper>
  );
};

Team.propTypes = {
  id: PropTypes.string,
  id_hash: PropTypes.string,
  name: PropTypes.string,
  players: PropTypes.array,
  membershipTeam: PropTypes.object,
  permissions: PropTypes.object,
};

export default Team;

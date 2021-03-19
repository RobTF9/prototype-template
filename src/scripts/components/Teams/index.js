/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { navigate, useLocation } from '@reach/router';
import queryString from 'query-string';
import { LobbyContext } from '../Lobby/LobbyContext';
import { EventContext } from '../../common/EventContext';
import useTeamsData from './useTeamsData';
import Team from '../Team';
import Signal from '../Signal';
import {
  Wrapper,
  FirstWrapper,
  TeamsWrapper,
  NoTeam,
  LoadingTeam,
  SearchForm,
  ErrorWrapper,
  Filter,
  NoTeams,
} from './styles';

const Teams = ({ displayName }) => {
  const [term, setTerm] = useState('');
  const { search } = useLocation();
  useTeamsData();

  const currentSearch = queryString.parse(search).team;

  const {
    event: { id },
  } = useContext(EventContext);

  const {
    lobby: { membershipTeam, teams, links, canCreateTeam },
    lobbyDispatch,
  } = useContext(LobbyContext);

  const { data, loading, error } = teams;

  if (!membershipTeam.id && data.length === 0 && !loading && !currentSearch) {
    return (
      <Wrapper>
        <FirstWrapper>
          <h2 className="core-heading core-heading--secondary">Welcome</h2>
          <p className="core-text core-text--secondary">
            You’re the first one here, no teams have been created yet. To add a
            new team to this event, click the button below. A team access code
            for you to share with others will be automatically generated.
          </p>
          <a href={links.addTeam} className="core-button">
            Add team
          </a>
        </FirstWrapper>
      </Wrapper>
    );
  }

  const handleSubmit = e => {
    e.preventDefault();
    const filters = { team: term };
    navigate(`?${queryString.stringify(filters)}`);
    setTerm('');
  };

  const handleClear = e => {
    e.preventDefault();
    lobbyDispatch({ type: 'TEAMS_LOADING' });
    navigate(`/event/${id}`);
  };

  return (
    <TeamsWrapper>
      {!loading && !membershipTeam.id && (
        <NoTeam>
          <p className="core-text">
            Hi <span>{displayName}</span>, you're not on a team yet.{' '}
            {canCreateTeam
              ? 'Create a team or join an existing one to get started.'
              : 'Join a team to get started'}
          </p>
          {canCreateTeam && (
            <a
              href={links.addTeam}
              className="core-button"
              title="Create new team"
            >
              Create new team
            </a>
          )}
          <SearchForm className="core-form" onSubmit={handleSubmit}>
            <label htmlFor="term" className="label">
              Search for a team
            </label>
            <div>
              <input
                type="text"
                className="input-text input-text--shallow"
                name="term"
                id="term"
                value={term}
                onChange={({ target: { value } }) => setTerm(value)}
              />
              <button
                type="submit"
                className="core-button core-button--quiet-emphasis"
              >
                Search
              </button>
            </div>
          </SearchForm>
          {currentSearch && (
            <Filter className="core-text">
              Showing results for '{currentSearch}'{' '}
              <a
                href={`/event/${id}`}
                className="core-link"
                onClick={e => handleClear(e)}
              >
                Clear search
              </a>
            </Filter>
          )}
        </NoTeam>
      )}
      {error && (
        <ErrorWrapper>
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
        </ErrorWrapper>
      )}
      {loading
        ? Array.from(Array(20)).map((_, index) => (
            <LoadingTeam {...{ key: index }}>
              <div></div>
            </LoadingTeam>
          ))
        : data.map(t => (
            <Team
              {...{
                ...t,
                key: t.id,
                displayName,
                membershipTeam,
              }}
            />
          ))}
      {!loading && currentSearch && data.length === 0 && (
        <NoTeams>
          <p className="core-text">No teams found matching '{currentSearch}'</p>
        </NoTeams>
      )}
    </TeamsWrapper>
  );
};

Teams.propTypes = {
  displayName: PropTypes.string,
};

export default Teams;

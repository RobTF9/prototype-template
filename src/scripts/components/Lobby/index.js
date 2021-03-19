import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { Router, navigate } from '@reach/router';
import { EventContext } from '../../common/EventContext';
import { eventMembershipMode, eventStatus } from '../../common/enums';
import Header from '../Header';
import { Heading } from '../Header/styles';
import UpcomingEventDates from '../HeaderSections/UpcomingEventDates';
import UpcomingEventCountdown from '../HeaderSections/UpcomingEventCountdown';
import Nav from '../Nav';
import Column from '../Column';
import ContentWrapper from '../ContentWrapper';
import CodeOfConduct from '../Columns/CodeOfConduct';
import Files from '../Columns/Files';
import Players from '../Players';
import Teams from '../Teams';
import { Wrapper, Main, Content } from '../styles/ContentWrapperContentStyles';
import Pagination from '../Pagination';
import { LobbyContext } from './LobbyContext';
import useEventInfoData from './useEventInfoData';
import { ChallengesContext } from '../../common/ChallengesContext';

const Lobby = ({ displayName, links, config, setEventPage }) => {
  const {
    event: {
      id,
      name,
      start,
      end,
      isTeamEvent,
      codeOfConduct,
      files,
      membershipMode,
      status,
    },
  } = useContext(EventContext);

  const {
    lobby: { teams, players },
    lobbyDispatch,
  } = useContext(LobbyContext);

  const { challengesDispatch } = useContext(ChallengesContext);

  const initialColumns = [{ title: 'Code of conduct', open: true }];
  if (Object.keys(files).length) {
    initialColumns.push({ title: 'Files', open: true });
  }
  const [columns, setColumns] = useState(initialColumns);
  const [page, setPage] = useState(0);
  const [waiting, setWaiting] = useState(start < new Date());
  const [headerSubText, setHeaderSubText] = useState(
    waiting
      ? 'Waiting for your instructor to begin the event.'
      : 'You are registered for this event. It has not started yet.'
  );

  const onCountdownEnd = () => {
    if (
      membershipMode === eventMembershipMode.LIMITED &&
      status !== eventStatus.READY
    ) {
      challengesDispatch({ type: 'REFRESH_CHALLENGES' });
      setEventPage('LIVE');
    }

    setWaiting(true);
    setHeaderSubText('Waiting for your instructor to begin the event.');
  };

  // Update CoC and files via polling
  useEventInfoData();

  const routes = [
    { title: 'Players', to: `/event/${id}${isTeamEvent ? '/players' : ''}` },
  ];
  if (isTeamEvent) {
    routes.unshift({ title: 'Teams', to: `/event/${id}` });
  }

  const updatePage = async (pageNo, location) => {
    const filters = queryString.parse(location.search);
    filters.page = pageNo;

    navigate(`?${queryString.stringify(filters)}`);
  };

  const changeTab = ({ e, to }) => {
    e.preventDefault();

    if (!isTeamEvent) {
      navigate(to);
      return;
    }

    // Move to players loading state if not already on players
    if (
      to.endsWith('/players') &&
      !window.location.pathname.endsWith('/players')
    ) {
      lobbyDispatch({ type: 'PLAYERS_LOADING' });
    }

    // Move to teams loading state if not already on teams
    if (!window.location.pathname.endsWith(id)) {
      lobbyDispatch({ type: 'TEAMS_LOADING' });
    }

    // Go to new tab
    navigate(to);
  };

  return (
    <Wrapper>
      <Header
        {...{
          title: (
            <Heading className="core-heading" {...{ breakpoint: 960 }}>
              {name}
            </Heading>
          ),
          subText: {
            text: headerSubText,
            color: 'yellowprime',
          },
          breakpoint: 960,
        }}
      >
        <UpcomingEventDates {...{ start, end, waiting }} />
        <UpcomingEventCountdown
          {...{ end: start, onEnd: onCountdownEnd, fixedEnd: true }}
        />
      </Header>
      <Main
        {...{
          columns: columns.length,
          initial: { x: 0 },
          animate: { x: `-${page * 100}vw` },
          transition: {
            type: 'spring',
            damping: 300,
            stiffness: 550,
          },
        }}
      >
        <Content {...{ columns: columns.length }}>
          <Router>
            <ContentWrapper
              {...{
                routes,
                center: (
                  <Router primary={false}>
                    {isTeamEvent && (
                      <Pagination
                        {...{
                          ...teams.pagination,
                          updatePage,
                          path: '/event/:eventId',
                        }}
                      />
                    )}
                    <Pagination
                      {...{
                        ...players.pagination,
                        updatePage,
                        path: `event/:eventId${isTeamEvent ? '/players' : ''}`,
                      }}
                    />
                  </Router>
                ),
                columns,
                setColumns,
                changeTab,
                path: `/event/:eventId`,
              }}
            >
              {isTeamEvent && (
                <Teams
                  {...{
                    displayName,
                    path: '/',
                  }}
                />
              )}
              <Players
                {...{
                  displayName,
                  path: `${isTeamEvent ? '/players' : '/'}`,
                }}
              />
            </ContentWrapper>
          </Router>
        </Content>
        {columns.map((column, index) => (
          <Column
            {...{
              ...column,
              columns: columns.length,
              setColumns,
              index,
              key: column.title + index,
            }}
          >
            {index === 0 && <CodeOfConduct {...{ markdown: codeOfConduct }} />}
            {index === 1 && <Files {...{ files }} />}
          </Column>
        ))}
      </Main>
      <Nav {...{ displayName, links, config }}>
        <button
          type="button"
          className={`core-link ${
            page === 0 ? 'core-link--selected' : 'core-link--flying'
          }`}
          onClick={() => setPage(0)}
        >
          Players
        </button>
        {columns.map((column, index) => (
          <button
            type="button"
            className={`core-link ${
              page === index + 1 ? 'core-link--selected' : 'core-link--flying'
            }`}
            onClick={() => setPage(index + 1)}
            key={column.title + index}
          >
            {column.title}
          </button>
        ))}
      </Nav>
    </Wrapper>
  );
};

Lobby.propTypes = {
  displayName: PropTypes.string,
  links: PropTypes.object,
  config: PropTypes.object,
  setEventPage: PropTypes.func,
};

export default Lobby;

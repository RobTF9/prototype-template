import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { navigate, Router } from '@reach/router';
import { WSContext } from '../../common/WSContext';
import { EventContext } from '../../common/EventContext';
import { LeaderboardContext } from '../../common/LeaderboardContext';
import { eventMembershipMode } from '../../common/enums';
import { ScoreCardContext } from './ScoreCardContext';
import Header from '../Header';
import { Heading } from '../Header/styles';
import Stats from '../HeaderSections/Stats';
import Position from '../HeaderSections/Position';
import Column from '../Column';
import Leaderboard from '../Columns/Leaderboard';
import ContentWrapper from '../ContentWrapper';
import Nav from '../Nav';
import Overview from './Overview';
import { Wrapper, Main, Content } from '../styles/ContentWrapperContentStyles';

const ScoreCard = ({ displayName, links, config }) => {
  const {
    event: { id, name, numberOfPlayers, isTeamEvent, membershipMode },
  } = useContext(EventContext);

  const { fallback } = useContext(WSContext);
  const {
    leaderboardDispatch,
    leaderboard: { player, team },
  } = useContext(LeaderboardContext);

  const {
    scoreCard: { badges, challenges: totalChallenges },
  } = useContext(ScoreCardContext);

  const [columns, setColumns] = useState(
    membershipMode !== eventMembershipMode.LIMITED
      ? [{ title: 'Leaderboard ', open: true }]
      : []
  );
  const [page, setPage] = useState(0);

  // Make sure we are on the base route on mount
  useEffect(() => {
    navigate(`/event/${id}`);
  }, [id]);

  useEffect(() => {
    if (fallback || isTeamEvent) {
      leaderboardDispatch({ type: 'FINAL_REFRESH_START' });
    }
  }, [fallback, isTeamEvent, leaderboardDispatch]);

  let you = { position: null, percent: null, points: null };
  if (team && team.name) {
    you = team;
  }
  if (player && player.id) {
    you = player;
  }

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
            text: 'You participated in this event. It is now closed',
            color: 'redprime',
          },
          breakpoint: 960,
        }}
      >
        {((totalChallenges !== null && badges !== null) || !fallback) &&
        membershipMode !== eventMembershipMode.LIMITED ? (
          <Stats
            {...{
              headers: ['Total players', 'Challenges scored', 'Badges awarded'],
              data: [numberOfPlayers, totalChallenges, badges],
              hideMobile: true,
            }}
          />
        ) : null}
        <Position
          {...{
            position: you.position,
            percentComplete: you.percent,
            points: you.points,
            showPosition: membershipMode !== eventMembershipMode.LIMITED,
            fullWidthMobile: true,
          }}
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
                title: 'Overview',
                columns,
                setColumns,
                path: '/event/:eventId',
              }}
            >
              <Overview {...{ displayName, breakpoint: 960, path: '/' }} />
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
            {index === 0 && <Leaderboard {...{ displayName }} />}
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
          Overview
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

ScoreCard.propTypes = {
  displayName: PropTypes.string,
  links: PropTypes.object,
  config: PropTypes.object,
};

export default ScoreCard;

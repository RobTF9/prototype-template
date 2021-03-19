import React, { useContext, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { EventContext } from '../../common/EventContext';
import { WSContext } from '../../common/WSContext';
import { Wrapper, Main } from '../styles/ContentWrapperContentStyles';
import EventRouter from './EventRouter';
import Header from '../Header';
import { Heading } from '../Header/styles';
import EventTimer from '../HeaderSections/EventTimer';
import Nav from '../Nav';
import Sidebar from '../Sidebar';
import Progress from '../Icons/Progress';
import Book from '../Icons/Book';
import List from '../Icons/List';
import Flag from '../Icons/Flag';
import Position from '../HeaderSections/Position';
import { EventRouterWrapper, OpacityToggle } from './styles';
import { eventMembershipMode, eventStatus } from '../../common/enums';
import { LeaderboardContext } from '../../common/LeaderboardContext';

const LiveEvent = ({
  displayName,
  jwt,
  setEventPage,
  updatesComponent,
  links,
  config,
}) => {
  const [lastChallengeVisited, setLastChallengeVisited] = useState(null);
  const challengeRefs = useRef([]);

  const {
    event: {
      id,
      name,
      start,
      end,
      isScored,
      status,
      isTeamEvent,
      membershipMode,
    },
  } = useContext(EventContext);

  const {
    leaderboard: { player, team },
  } = useContext(LeaderboardContext);

  const { fallback } = useContext(WSContext);

  let you = { position: null, percent: null, points: null };
  if (team && team.name) {
    you = team;
  }
  if (player && player.id) {
    you = player;
  }

  const [sidebarActive, setSidebarActive] = useState(
    !(window.innerWidth <= 600)
  );

  const sidebarLinks = [
    { to: `/event/${id}`, text: 'Challenges', icon: <Flag /> },
    {
      to: `/event/${id}/info`,
      text: 'Code of conduct',
      icon: <Book />,
    },
  ];

  // Add the leaderboard link if it's not a limited participation event
  if (membershipMode !== eventMembershipMode.LIMITED) {
    sidebarLinks.splice(1, 0, {
      to: `/event/${id}/leaderboard`,
      text: 'Leaderboard',
      icon: <List />,
    });
  }

  return (
    <Wrapper>
      <Header
        {...{
          title: (
            <Heading className="core-heading core-heading--quaternary">
              {name}
            </Heading>
          ),
        }}
      >
        <EventTimer
          {...{
            fullWidthMobile: true,
            start,
            end,
            paused: status === eventStatus.PAUSED,
            onEnd: () => {
              setEventPage('SCORECARD');
            },
          }}
        />
      </Header>
      <Main>
        <Sidebar
          {...{
            sidebarActive,
            setSidebarActive,
            nonActiveHeaderChild: <Progress />,
            activeHeaderChild: you && (
              <Position
                {...{
                  position: you.position,
                  percentComplete: you.percent,
                  points: you.points,
                  showPosition:
                    membershipMode !== eventMembershipMode.LIMITED &&
                    (isTeamEvent ||
                      fallback ||
                      (you.position && you.position <= 10)),
                }}
              />
            ),
            links: sidebarLinks,
          }}
        >
          {isScored && (
            <>
              <h2 className="core-heading core-heading--quinary">Updates</h2>
              {updatesComponent}
            </>
          )}
        </Sidebar>
        <EventRouterWrapper {...{ sidebarActive }}>
          <OpacityToggle
            {...{ onClick: () => setSidebarActive(false), sidebarActive }}
          />
          <EventRouter
            {...{
              challengeRefs,
              lastChallengeVisited,
              setLastChallengeVisited,
              jwt,
            }}
          />
        </EventRouterWrapper>
      </Main>
      <Nav {...{ displayName, links, config }} />
    </Wrapper>
  );
};

LiveEvent.propTypes = {
  displayName: PropTypes.string,
  jwt: PropTypes.string,
  setEventPage: PropTypes.func,
  updatesComponent: PropTypes.object,
  config: PropTypes.object,
  links: PropTypes.object,
};

export default LiveEvent;

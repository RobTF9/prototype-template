/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import { useLocation } from '@reach/router';
import { useIsFetching } from 'react-query';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { participationMode } from '../../common/enums';

const variants = {
  visible: { opacity: 1 },
  invisible: { opacity: 0 },
};

const Wrapper = styled(motion.div)`
  left: 50%;
  position: absolute;
  top: 20px;
`;

const Spinner = styled.img`
  height: 20px;
  width: 20px;
`;

function FetchingIndicator({ participation_mode, id }) {
  const location = useLocation();
  const fetchingTeams = useIsFetching('teams');
  const fetchingPlayers = useIsFetching('players');
  const fetchingChallenges = useIsFetching('challenges');
  let fetching = false;

  // Fetching players
  if (
    fetchingPlayers &&
    ((participation_mode === participationMode.INDIVIDUAL &&
      location.pathname.endsWith(`${id}/manage`)) ||
      (participation_mode === participationMode.TEAM &&
        location.pathname.endsWith('players')))
  ) {
    fetching = true;
  }

  // Fetching teams
  if (
    fetchingTeams &&
    participation_mode === participationMode.TEAM &&
    location.pathname.endsWith(`${id}/manage`)
  ) {
    fetching = true;
  }

  // Fetching challenges
  if (fetchingChallenges && location.pathname.endsWith('challenges')) {
    fetching = true;
  }

  return (
    <Wrapper
      {...{
        animate: fetching ? 'visible' : 'invisible',
        variants,
      }}
    >
      <Spinner src="/assets/images/spinner.svg" alt="Loading Spinner" />
    </Wrapper>
  );
}

FetchingIndicator.propTypes = {
  participation_mode: PropTypes.number,
  id: PropTypes.string,
};

export default FetchingIndicator;

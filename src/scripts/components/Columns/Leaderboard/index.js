import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { EventContext } from '../../../common/EventContext';
import { LeaderboardContext } from '../../../common/LeaderboardContext';
import Leader from './Leader';
import { LeaderboardLink, TopTenHeader } from './styles';
import Loading from './Loading';

const Leaderboard = ({ displayName }) => {
  const {
    event: { id, leaderboardCode },
  } = useContext(EventContext);

  const {
    leaderboard: { error, loading, data },
  } = useContext(LeaderboardContext);

  if (!data.length && error) {
    return (
      <p className="core-text">
        There was an error fetching the leaderboard. Please try again.
      </p>
    );
  }

  return (
    <>
      <LeaderboardLink
        href={`https://leaderboard.tomahawque.com/${id}/${leaderboardCode}`}
        className="core-link"
      >
        View full Leaderboard
      </LeaderboardLink>
      <TopTenHeader className="core-heading core-heading--senary">
        Top ten
      </TopTenHeader>
      {loading ? (
        <Loading />
      ) : (
        data.map(leader => (
          <Leader {...leader} key={leader.id} displayName={displayName} />
        ))
      )}
    </>
  );
};

Leaderboard.propTypes = {
  leaderboardCode: PropTypes.string,
  displayName: PropTypes.string,
};

export default Leaderboard;

import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import Packages from './Packages';
import Instructors from './Instructors';
import EventDates from './EventDates';
import Timezone from './Timezone';
import StartAutomatically from './StartAutomatically';
import ParticipationMode from './ParticipationMode';
import MaxPlayers from './MaxPlayers';
import MaxTeams from './MaxTeams';
import MaxPlayersPerTeam from './MaxPlayersPerTeam';
import AllowJoinAfterStart from './AllowJoinAfterStart';
import PublicLeaderboard from './PublicLeaderboard';
import { participationMode } from '../../../common/enums';
import InviteCode from './InviteCode';
import AVUpdates from './AVUpdates';
import CodeOfConduct from './CodeofConduct';

function Information({
  instructors,
  packages,
  event,
  timezonesGroupedByOffset,
}) {
  return (
    <div className="core-form">
      <div className="field">
        <Packages {...{ originalData: event.packages[0].name, packages }} />
      </div>
      <div className="field">
        <Instructors
          {...{ originalData: event.instructors[0].display_name, instructors }}
        />
      </div>
      <div className="field">
        <EventDates {...{ startsAt: event.starts_at, endsAt: event.ends_at }} />
      </div>
      <div className="field">
        <Timezone {...{ event, timezonesGroupedByOffset }} />
      </div>
      <div className="field">
        <StartAutomatically {...{ originalData: event.status_update_mode }} />
      </div>
      <div className="field">
        <ParticipationMode
          {...{
            participation_mode: event.participation_mode,
            membership_mode: event.membership_mode,
          }}
        />
      </div>
      <div className="field">
        <MaxPlayers {...{ originalData: event.max_player_count }} />
      </div>
      <motion.div
        {...{
          initial: 'hidden',
          animate:
            event.participation_mode === participationMode.TEAM
              ? 'visible'
              : 'hidden',
          variants: {
            visible: { opacity: 1, height: 'auto' },
            hidden: { opacity: 0, height: 0 },
          },
          transition: {
            type: 'spring',
            damping: 300,
            stiffness: 550,
          },
        }}
      >
        <div className="field">
          <MaxTeams {...{ originalData: event.max_team_count }} />
        </div>
        <div className="field">
          <MaxPlayersPerTeam
            {...{ originalData: event.max_player_count_per_team }}
          />
        </div>
      </motion.div>
      <div className="field">
        <AllowJoinAfterStart
          {...{ originalData: event.allow_players_to_join_after_start }}
        />
      </div>
      <div className="field">
        <PublicLeaderboard {...{ originalData: event.is_public }} />
      </div>
      <div className="field">
        <InviteCode {...{ originalData: event.code_mode, code: event.code }} />
      </div>
      <div className="field">
        <AVUpdates {...{ originalData: event.scoring_events_enabled }} />
      </div>
      <div className="field">
        <CodeOfConduct {...{ originalData: event.code_of_conduct }} />
      </div>
    </div>
  );
}

Information.propTypes = {
  instructors: PropTypes.array,
  packages: PropTypes.array,
  event: PropTypes.object,
  timezonesGroupedByOffset: PropTypes.array,
};

export default Information;

import { useEffect, useRef, useContext, useState } from 'react';
import { navigate } from '@reach/router';
import parseMarkdown from '../../common/parseMarkdown';
import slowPolling from '../../common/slowPolling';
import jsonRequest from '../../common/jsonRequest';
import getRefreshTime from '../../common/getRefreshTime';
import { EventContext } from '../../common/EventContext';
import { ChallengesContext } from '../../common/ChallengesContext';
import submissionStates from './submissionStates';

export default ({
  url,
  challengeId,
  setSubmissionState,
  hashedUserId,
  hashedTeamId,
  jwt,
}) => {
  const backup = useRef(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {
    event: {
      id,
      numberOfPlayers,
      scoreMode,
      isTeamEvent,
      liveEventApiEndpoint,
    },
  } = useContext(EventContext);
  const { challengesDispatch } = useContext(ChallengesContext);

  const refreshConfig = useRef([
    { min: 1, max: 1000, time: 30000 },
    { min: 1001, max: 2500, time: 60000 },
    { min: 2501, max: 5000, time: 120000 },
    { min: 5001, max: 10000, time: 300000 },
    { min: 10001, max: Number.MAX_SAFE_INTEGER, time: 600000 },
  ]);
  const refreshTime = useRef(
    getRefreshTime(numberOfPlayers, refreshConfig.current)
  );

  useEffect(() => {
    let isSubscribed = true;
    let timeout = null;
    let t1;
    let t2;

    const getBriefing = async () => {
      setLoading(true);
      const fileToDatum = file => ({
        text: file.fileName,
        id: file.id,
        links: [
          {
            text: 'Download',
            href: file.link,
            type: file.downloaded ? 'quiet-emphasis' : '',
          },
        ],
      });

      const backupUrl = url;
      const requestUrl = liveEventApiEndpoint
        ? `${liveEventApiEndpoint}/api/event/${id}/challenge/${challengeId}?token=${jwt}`
        : backupUrl;

      try {
        t1 = performance.now();
        const response = await jsonRequest(
          backup.current ? backupUrl : requestUrl
        );

        if (response.status !== 200 && !backup.current) {
          backup.current = true;
          getBriefing();
          return;
        }

        const briefing = await response.json();
        t2 = performance.now();

        // Files
        const challengeFiles = [];
        const eventFiles = [];
        briefing.files.forEach(file => {
          if (file.eventFile) {
            eventFiles.push(fileToDatum(file));
            return;
          }

          challengeFiles.push(fileToDatum(file));
        });
        const groups = [
          { title: 'Challenge Files', data: challengeFiles },
          { title: 'Event Files', data: eventFiles },
        ];

        if (isSubscribed) {
          setData(currentData => ({
            ...briefing,
            details: parseMarkdown(briefing.details),
            files: groups,
            hints: {
              ...briefing.hints,
              viewedHints: briefing.hints.viewedHints.map((hint, index) => {
                const currentHint = currentData
                  ? currentData.hints.viewedHints[index]
                  : { show: true };

                return {
                  ...currentHint,
                  ...hint,
                  content: parseMarkdown(hint.content),
                };
              }),
            },
            penalty: briefing.hints.viewedHints.length * briefing.hints.penalty,
            groupIntro: briefing.groupIntro
              ? parseMarkdown(briefing.groupIntro)
              : '',
          }));
          setLoading(false);
          setError(null);
        }

        if (briefing.groupLocked) {
          navigate(`/event/${id}`);
          return;
        }

        if (briefing.challengeLocked) {
          challengesDispatch({
            type: 'LOCK_CHALLENGE',
            payload: challengeId,
          });
          navigate(`/event/${id}`);
          return;
        }

        if (briefing.challengeComplete) {
          challengesDispatch({
            type: 'CHALLENGE_COMPLETE',
            payload: {
              completed: [
                {
                  challenge_id: challengeId,
                  user_id: hashedUserId,
                  team_id: hashedTeamId,
                },
              ],
            },
          });
          setSubmissionState(submissionStates.ALREADY_COMPLETE);
        }

        if (
          !briefing.challengeComplete &&
          refreshTime.current &&
          isSubscribed
        ) {
          timeout = setTimeout(getBriefing, refreshTime.current);
        }
      } catch (error) {
        if (!backup.current) {
          backup.current = true;
          getBriefing();
          return;
        }

        if (isSubscribed) {
          setError(error);

          if (refreshTime.current) {
            timeout = setTimeout(getBriefing, refreshTime.current);
          }
        }
      }

      // If it took longer than a second, slow polling
      if (t1 && t2 && t2 - t1 > 1000) {
        refreshTime.current = slowPolling(
          refreshConfig.current,
          refreshTime.current
        );
      }
      setLoading(false);
    };

    getBriefing();

    return () => {
      clearTimeout(timeout);
      isSubscribed = false;
    };
  }, [
    challengeId,
    challengesDispatch,
    hashedTeamId,
    hashedUserId,
    id,
    isTeamEvent,
    jwt,
    liveEventApiEndpoint,
    scoreMode,
    setSubmissionState,
    url,
  ]);

  return { data, loading, error, setData };
};

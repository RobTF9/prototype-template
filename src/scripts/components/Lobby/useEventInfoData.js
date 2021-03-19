import { useEffect, useContext } from 'react';
import jsonRequest from '../../common/jsonRequest';
import { EventContext } from '../../common/EventContext';

export default () => {
  const REFRESH_TIME = 120000;

  const {
    dispatch,
    event: { id },
  } = useContext(EventContext);

  useEffect(() => {
    let isSubscribed = true;
    let timeout = null;

    const getEventInfo = async () => {
      if (isSubscribed) {
        try {
          const response = await jsonRequest(`/api/event/${id}/info`);
          const data = await response.json();

          dispatch({
            type: 'REFRESH_COC_AND_FILES',
            payload: { codeOfConduct: data.code_of_conduct, files: data.files },
          });
        } catch (error) {
          // TODO log error
        }
      }

      timeout = setTimeout(getEventInfo, REFRESH_TIME);
    };

    timeout = setTimeout(getEventInfo, REFRESH_TIME);

    return () => {
      isSubscribed = false;
      clearTimeout(timeout);
    };
  }, [dispatch, id]);
};

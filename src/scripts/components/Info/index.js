import React, { useState, useEffect, useContext } from 'react';
import jsonRequest from '../../common/jsonRequest';
import parseMarkdown from '../../common/parseMarkdown';
import DataList from '../DataList';
import Signal from '../Signal';
import { EventContext } from '../../common/EventContext';
import { InfoWrapper, Comp } from './styles';

const Info = () => {
  const REFRESH_TIME = 120000;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const {
    event: { id },
  } = useContext(EventContext);

  useEffect(() => {
    let isSubscribed = true;
    let timeout = null;

    const getInfo = async () => {
      try {
        const response = await jsonRequest(`/api/event/${id}/info`);
        if (response.status === 404) {
          throw new Error('Not found');
        }
        const info = await response.json();

        if (isSubscribed) {
          setData({
            ...info,
            code_of_conduct: parseMarkdown(info.code_of_conduct),
          });
          setLoading(false);
          setError(null);
        }

        timeout = setTimeout(getInfo, REFRESH_TIME);
      } catch (error) {
        if (isSubscribed) {
          setError(error);
          setLoading(false);
          timeout = setTimeout(getInfo, REFRESH_TIME);
        }
      }
    };

    getInfo();

    return () => {
      clearTimeout(timeout);
      isSubscribed = false;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="loading-wrapper">
        <img
          src="/assets/images/spinner.svg"
          alt="Loading Spinner"
          className="image"
        />
      </div>
    );
  }

  if (!loading && data) {
    return (
      <InfoWrapper>
        <header className="header">
          <h2 className="core-heading core-heading--quinary">
            Event info &amp; Code of Conduct
          </h2>
        </header>
        {/* eslint-disable-next-line react/no-danger */}
        <div dangerouslySetInnerHTML={{ __html: data.code_of_conduct }} />

        {!!data.files && !!Object.values(data.files).length && (
          <DataList
            {...{
              classes: 'layout layout--top-padding',
              title: 'Event files',
              headingLevel: 2,
              groups: [
                {
                  data: Object.values(data.files).map(file => ({
                    text: file.fileName,
                    id: file.id,
                    links: [
                      {
                        text: 'Download',
                        href: file.link,
                        type: file.downloaded ? 'quiet-emphasis' : '',
                      },
                    ],
                  })),
                },
              ],
            }}
          />
        )}
        <Comp />
      </InfoWrapper>
    );
  }

  if (error && !data) {
    return (
      <Signal
        {...{
          reasons: [
            'An unexpected error occurred getting the event information. Please try again',
          ],
          center: true,
          severity: 'danger',
          shallow: true,
        }}
      />
    );
  }
};

export default Info;

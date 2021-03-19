/* eslint-disable camelcase */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Router, navigate } from '@reach/router';
import { useQuery } from 'react-query';
import Nav from '../Nav';
import ContentWrapper from '../ContentWrapper';
import Column from '../Column';
import Teams from './Teams';
import Players from './Players';
import Challenges from './Challenges';
import { Wrapper, Main, Content } from '../styles/ContentWrapperContentStyles';
import ManageEventHeader from './ManageEventHeader';
import FetchingIndicator from './FetchingIndicator';
import Information from './Information';
import jsonRequest from '../../common/jsonRequest';
import { participationMode } from '../../common/enums';
import { usePermissionsDispatch } from '../../pages/newManageEvent/PermissionsContext';
import useWSEventUpdates from './useWSEventUpdates';
import Modal from '../Modal';
import AddPlayerModal from './AddPlayerModal';

export default function ManageEvent({
  organisation,
  event,
  challenges,
  players,
  stats,
  instructors,
  packages,
  displayName,
  config,
  links,
  wsEndpoint,
  jwt,
  timezonesGroupedByOffset,
}) {
  const { id: orgId } = organisation;
  const initialColumns = [{ title: 'Information', open: true }];
  const [columns, setColumns] = useState(initialColumns);
  const [page, setPage] = useState(0);
  const [addPlayerModalOpen, setAddPlayerModalOpen] = useState(false);
  const dispatch = usePermissionsDispatch();

  const noPackage = {
    id: '00000000-0000-0000-0000-000000000000',
    name: 'No package selected',
    selected: !packages.some(pack => pack.selected),
  };

  const availablePackages = [...packages, noPackage];

  const initialData = {
    ...event,
    instructors: instructors.filter(instructor => instructor.selected),
    packages: availablePackages.filter(pack => pack.selected),
  };

  const eventData = useQuery(
    'event',
    async () => {
      const response = await jsonRequest(`/api/event/${event.id}/manage`);
      return response.json();
    },
    {
      initialData,
      onSuccess: newData => {
        dispatch({
          type: 'UPDATE',
          payload: newData.permissions,
        });
      },
    }
  );
  const { data } = eventData;
  const { id, participation_mode } = data;

  useWSEventUpdates(wsEndpoint, jwt);

  const routes = [
    {
      title: 'Players',
      to: `/organisation/${orgId}/event/${id}/manage${
        participation_mode === participationMode.TEAM ? '/players' : ''
      }`,
    },
    {
      title: 'Challenges',
      to: `/organisation/${orgId}/event/${id}/manage/challenges`,
    },
  ];
  if (participation_mode === participationMode.TEAM) {
    routes.unshift({
      title: 'Teams',
      to: `/organisation/${orgId}/event/${id}/manage`,
    });
  }

  const changeTab = ({ e, to }) => {
    e.preventDefault();

    // Go to new tab
    navigate(to, { replace: true });
  };

  return (
    <Wrapper>
      <ManageEventHeader {...{ eventData, stats }} />
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
        <Content
          {...{
            columns: columns.length,
          }}
        >
          <Router>
            <ContentWrapper
              {...{
                routes,
                columns,
                setColumns,
                changeTab,
                rightGradient: true,
                path: `/organisation/:organisationId/event/:eventId/manage`,
                center: <FetchingIndicator {...{ participation_mode, id }} />,
                tableContent: true,
              }}
            >
              {participation_mode === participationMode.TEAM && (
                <Teams {...{ path: '/' }} />
              )}
              <Players
                {...{
                  path:
                    participation_mode === participationMode.TEAM
                      ? '/players'
                      : '/',
                  event: data,
                  players,
                  orgId,
                  setAddPlayerModalOpen,
                  config,
                }}
              />
              <Challenges
                {...{
                  path: 'challenges',
                  event: data,
                  challenges,
                  availablePackages,
                }}
              />
            </ContentWrapper>
          </Router>
          <Modal
            {...{
              open: addPlayerModalOpen,
              setOpen: setAddPlayerModalOpen,
              headerType: 'basic',
            }}
          >
            <AddPlayerModal
              {...{ eventId: id, config, setAddPlayerModalOpen }}
            />
          </Modal>
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
            {index === 0 && (
              <Information
                {...{
                  instructors,
                  packages: availablePackages,
                  event: data,
                  timezonesGroupedByOffset,
                }}
              />
            )}
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
}

ManageEvent.propTypes = {
  organisation: PropTypes.object,
  event: PropTypes.object,
  challenges: PropTypes.object,
  players: PropTypes.object,
  stats: PropTypes.object,
  instructors: PropTypes.array,
  packages: PropTypes.array,
  displayName: PropTypes.string,
  config: PropTypes.object,
  links: PropTypes.object,
  wsEndpoint: PropTypes.string,
  jwt: PropTypes.string,
  timezonesGroupedByOffset: PropTypes.array,
};

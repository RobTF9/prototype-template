import React from 'react';
import PropTypes from 'prop-types';
import { useLocation } from '@reach/router';
import { Header, TabLink, Title, Content } from './styles';

const ContentWrapper = ({
  children,
  routes,
  title,
  center,
  columns,
  rightGradient,
  setColumns,
  changeTab,
  tableContent = false,
}) => {
  const location = useLocation();
  return (
    <>
      <Header {...{ tableContent }}>
        <div>
          {routes ? (
            routes.map(route => (
              <TabLink
                href={route.to}
                className="core-heading core-heading--quinary core-link"
                key={route.to}
                isCurrent={location.pathname === route.to}
                onClick={e => changeTab({ to: route.to, e })}
              >
                {route.title}
              </TabLink>
            ))
          ) : (
            <Title className="core-heading core-heading--quinary">
              {title}
            </Title>
          )}
        </div>
        {center}
        {!!columns.length && (
          <button
            type="button"
            className={`core-link ${
              columns.some(col => col.open === true)
                ? ''
                : 'core-link--quiet-emphasis'
            }`}
            onClick={() =>
              setColumns(currentColumns =>
                currentColumns.some(col => col.open === true)
                  ? currentColumns.map(col => ({ ...col, open: false }))
                  : currentColumns.map(col => ({ ...col, open: true }))
              )
            }
          >
            {columns.some(col => col.open === true) ? 'Expand' : 'Collapse'}
          </button>
        )}
      </Header>
      <Content {...{ rightGradient, tableContent }}>{children}</Content>
    </>
  );
};

ContentWrapper.propTypes = {
  children: PropTypes.any,
  routes: PropTypes.array,
  title: PropTypes.string,
  center: PropTypes.any,
  columns: PropTypes.array,
  setColumns: PropTypes.func,
  rightGradient: PropTypes.bool,
  changeTab: PropTypes.func,
  tableContent: PropTypes.bool,
};
export default ContentWrapper;

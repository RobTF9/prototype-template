import React from 'react';
import PropTypes from 'prop-types';
import { useLocation } from '@reach/router';
import { PageLink } from './styles';

const PageLinkComponent = ({ currentPage, page, updatePage }) => {
  const location = useLocation();
  return (
    <PageLink
      {...{
        className: 'core-link',
        selected: currentPage === page,
        disabled: currentPage === page,
        onClick: () => updatePage(page, location),
      }}
    >
      {page}
    </PageLink>
  );
};

PageLinkComponent.propTypes = {
  currentPage: PropTypes.number,
  page: PropTypes.number,
  updatePage: PropTypes.func,
};

export default PageLinkComponent;

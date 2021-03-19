import React from 'react';
import PropTypes from 'prop-types';
import { Wrapper, Spacer } from './styles';
import PageLink from './PageLink';

const Pagination = ({ page, total_pages: totalPages, updatePage }) => {
  const SPACES = 7;
  const pages = Array.from(Array(totalPages), (_, i) => i + 1);

  if (!totalPages || totalPages === 1) {
    return null;
  }

  if (totalPages <= SPACES) {
    return (
      <Wrapper>
        {pages.map(pg => (
          <PageLink {...{ currentPage: page, page: pg, key: pg, updatePage }} />
        ))}
      </Wrapper>
    );
  }

  // Close to start
  if (page <= Math.round(SPACES / 2)) {
    const start = pages.slice(0, SPACES - 2);

    return (
      <Wrapper>
        {start.map(pg => (
          <PageLink {...{ currentPage: page, page: pg, key: pg, updatePage }} />
        ))}
        <Spacer>...</Spacer>
        <PageLink {...{ currentPage: page, page: totalPages, updatePage }} />
      </Wrapper>
    );
  }

  // Close to end
  if (page >= Math.round(totalPages - SPACES / 2)) {
    const end = pages.slice(-(SPACES - 2));
    return (
      <Wrapper>
        <PageLink {...{ currentPage: page, page: 1, updatePage }} />
        <Spacer>...</Spacer>
        {end.map(pg => (
          <PageLink {...{ currentPage: page, page: pg, key: pg, updatePage }} />
        ))}
      </Wrapper>
    );
  }

  // Middle
  const middle = [page - 1, page, page + 1];
  return (
    <Wrapper>
      <PageLink {...{ currentPage: page, page: 1, updatePage }} />
      <Spacer>...</Spacer>
      {middle.map(pg => (
        <PageLink {...{ currentPage: page, page: pg, key: pg, updatePage }} />
      ))}
      <Spacer>...</Spacer>
      <PageLink {...{ currentPage: page, page: totalPages, updatePage }} />
    </Wrapper>
  );
};

Pagination.propTypes = {
  page: PropTypes.number,
  total_pages: PropTypes.number,
  updatePage: PropTypes.func,
};

export default Pagination;

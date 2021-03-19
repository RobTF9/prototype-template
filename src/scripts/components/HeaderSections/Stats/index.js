import React from 'react';
import PropTypes from 'prop-types';
import LoadingEllipses from '../../LoadingEllipses';
import { Wrapper, Stat } from './styles';

const Stats = ({
  headers,
  data,
  hideMobile, // eslint-disable-line no-unused-vars
}) => {
  const [header1, header2, header3] = headers;
  let [stat1, stat2, stat3] = data;

  if (typeof stat1 === 'number') {
    stat1 = stat1.toLocaleString();
  }

  if (typeof stat2 === 'number') {
    stat2 = stat2.toLocaleString();
  }

  if (typeof stat3 === 'number') {
    stat3 = stat3.toLocaleString();
  }

  return (
    <Wrapper>
      <Stat>
        <h5 className="core-heading core-heading--senary">{header1}</h5>
        <p className="core-text">
          {stat1 !== null ? stat1 : <LoadingEllipses />}
        </p>
      </Stat>
      <Stat>
        <h5 className="core-heading core-heading--senary">{header2}</h5>
        <p className="core-text">
          {stat2 !== null ? stat2 : <LoadingEllipses />}
        </p>
      </Stat>
      <Stat>
        <h5 className="core-heading core-heading--senary">{header3}</h5>
        <p className="core-text">
          {stat3 !== null ? stat3 : <LoadingEllipses />}
        </p>
      </Stat>
    </Wrapper>
  );
};

Stats.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.string),
  data: PropTypes.array,
  hideMobile: PropTypes.bool,
};

export default Stats;

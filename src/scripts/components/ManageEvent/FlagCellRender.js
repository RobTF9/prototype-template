import React, { useState } from 'react';
import PropTypes from 'prop-types';

function FlagCellRender({ value }) {
  const [show, setShow] = useState(false);

  if (!value) {
    return '-';
  }

  return (
    <p className="core-text" style={{ margin: 0 }}>
      <button
        type="button"
        className="core-link core-link--flying"
        onClick={() => setShow(prev => !prev)}
      >
        {show ? 'Hide' : 'Show'}
      </button>
      {show ? (
        <code
          className="core-code core-code--inline"
          style={{ whiteSpace: 'nowrap', marginLeft: '10px' }}
        >
          {value}
        </code>
      ) : null}
    </p>
  );
}

FlagCellRender.propTypes = {
  value: PropTypes.string,
};

export default FlagCellRender;

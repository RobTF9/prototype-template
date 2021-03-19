import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

const TagSelect = ({ options, name, label, initialValue, tip }) => {
  const [tags, setTags] = useState(initialValue);

  return (
    <div className="field">
    <label className="label" htmlFor={name}>{label}</label> {/*eslint-disable-line*/}
      <div className="select">
        <Select
          {...{
            options,
            closeMenuOnSelect: false,
            isMulti: true,
            classNamePrefix: 'react-select',
            inputId: name,
            name: `${name}[]`,
            value: tags,
            onChange: value => setTags(value),
          }}
        />
      </div>
      {!!tip && <div className="tip">{tip}</div>}
    </div>
  );
};

TagSelect.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  tip: PropTypes.string,
  initialValue: PropTypes.array,
};

export default TagSelect;

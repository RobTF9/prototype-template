import React from 'react';
import PropTypes from 'prop-types';
import Datum from './Datum';

const DataList = ({ classes = '', headingLevel, title, groups }) => {
  const Heading = `h${headingLevel}`;
  const GroupHeading = `h${headingLevel + 1}`;

  return (
    <div className={`atom atom-data-list ${classes}`}>
      <div className="helper-topper layout-container">
        <Heading
          className="core-heading core-heading--quinary"
          style={{
            marginBottom: '10px',
          }}
        >
          {title}
        </Heading>
      </div>

      <div className="data">
        {groups.map(
          (group, index) =>
            !!group.data.length && (
              <div className="grouping" key={`group${index + 1}`}>
                {group.title && (
                  <GroupHeading className="title core-text core-text--primary">
                    {group.title}
                  </GroupHeading>
                )}
                {group.data.map(datum => (
                  <Datum {...{ ...datum, key: datum.id }} />
                ))}
              </div>
            )
        )}
      </div>
    </div>
  );
};

DataList.propTypes = {
  classes: PropTypes.string,
  headingLevel: PropTypes.number,
  title: PropTypes.string,
  groups: PropTypes.array,
};

export default DataList;

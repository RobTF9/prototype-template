import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { EventContext } from '../../common/EventContext';

const Links = ({ groupView, view, toggleGroupView, toggleView }) => {
  const {
    event: { isScored },
  } = useContext(EventContext);

  const groupLinkClasses = classNames({
    'core-link': true,
    'core-link--selected': groupView === 'group',
  });

  const difficultyLinkClasses = classNames({
    'core-link': true,
    'core-link--selected': groupView === 'difficulty',
  });

  const gridLinkClasses = classNames({
    'core-link': true,
    'core-link--selected': view === 'grid',
  });

  const listLinkClasses = classNames({
    'core-link': true,
    'core-link--selected': view === 'list',
  });

  return (
    <div className="links">
      {isScored && (
        <div className="link-group">
          <div className="item">
            <button
              type="button"
              className={groupLinkClasses}
              onClick={toggleGroupView}
              disabled={groupView === 'group'}
            >
              Group
            </button>
          </div>

          <div className="item">
            <button
              type="button"
              className={difficultyLinkClasses}
              onClick={toggleGroupView}
              disabled={groupView === 'difficulty'}
            >
              Difficulty
            </button>
          </div>
        </div>
      )}

      <div className="item">
        <button
          type="button"
          className={gridLinkClasses}
          onClick={toggleView}
          disabled={view === 'grid'}
        >
          Grid
        </button>
      </div>

      <div className="item">
        <button
          type="button"
          className={listLinkClasses}
          onClick={toggleView}
          disabled={view === 'list'}
        >
          List
        </button>
      </div>
    </div>
  );
};

Links.propTypes = {
  groupView: PropTypes.string,
  view: PropTypes.string,
  toggleGroupView: PropTypes.func,
  toggleView: PropTypes.func,
};

export default Links;

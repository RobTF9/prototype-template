import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Datum = ({ text, moreInfo = [], links = [] }) => (
  <div className="row layout-container">
    <div className="info layout layout--two-thirds-left">
      <div className="detail core-text">{text}</div>
      {moreInfo.map(
        ({ size, taller, bottom, type, text: moreInfoText, span }, index) => {
          const infoClasses = classNames({
            detail: true,
            'core-text': true,
            [`core-text--${size}`]: size,
            'core-bar--taller': taller,
            'core-bar--bottom': bottom,
            [`core-text--${type}`]: type,
          });

          return (
            <div className={infoClasses} key={`more-info${index + 1}`}>
              {moreInfoText}
              {span && (
                <span
                  className={`core-text core-text--tertiary ${
                    span.type ? `core-text--${span.type}` : ''
                  }`}
                >
                  {span.text}
                </span>
              )}
            </div>
          );
        }
      )}
    </div>

    <div className="actions layout layout--one-third-right">
      {links.map(({ href, type, text: linkText }, index) => (
        <div className="action" key={`action${index + 1}`}>
          {!!href && (
            <a
              href={href}
              className={`core-link ${type ? `core-link--${type}` : ''}`}
            >
              {linkText}
            </a>
          )}
        </div>
      ))}
    </div>
  </div>
);

Datum.propTypes = {
  text: PropTypes.string,
  moreInfo: PropTypes.array,
  links: PropTypes.array,
};

export default Datum;

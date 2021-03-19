import React from 'react';
import PropTypes from 'prop-types';
import { Wrapper, Header, LinkWrapper } from './styles';

const Card = ({ border, header, link, loading = false, children }) => (
  <Wrapper {...{ border, loading: loading ? 1 : 0 }}>
    {!loading && (
      <>
        <Header swapOrder={header.swapOrder}>
          <p className="core-text--primary">{header.title}</p>
          <p className="core-text">{header.subTitle}</p>
        </Header>
        <div>{children}</div>
        <LinkWrapper color={link.color}>
          {link.href ? (
            <a href={link.href} className="core-link core-link--flying">
              {link.text}
            </a>
          ) : (
            <p>{link.text}</p>
          )}
        </LinkWrapper>
      </>
    )}
  </Wrapper>
);

Card.propTypes = {
  border: PropTypes.string,
  header: PropTypes.object,
  link: PropTypes.object,
  loading: PropTypes.bool,
  children: PropTypes.any,
};

export default Card;

import React, { Children } from 'react';
import PropTypes from 'prop-types';
import useScrollInfo from 'react-element-scroll-hook';
import {
  Wrapper,
  InfoWrapper,
  Info,
  SubText,
  Sections,
  Section,
} from './styles';

const Header = ({
  title,
  subText,
  children,
  scrollableInfo = true,
  breakpoint = 600,
}) => {
  const [scrollInfo, setRef] = useScrollInfo();
  return (
    <Wrapper {...{ breakpoint }}>
      <InfoWrapper {...{ breakpoint, hasChildren: !!Children.count(children) }}>
        <Info
          {...{
            breakpoint,
            ref: setRef,
            className: scrollInfo.x.className,
            scrollableInfo,
          }}
        >
          {title}
          {subText && (
            <SubText
              className="core-text core-text--tertiary"
              color={subText.color}
              breakpoint={breakpoint}
            >
              {subText.text}
            </SubText>
          )}
        </Info>
      </InfoWrapper>
      {!!Children.count(children) && (
        <Sections>
          {Children.map(
            children,
            child =>
              child !== null && (
                <Section
                  {...{
                    breakpoint,
                    fixedEnd: child.props.fixedEnd,
                    hideMobile: child.props.hideMobile,
                    fullWidthMobile: child.props.fullWidthMobile,
                    noBorderMobile: child.props.noBorderMobile,
                  }}
                >
                  {child}
                </Section>
              )
          )}
        </Sections>
      )}
    </Wrapper>
  );
};

Header.propTypes = {
  title: PropTypes.object,
  subText: PropTypes.object,
  children: PropTypes.any,
  scrollableInfo: PropTypes.bool,
  breakpoint: PropTypes.number,
};

export default Header;

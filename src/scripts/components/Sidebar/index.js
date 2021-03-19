import React, { useState, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import { motion } from 'framer-motion';
import Chevron from '../Icons/Chevron';
import {
  SidebarWrapper,
  SidebarToggle,
  SidebarList,
  SidebarHeader,
  SidebarHeaderNotActive,
  SidebarHeaderActive,
  SidebarChildren,
} from './styles';

const Sidebar = ({
  links,
  nonActiveHeaderChild,
  activeHeaderChild,
  children,
  sidebarActive,
  setSidebarActive,
}) => {
  const className = 'core-link core-link--invisible';
  const isActive = ({ isCurrent }) =>
    isCurrent
      ? {
          className: `${className} active`,
        }
      : {
          className,
        };

  const hideAnimation = {
    animate: {
      x: sidebarActive ? 0 : -250,
      opacity: sidebarActive ? 1 : 0,
    },
    transition: {
      damping: 500,
      stiffness: 50,
    },
  };

  const [sidebarWidth, setSidebarWidth] = useState({
    active: 290,
    notActive: 58,
  });

  const checkSize = () => {
    if (window.innerWidth <= 600) {
      setSidebarWidth({
        active: 290,
        notActive: 38,
      });
    } else {
      setSidebarWidth({
        active: 290,
        notActive: 58,
      });
    }
  };

  useLayoutEffect(() => {
    checkSize();
    window.addEventListener('resize', checkSize);
    return () => {
      window.removeEventListener('resize', checkSize);
    };
  }, []);

  return (
    <SidebarWrapper
      {...{
        sidebarActive,
        animate: {
          width: sidebarActive ? sidebarWidth.active : sidebarWidth.notActive,
        },
        transition: {
          damping: 300,
          stiffness: 50,
        },
      }}
    >
      <SidebarHeader>
        <SidebarHeaderNotActive {...{ sidebarActive }}>
          {nonActiveHeaderChild}
        </SidebarHeaderNotActive>
        <SidebarHeaderActive {...{ sidebarActive, ...hideAnimation }}>
          {activeHeaderChild}
        </SidebarHeaderActive>
        <SidebarToggle
          {...{
            sidebarActive,
            onClick: () => setSidebarActive(!sidebarActive),
          }}
        >
          <Chevron />
        </SidebarToggle>
      </SidebarHeader>
      <SidebarList {...{ sidebarActive }}>
        {links.map(({ to, icon, text }) => (
          <li key={to}>
            <Link
              {...{
                to,
                getProps: isActive,
              }}
            >
              {icon} <motion.span {...{ ...hideAnimation }}>{text}</motion.span>
            </Link>
          </li>
        ))}
      </SidebarList>
      {children && (
        <SidebarChildren {...{ ...hideAnimation }}>{children}</SidebarChildren>
      )}
    </SidebarWrapper>
  );
};

Sidebar.propTypes = {
  sidebarActive: PropTypes.bool.isRequired,
  setSidebarActive: PropTypes.func.isRequired,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      to: PropTypes.string.isRequired,
      icon: PropTypes.node.isRequired,
      text: PropTypes.string.isRequired,
    })
  ).isRequired,
  nonActiveHeaderChild: PropTypes.node.isRequired,
  activeHeaderChild: PropTypes.node.isRequired,
  children: PropTypes.node,
};

export default Sidebar;

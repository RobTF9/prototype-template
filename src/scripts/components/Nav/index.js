import React, { useState, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import MenuIcon from '../Icons/Menu';
import EventsIcon from '../Icons/Events';
import PackagesIcon from '../Icons/Packages';
import OrganisationsIcon from '../Icons/Organisations';
import HelpIcon from '../Icons/Help';
import ProfileIcon from '../Icons/Profile';
import { Wrapper, MenuButton, Tabs, Menu, CloseButton } from './styles';
import ArrowLeft from '../Icons/ArrowLeft';

const variants = {
  open: { x: 0 },
  closed: {
    x: '-100%',
  },
};

const Nav = ({ children, displayName, links, config }) => {
  const { csrfNameKey, csrfValueKey, csrfName, csrfValue } = config;
  const [isMenuOpen, setIsMenuOpen] = useState(!children);

  useLayoutEffect(() => {
    const accountLinks = document.querySelector('.account-links');
    const button = document.querySelector('.account-button');

    button.addEventListener('click', () => {
      accountLinks.classList.toggle('visible');
    });

    window.addEventListener('click', e => {
      if (button.contains(e.target) || accountLinks.contains(e.target)) return;
      accountLinks.classList.remove('visible');
    });
  }, []);

  return (
    <Wrapper className="entity entity-navigation entity-navigation--event">
      <MenuButton onClick={() => setIsMenuOpen(true)}>
        <MenuIcon />
      </MenuButton>
      <Tabs>{children}</Tabs>
      <Menu
        {...{
          variants,
          initial: 'closed',
          animate: isMenuOpen ? 'open' : 'closed',
          transition: {
            type: 'spring',
            damping: 150,
            stiffness: 500,
          },
        }}
      >
        <div className="links">
          {children && (
            <CloseButton onClick={() => setIsMenuOpen(false)}>
              <ArrowLeft />
            </CloseButton>
          )}
          <a href="/" className="core-link core-link--invisible logo">
            <div />
            <p>
              <span>SANS</span> Tomahawque
            </p>
          </a>
          <ul className="list">
            <li className="item">
              <a href={links.dashboard} className="core-link core-link--quiet">
                <EventsIcon />
                <p>Events</p>
              </a>
            </li>
            {links.organisationLinks.length > 0 &&
              links.organisationLinks[0].packages !== '' && (
                <li className="item">
                  <a
                    href={links.organisationLinks[0].packages}
                    className="core-link core-link--quiet"
                  >
                    <PackagesIcon />
                    <p>Packages</p>
                  </a>
                </li>
              )}
            {links.organisationLinks.length > 0 &&
              links.organisationLinks[0].organisation !== '' && (
                <li className="item">
                  <a
                    href={links.organisationLinks[0].organisation}
                    className="core-link core-link--quiet"
                  >
                    <OrganisationsIcon />
                    <p>Organisation</p>
                  </a>
                </li>
              )}
            <li className="item">
              <a href={links.faqs} className="core-link core-link--quiet">
                <HelpIcon />
                <p>FAQs</p>
              </a>
            </li>
          </ul>
        </div>
        <div className="account">
          <button
            type="button"
            className="core-link core-link--flying account-button"
          >
            <ProfileIcon />
            <span>{displayName}</span>
          </button>
          <ul className="account-links">
            <li className="link">
              <a className="core-link core-link--quiet" href={links.profile}>
                View profile
              </a>
            </li>
            <li className="link">
              <a
                className="core-link core-link--quiet"
                href={links.editProfile}
              >
                Edit profile
              </a>
            </li>
            {links.canToggleNotificationSettings && (
              <li className="link">
                <a
                  className="core-link core-link--quiet"
                  href={links.editNotifications}
                >
                  Notifications
                </a>
              </li>
            )}
            <li className="link">
              <a
                className="core-link core-link--quiet"
                href={links.changePassword}
              >
                Change password
              </a>
            </li>
            {links.organisationLinks.length > 0 &&
              links.organisationLinks[0].roles !== '' && (
                <li className="link">
                  <a
                    className="core-link core-link--quiet"
                    href={links.organisationLinks[0].roles}
                  >
                    Your roles
                  </a>
                </li>
              )}
            <li className="link">
              <form action={links.signOut} method="post">
                <input name={csrfNameKey} value={csrfName} type="hidden" />
                <input name={csrfValueKey} value={csrfValue} type="hidden" />
                <button type="submit" className="core-link core-link--warning">
                  Sign out
                </button>
              </form>
            </li>
          </ul>
        </div>
      </Menu>
    </Wrapper>
  );
};

Nav.propTypes = {
  children: PropTypes.any,
  displayName: PropTypes.string,
  links: PropTypes.object,
  config: PropTypes.object,
};

export default Nav;

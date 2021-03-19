/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { withDesign } from 'storybook-addon-designs';
import Nav from '.';

export default {
  title: 'Nav',
  component: Nav,
  decorators: [
    withDesign,
    storyFn => (
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          alignItems: 'flex-end',
        }}
      >
        {storyFn()}
      </div>
    ),
  ],
  parameters: {
    design: {
      type: 'figma',
      url:
        'https://www.figma.com/file/mMBOtqSgrXnSAkUMJLVsYD/Entities-%2F-Nav?node-id=0%3A1&viewport=453%2C18%2C0.9194113612174988',
    },
  },
  argTypes: {
    children: { control: { disable: true } },
  },
};

const Template = args => <Nav {...args} />;

export const Default = Template.bind({});
Default.args = {
  displayName: 'jurpy',
  links: {
    profile: '/profile',
    dashboard: '/my-events',
    faqs: '/faqs',
    signOut: '/sign-out',
    organisationLinks: [],
    editNotifications: '/edit-notifications',
    canToggleNotificationSettings: true,
  },
  config: {
    csrfNameKey: '',
    csrfValueKey: '',
    csrfName: '',
    csrfValue: '',
  },
  children: [
    <button type="button" className="core-link core-link--selected">
      Players
    </button>,
    <button type="button" className="core-link core-link--flying">
      Code of conduct
    </button>,
  ],
};

export const WithOrgLinks = Template.bind({});
WithOrgLinks.args = {
  displayName: 'jurpy',
  links: {
    profile: '/profile',
    dashboard: '/my-events',
    faqs: '/faqs',
    signOut: '/sign-out',
    organisationLinks: [
      {
        packages: '/packages',
        organisation: '/organisation',
        roles: '/roles',
      },
    ],
    editNotifications: '/edit-notifications',
    canToggleNotificationSettings: true,
  },
  config: {
    csrfNameKey: '',
    csrfValueKey: '',
    csrfName: '',
    csrfValue: '',
  },
  children: [
    <button type="button" className="core-link core-link--selected">
      Players
    </button>,
    <button type="button" className="core-link core-link--flying">
      Code of conduct
    </button>,
  ],
};

export const NoChildren = Template.bind({});
NoChildren.args = {
  displayName: 'jurpy',
  links: {
    profile: '/profile',
    dashboard: '/my-events',
    faqs: '/faqs',
    signOut: '/sign-out',
    organisationLinks: [
      {
        packages: '/packages',
        organisation: '/organisation',
        roles: '/roles',
      },
    ],
    editNotifications: '/edit-notifications',
    canToggleNotificationSettings: true,
  },
  config: {
    csrfNameKey: '',
    csrfValueKey: '',
    csrfName: '',
    csrfValue: '',
  },
};

/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { withDesign } from 'storybook-addon-designs';
import TagSelect from '.';
import options from './options.json';

export default {
  title: 'TagSelect',
  component: TagSelect,
  decorators: [
    withDesign,
    Story => (
      <form className="core-form">
        <Story />
      </form>
    ),
  ],
  parameters: {
    design: {
      type: 'iframe',
      url: 'https://gracious-panini-0c904c.netlify.app/',
    },
  },
};

const Template = args => <TagSelect {...args} />;

export const Default = Template.bind({});
Default.args = { options, name: 'select-tag', label: 'Select tags' };

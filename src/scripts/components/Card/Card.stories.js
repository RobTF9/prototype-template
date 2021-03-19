/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { withDesign } from 'storybook-addon-designs';
import Card from '.';

export default {
  title: 'Card',
  component: Card,
  decorators: [
    withDesign,
    storyFn => (
      <div style={{ width: '300px', padding: '20px' }}>{storyFn()}</div>
    ),
  ],
  parameters: {
    design: {
      type: 'figma',
      url:
        'https://www.figma.com/file/EowwnAj498C6nzofqRAwOx/Entities-%2F-Cards?node-id=0%3A1&viewport=705%2C621%2C1',
    },
  },
  argTypes: {
    children: { control: { disable: true } },
  },
};

const Template = args => <Card {...args} />;

export const Default = Template.bind({});
Default.args = {
  border: 'greydarkest',
  header: {
    title: 'Title',
    subTitle: 'Subtitle',
  },
  link: { text: 'Link', href: '#' },
  children: <p className="Content">Content</p>,
};

export const Loading = Template.bind({});
Loading.args = {
  ...Default.args,
  loading: true,
};

export const NoSubTitleOrContent = Template.bind({});
NoSubTitleOrContent.args = {
  ...Default.args,
  header: {
    title: 'Title',
  },
  children: null,
};

export const Player = Template.bind({});
Player.args = {
  ...Default.args,
  header: {
    title: 'LongestNamePossible3',
    subTitle: 'Joined 1 second ago',
  },
  link: { text: 'Profile', href: '/profile' },
};

export const HighlightedPlayer = Template.bind({});
HighlightedPlayer.args = {
  ...Default.args,
  border: 'blueprime',
  header: {
    title: (
      <>
        <span className="you">You:</span> robtf9
      </>
    ),
    subTitle: 'Joined 1 second ago',
  },
};

export const ChallengeCard = Template.bind({});
ChallengeCard.args = {
  ...Default.args,
  border: 'blueprime',
  header: {
    title: 'Challenge title',
    subTitle: '250pts',
    swapOrder: true,
  },
  link: { text: 'View' },
};

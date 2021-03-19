/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { createHistory, LocationProvider } from '@reach/router';

import Pagination from '.';
import { EventProvider } from '../../common/EventContext';

const history = createHistory(window);

export default {
  title: 'Pagination',
  component: Pagination,
  decorators: [
    storyFn => (
      <LocationProvider history={history}>
        <EventProvider>{storyFn()}</EventProvider>
      </LocationProvider>
    ),
  ],
  argTypes: { updatePage: { action: 'Page update' } },
};

const Template = args => <Pagination {...args} />;

export const TwoPages = Template.bind({});
TwoPages.args = { total_pages: 2, page: 1 };

export const SevenPages = Template.bind({});
SevenPages.args = { total_pages: 7, page: 3 };

export const TwentyPages = Template.bind({});
TwentyPages.args = { total_pages: 20, page: 10 };

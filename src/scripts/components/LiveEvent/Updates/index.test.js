import React from 'react';
import { render, wait } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { EventProvider } from '../../../common/EventContext';
import Updates from '.';
import mockData from '../../../../../system/data/updates.json';

describe('Updates component', () => {
  test('it renders updates to display', async () => {
    const { getByText } = render(
      <EventProvider>
        <Updates
          {...{ updates: mockData.updates, firstRender: { current: true } }}
        />
      </EventProvider>
    );

    // Wait until we can see 'Manchester CTF 2019', i.e when fetch is done
    await wait(() =>
      expect(getByText('Manchester CTF 2019')).toBeInTheDocument()
    );

    expect(getByText('Find the exploit')).toBeInTheDocument();
  });
});

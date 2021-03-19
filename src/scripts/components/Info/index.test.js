import React from 'react';
import { render, wait } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Info from './index';
import { EventProvider } from '../../common/EventContext';

const mockData = {
  code_of_conduct: '**Code of Conduct**',
  files: [],
};

describe('Info component', () => {
  test('it renders and fetches the event info CoC data to display', async () => {
    window.fetch.mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockData),
      })
    );

    const { getByText } = render(
      <EventProvider defaultOverrides={{ id: '12345' }}>
        <Info />
      </EventProvider>
    );

    // Wait until we can see 'Code of Conduct', i.e when fetch is done
    await wait(() => getByText('Code of Conduct'));

    expect(fetch.mock.calls.length).toBe(1);
    expect(getByText('Code of Conduct')).toBeInTheDocument();
  });

  test('it removes HTML tags found in the markdown code of conduct', async () => {
    window.fetch.mockImplementation(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            ...mockData,
            details: `
              **Code of Conduct**
              <a id='exampleLink' href='jaVasCript:document.querySelector("form[action=\\'/sign-out\\'] button").click()'></a>
              <style>
                #exampleLink{display:block;position:fixed;left:0;top:0;width:100vw;height:100vh;z-index:1000}
              </style>
            `,
          }),
      })
    );

    const { getByText } = render(
      <EventProvider defaultOverrides={{ id: '12345' }}>
        <Info />
      </EventProvider>
    );

    // Wait until we can see 'Code of Conduct', i.e when fetch is done
    await wait(() => getByText('Code of Conduct'));

    // Expect not to find an element with
    expect(document.getElementById('exampleLink')).toBeNull();
  });
});

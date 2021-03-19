import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ChallengeList from './ChallengeList';
import {
  basic,
  multipleGroups,
  difficultyGroups,
} from './ChallengeList.fixture';
import { EventProvider } from '../../common/EventContext';

const defaultProps = {
  data: basic,
  challengeRefs: { current: [] },
  view: 'list',
  groupView: 'group',
};

describe('ChallengeList component', () => {
  test('it renders', async () => {
    const { container } = render(
      <EventProvider>
        <ChallengeList {...defaultProps} />
      </EventProvider>
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  test('it renders multiple groups and challenges', () => {
    const props = { ...defaultProps, data: multipleGroups };
    const { getByText } = render(
      <EventProvider>
        <ChallengeList {...props} />
      </EventProvider>
    );
    expect(getByText('Group 1')).toBeInTheDocument();
    expect(getByText('Challenge 1')).toBeInTheDocument();
    expect(getByText('Group 2')).toBeInTheDocument();
    expect(getByText('Challenge 2')).toBeInTheDocument();
    expect(getByText('Challenge 3')).toBeInTheDocument();
  });

  test('it renders a locked challenge group with unlock message', () => {
    const props = { ...defaultProps, data: multipleGroups };
    const { getByText } = render(
      <EventProvider>
        <ChallengeList {...props} />
      </EventProvider>
    );
    expect(
      getByText('This group unlocks when 50% of Group 1 has been completed.')
    ).toBeInTheDocument();
  });

  test('it renders with correct class names for grid and list views', () => {
    const props = { ...defaultProps, data: multipleGroups };
    const { rerender } = render(
      <EventProvider>
        <ChallengeList {...props} />
      </EventProvider>
    );
    const group = document.querySelector('.group');
    expect(group).toHaveClass('group--list');

    const props2 = { ...defaultProps, data: multipleGroups, view: 'grid' };
    rerender(
      <EventProvider>
        <ChallengeList {...props2} />
      </EventProvider>
    );
    expect(group).toHaveClass('group--grid');
  });

  test('it renders correctly with difficulty groups', () => {
    const props = { ...defaultProps, data: difficultyGroups };
    const { getByText, queryByText } = render(
      <EventProvider>
        <ChallengeList {...props} />
      </EventProvider>
    );
    expect(getByText('Introductory')).toBeInTheDocument();
    expect(getByText('Easy')).toBeInTheDocument();
    expect(getByText('Medium')).toBeInTheDocument();
    expect(getByText('Hard')).toBeInTheDocument();
    expect(getByText('Extreme')).toBeInTheDocument();
    expect(queryByText('Unlocks')).not.toBeInTheDocument();
  });
});

import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Challenge from './Challenge';
import { EventProvider } from '../../common/EventContext';

const defaultProps = {
  challenge: {
    completed: false,
    id: '12345',
    locked: false,
    points: 100,
    title: 'Challenge 1',
  },
  view: 'grid',
};

describe('Challenge component', () => {
  test('it renders', async () => {
    const { container } = render(
      <EventProvider>
        <Challenge {...defaultProps} />
      </EventProvider>
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  test('it renders as a link when live and not locked or paused', () => {
    const end = new Date();
    end.setHours(end.getHours() + 1);

    const { container } = render(
      <EventProvider defaultOverrides={{ end }}>
        <Challenge {...defaultProps} />
      </EventProvider>
    );

    expect(container.firstChild.tagName).toBe('A');
    expect(container.firstChild.href.endsWith('challenge/12345')).toBe(true);
  });

  test('it still renders as a link when challenge completed', () => {
    const end = new Date();
    end.setHours(end.getHours() + 1);

    const props = {
      ...defaultProps,
      challenge: { completed: true, id: '12345' },
    };
    const { container } = render(
      <EventProvider defaultOverrides={{ end }}>
        <Challenge {...props} />
      </EventProvider>
    );

    expect(container.firstChild.tagName).toBe('A');
    expect(container.firstChild.href.endsWith('challenge/12345')).toBe(true);
  });

  test('it renders as a span, not link, when end is in the past or challenge locked or paused', () => {
    const end = new Date();
    end.setHours(end.getHours() - 1);

    const props1 = { ...defaultProps };
    const { container, rerender } = render(
      <EventProvider defaultOverrides={{ end }}>
        <Challenge {...props1} />
      </EventProvider>
    );

    expect(container.firstChild.tagName).toBe('SPAN');

    const props2 = { ...defaultProps, challenge: { locked: true } };
    rerender(
      <EventProvider>
        <Challenge {...props2} />
      </EventProvider>
    );

    expect(container.firstChild.tagName).toBe('SPAN');
  });

  test('it renders with correct class for grid view', () => {
    const { container, rerender } = render(
      <EventProvider>
        <Challenge {...defaultProps} />
      </EventProvider>
    );

    expect(container.firstChild).toHaveClass('challenge--grid');
    expect(container.firstChild).not.toHaveClass('challenge--row');

    const props = { ...defaultProps, view: 'list' };
    rerender(
      <EventProvider>
        <Challenge {...props} />
      </EventProvider>
    );

    expect(container.firstChild).toHaveClass('challenge--row');
    expect(container.firstChild).not.toHaveClass('challenge--grid');
  });

  test('it renders with correct class and shows score only when isScored true', () => {
    const { container, queryByText } = render(
      <EventProvider defaultOverrides={{ isScored: true }}>
        <Challenge {...defaultProps} />
      </EventProvider>
    );
    expect(container.firstChild).toHaveClass('challenge--scored');
    expect(queryByText('100pts')).toBeInTheDocument();
  });

  test('it renders without points and challenge scored class when isScored not true', () => {
    const { container, queryByText } = render(
      <EventProvider>
        <Challenge {...defaultProps} />
      </EventProvider>
    );
    expect(container.firstChild).not.toHaveClass('challenge--scored');
    expect(queryByText('100pts')).not.toBeInTheDocument();
  });

  test('it renders with the correct status text', () => {
    const { rerender, getByText } = render(
      <EventProvider>
        <Challenge {...defaultProps} />
      </EventProvider>
    );
    expect(getByText('View')).toBeInTheDocument();
    expect(getByText('View')).toHaveClass('action', 'core-text');

    const props2 = { ...defaultProps, challenge: { locked: true } };
    rerender(
      <EventProvider>
        <Challenge {...props2} />
      </EventProvider>
    );
    expect(getByText('Locked')).toBeInTheDocument();
    expect(getByText('Locked')).toHaveClass('action--locked');

    const props3 = { ...defaultProps, challenge: { completed: true } };
    rerender(
      <EventProvider>
        <Challenge {...props3} />
      </EventProvider>
    );
    expect(getByText('Completed!')).toBeInTheDocument();
    expect(getByText('Completed!')).toHaveClass('action--completed');
  });

  test('it renders with disabled class if paused', () => {
    const { container } = render(
      <EventProvider defaultOverrides={{ status: 3 }}>
        <Challenge {...defaultProps} />
      </EventProvider>
    );
    expect(container.firstChild).toHaveClass('challenge--disabled');
  });

  test('it only renders with tilt class if grid view', () => {
    const { container, rerender } = render(
      <EventProvider>
        <Challenge {...defaultProps} />
      </EventProvider>
    );
    expect(container.firstChild).toHaveClass('js-tilt');

    const props = { ...defaultProps, view: 'list' };
    rerender(
      <EventProvider>
        <Challenge {...props} />
      </EventProvider>
    );
    expect(container.firstChild).not.toHaveClass('js-tilt');
  });

  test('it only renders with tilt class if challenge is not locked', () => {
    const { container, rerender } = render(
      <EventProvider>
        <Challenge {...defaultProps} />
      </EventProvider>
    );
    expect(container.firstChild).toHaveClass('js-tilt');

    const props = { ...defaultProps, challenge: { locked: true } };
    rerender(
      <EventProvider>
        <Challenge {...props} />
      </EventProvider>
    );
    expect(container.firstChild).not.toHaveClass('js-tilt');
  });

  test('it only renders with tilt class if challenge is not completed', () => {
    const { container, rerender } = render(
      <EventProvider>
        <Challenge {...defaultProps} />
      </EventProvider>
    );
    expect(container.firstChild).toHaveClass('js-tilt');

    const props = { ...defaultProps, challenge: { completed: true } };
    rerender(
      <EventProvider>
        <Challenge {...props} />
      </EventProvider>
    );
    expect(container.firstChild).not.toHaveClass('js-tilt');
  });
});

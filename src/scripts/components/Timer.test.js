import React from 'react';
import { render } from '@testing-library/react';
import addDays from 'date-fns/addDays';
import '@testing-library/jest-dom/extend-expect';
import Timer from './Timer';

const defaultProps = {
  start: new Date(),
  end: addDays(new Date(), 1),
  large: false,
  onEnd() {},
};

describe('Timer component', () => {
  test('it renders', async () => {
    const { container } = render(<Timer {...defaultProps} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  test('it renders a large timer', async () => {
    const props = { ...defaultProps, large: true };

    render(<Timer {...props} />);

    expect(document.querySelector('.time')).toHaveClass('time--large');
  });
});

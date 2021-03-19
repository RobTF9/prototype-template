import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Bar from '.';

const defaultProps = {
  progress: 50,
};

describe('Bar component', () => {
  test('it renders', async () => {
    const { container } = render(<Bar {...defaultProps} />);
    expect(container.firstChild).toBeInTheDocument();
    expect(document.querySelector('.completed')).toHaveStyle('width: 50%');
  });

  test('it renders with severity class', async () => {
    const props = { ...defaultProps, severity: 'positive' };
    render(<Bar {...props} />);
    expect(document.querySelector('.core-bar')).toHaveClass(
      'core-bar--positive'
    );
  });

  test('it renders with taller class', async () => {
    const props = { ...defaultProps, taller: true };
    render(<Bar {...props} />);
    expect(document.querySelector('.core-bar')).toHaveClass('core-bar--taller');
  });

  test('it renders with bottom class', async () => {
    const props = { ...defaultProps, bottom: true };
    render(<Bar {...props} />);
    expect(document.querySelector('.core-bar')).toHaveClass('core-bar--bottom');
  });
});

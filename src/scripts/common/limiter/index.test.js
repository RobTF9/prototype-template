import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import { getByText } from '@testing-library/dom';
import limiter from './index';
import getHTML from './limiter.fixture';

describe('limiter', () => {
  test('it shows the initial limit on an input with a javascript-limiter-input class and a limit set in a data attr', async () => {
    document.body.innerHTML = getHTML({ limit: 50 });

    limiter();

    const count = getByText(document.body, '50');

    expect(count).toBeInTheDocument();
    expect(count).toHaveClass('limiter-count');
  });

  test('it shows the count with a warning colour at 50% of limit', async () => {
    document.body.innerHTML = getHTML({ limit: 30 });

    limiter();

    const input = document.querySelector('.javascript-limiter-input');
    const count = document.querySelector('.limiter-count');
    // Initially, don't expect the count to have a the warning class
    expect(count).not.toHaveClass('limiter-count--warning');

    // Type 15 chars (50% of limit)
    userEvent.type(input, '123456789012345');

    // Expect the warning class to be added
    expect(count).toHaveClass('limiter-count--warning');
  });

  test('it shows the count with a warning colour at 50% of limit', async () => {
    document.body.innerHTML = getHTML({ limit: 10 });

    limiter();

    const input = document.querySelector('.javascript-limiter-input');
    const count = document.querySelector('.limiter-count');
    // Initially, don't expect the count to have a the warning class
    expect(count).not.toHaveClass('limiter-count--warning');

    // Type 5 chars (50% of limit)
    userEvent.type(input, '12345');

    // Expect the warning class to be added
    expect(count).toHaveClass('limiter-count--warning');
    expect(count.textContent).toBe('5');
  });

  test('it shows the count with a warning colour if under the warning limit of 25', async () => {
    document.body.innerHTML = getHTML({ limit: 60 });

    limiter();

    const input = document.querySelector('.javascript-limiter-input');
    const count = document.querySelector('.limiter-count');
    // Initially, don't expect the count to have a the warning class
    expect(count).not.toHaveClass('limiter-count--warning');

    // Type 35 chars (When only 25 chars allowed left)
    userEvent.type(input, '12345678901234567890123456789012345');

    // Expect the warning class to be added
    expect(count).toHaveClass('limiter-count--warning');
    expect(count.textContent).toBe('25');
  });

  test('it removes the warning class when going below warning limit', async () => {
    document.body.innerHTML = getHTML({ limit: 10, value: '12345' });

    limiter();

    const input = document.querySelector('.javascript-limiter-input');
    const count = document.querySelector('.limiter-count');
    // Initially, don't expect the count to have a the warning class
    expect(count).toHaveClass('limiter-count--warning');

    // Type a character (replaces current value of '12345')
    userEvent.type(input, '1');

    // Expect the warning class to be added
    expect(count).not.toHaveClass('limiter-count--warning');
  });

  test('it ', async () => {
    document.body.innerHTML = getHTML({ limit: 10 });

    limiter();

    const input = document.querySelector('.javascript-limiter-input');
    const count = document.querySelector('.limiter-count');

    // Type 11 characters
    userEvent.type(input, '12345678901');

    // Expect the input to be limited to 10 chars and the danger class to be added to the count
    expect(input.value).toBe('1234567890');
    expect(count.textContent).toBe('0');
    expect(count).toHaveClass('limiter-count--danger');
  });
});

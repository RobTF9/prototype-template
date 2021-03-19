import '@testing-library/jest-dom/extend-expect';
import { getByLabelText, fireEvent } from '@testing-library/dom';
import toggleFields from './index';
import html from './toggleFields.fixture';

describe('toggleFields', () => {
  test('it shows and hides team chat options', async () => {
    document.body.innerHTML = html;
    const teamChat = document.querySelector('.js-team-chat');
    // Expect team chat is not visible to begin with
    expect(teamChat).toHaveClass('helper-hidden');
    // Attach the event handler to test
    toggleFields();

    // Click teams radio input
    fireEvent.click(getByLabelText(document, 'Teams'));
    // Expect team chat options to be visible now
    expect(teamChat).not.toHaveClass('helper-hidden');

    // Click individual radio input
    fireEvent.click(getByLabelText(document, 'Individual'));
    // Expect team chat options to be hidden again
    expect(teamChat).toHaveClass('helper-hidden');
  });

  test('it shows and hides duration fields', async () => {
    document.body.innerHTML = html;
    const duration = document.querySelector('.js-participation-duration');

    // Expect team chat is not visible to begin with
    expect(duration).toHaveClass('helper-hidden');

    // Attach the event handler to test
    toggleFields();

    // Click individual limited radio input
    fireEvent.click(getByLabelText(document, 'Individual limited'));
    // Expect team chat options to be visible now
    expect(duration).not.toHaveClass('helper-hidden');

    // Click individual radio input
    fireEvent.click(getByLabelText(document, 'Individual'));
    // Expect team chat options to be hidden again
    expect(duration).toHaveClass('helper-hidden');
  });
});

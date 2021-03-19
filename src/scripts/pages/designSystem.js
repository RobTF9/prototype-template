/* eslint-disable no-unused-vars */
import flatpickr from 'flatpickr';
import Expanding from 'expanding-textareas';
import limiter from '../common/limiter';
import parseMarkdown from '../common/parseMarkdown';
import timer from '../common/timer';

// Run limiter function to set limits on inputs
limiter();

// Expanding textareas
const textareas = document.querySelectorAll('.javascript-expanding-textarea');
textareas.forEach(textarea => {
  const expanding = new Expanding(textarea);
});

// Run timer function
timer();

// Markdown preview
const tabs = document.querySelector('.javascript-tabbed-textarea');
if (tabs) {
  const markdown = tabs.querySelector('.javascript-markdown');
  const preview = tabs.querySelector('.js-preview');

  const handleChange = ({ target: { value } }) => {
    if (value === 'preview' && markdown.value) {
      preview.innerHTML = parseMarkdown(markdown.value);
    }
  };

  tabs.addEventListener('change', handleChange);
}

// Run flatpickr for date selector
const flatPickrFields = document.querySelectorAll('.js-flatpickr');

flatPickrFields.forEach(field => {
  flatpickr(field, {
    enableTime: true,
    altInput: true,
    altFormat: 'F j, Y H:i',
    dateFormat: 'Y-m-d H:i',
    time_24hr: true,
    minDate: 'today',
  });
});

// Open and close the frame drawer.
document
  .querySelector('.javascript-frame-drawer-toggle')
  .addEventListener('click', function() {
    // Toggle open class on frame.
    document.querySelector('.frame').classList.toggle('frame--drawer-open');

    // Toggle text.
    this.textContent = this.textContent === 'Close' ? 'Open' : 'Close';

    return false;
  });

// Open and close a set of links in the library menu.
const linkSets = document.querySelectorAll(
  '.javascript-library-menu-links-toggle'
);

linkSets.forEach(linkSet => {
  linkSet.addEventListener('click', function() {
    // Toggle open class on links.
    this.parentNode.parentNode
      .querySelector('.links')
      .classList.toggle('links--open');

    // Toggle closed class on toggle.
    this.classList.toggle('toggle--closed');

    return false;
  });
});

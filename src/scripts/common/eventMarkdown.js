/* eslint-disable no-unused-vars */
import Expanding from 'expanding-textareas';
import parseMarkdown from './parseMarkdown';

export default () => {
  // Expanding textarea
  const textarea = document.querySelector('.javascript-expanding-textarea');
  const expanding = new Expanding(textarea);

  // Markdown preview
  const tabs = document.querySelector('.javascript-tabbed-textarea');
  const preview = tabs.querySelector('.js-preview');

  const updatePreview = () => {
    preview.innerHTML = parseMarkdown(textarea.value);
  };

  updatePreview();

  const handleChange = ({ target }) => {
    if (target.value === 'preview' && textarea.value) {
      updatePreview();
    }
  };

  tabs.addEventListener('change', handleChange);
};

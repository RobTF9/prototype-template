/* eslint-disable no-unused-vars */
/* global packageId, csrf_name, csrf_value */
import Expanding from 'expanding-textareas';
import limiter from '../../common/limiter';
import fileUpload from '../../common/fileUpload';
import parseMarkdown from '../../common/parseMarkdown';
import jsonRequest from '../../common/jsonRequest';

// Run limiter function to set limits on inputs
limiter();

// Run fileUpload function
fileUpload();

// Expanding textarea
const textarea = document.querySelector('.javascript-expanding-textarea');
const expanding = new Expanding(textarea);

// Markdown preview
const tabs = document.querySelector('.javascript-tabbed-textarea');
const preview = tabs.querySelector('.js-preview');

const handleChange = ({ target: { value } }) => {
  if (value === 'preview' && textarea.value) {
    preview.innerHTML = parseMarkdown(textarea.value);
  }
};

// Title duplication
const shortTitle = document.querySelector('input#short_title');
const longTitle = document.querySelector('input#long_title');

const handleBlur = ({ target: { value } }) => {
  if (!longTitle.value) {
    longTitle.value = value;
  }
};

// Add event listeners
tabs.addEventListener('change', handleChange);
shortTitle.addEventListener('blur', handleBlur);

// Set points after difficulty if not already specified
const difficultyPointMap = {
  Introductory: 50,
  Easy: 100,
  Medium: 250,
  Hard: 500,
  Extreme: 1000,
};

const points = document.getElementById('points');

points.addEventListener('focus', ({ target }) => {
  if (target.value !== '') {
    return;
  }

  const selectedDifficulty = document.querySelector(
    'input[name=difficulty]:checked'
  );

  if (selectedDifficulty === null) {
    return;
  }

  target.value = difficultyPointMap[selectedDifficulty.value];
});

const flag = document.getElementById('flag');
const flagMode = document.getElementById('flag_mode');

flag.addEventListener('focus', ({ target }) => {
  if (target.value !== '') {
    return;
  }

  const regex = '3';
  if (flagMode.value === regex) {
    target.value = '//';
  }
});

const testFlagWrapper = document.getElementById('js-test-flag');
const testFlagButton = document.getElementById('test_flag_button');

if (testFlagButton) {
  const testFlagInput = document.getElementById('test_flag');
  const flagTestResult = document.getElementById('flag-test-result');

  const reset = () => {
    testFlagInput.classList.remove(
      'input-text--positive',
      'input-text--danger'
    );
    flagTestResult.innerText = '';
    flagTestResult.classList.remove('tip--positive', 'tip--danger');
  };

  const submit = () => {
    reset();
    testFlagButton.disabled = true;

    const formData = new FormData(document.getElementById('form'));

    jsonRequest(`/api/package/${packageId}/test-flag`, {
      method: 'POST',
      body: formData,
    })
      .then(r => r.json())
      .then(body => {
        if (body.errors) {
          testFlagInput.classList.add('input-text--danger');
          flagTestResult.innerText = body.errors.join(', ');
          flagTestResult.classList.add('tip--danger');
          return;
        }

        const { matches } = body;

        if (matches) {
          testFlagInput.classList.add('input-text--positive');
          flagTestResult.innerText = 'Flag matched your configuration';
          flagTestResult.classList.add('tip--positive');
        } else {
          testFlagInput.classList.add('input-text--danger');
          flagTestResult.innerText = 'Flag did not match your configuration';
          flagTestResult.classList.add('tip--danger');
        }
      })
      .then(() => {
        testFlagButton.disabled = false;
      });
  };

  testFlagButton.addEventListener('click', submit);
  testFlagInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      submit();
    }
  });

  testFlagInput.addEventListener('input', reset);
}

const acknowledgedWrapper = document.getElementById('acknowledged-text-field');
const flagTip = document.getElementById('flag-tip');

const addAcknowledgedFields = () => {
  // Acknowledged
  acknowledgedWrapper.classList.remove('helper-hidden');

  // Flag
  flag.readOnly = true;
  flag.classList.add('input-text--disabled');

  // Flag tip
  flagTip.textContent =
    'Acknowledge answers do not use a flag. The player will be presented with a confirmation button';
  flagTip.classList.add('tip--warning');

  // Test flag
  testFlagWrapper.classList.add('helper-hidden');
};

const prefixWrapper = document.getElementById('prefix-field');
const prefix = document.getElementById('flag_metadata[prefix]');
const flagPreviewWrapper = document.getElementById('flag-preview-field');

const addPrefixedFields = () => {
  // Prefix
  prefixWrapper.classList.remove('helper-hidden');
  prefix.classList.remove('input-text--disabled');
  prefix.disabled = false;

  // Preview
  flagPreviewWrapper.classList.remove('helper-hidden');

  // Flag tip
  flagTip.textContent = 'The part inside the brackets';
};

const flagPreview = document.getElementById('flag-preview');

const updateFlagPreview = () => {
  flagPreview.value = `${prefix.value}{${flag.value}}`;
};

prefix.addEventListener('input', updateFlagPreview);
flag.addEventListener('input', updateFlagPreview);

const multipleChoiceContainer = document.getElementById(
  'multiple-choice-container'
);
const flagMetadata = JSON.parse(document.getElementById('flag-metadata').value);

const addChoice = choice => {
  // Add choice to select
  const flagSelect = document.getElementById('flag-select');

  const option = document.createElement('option');
  option.classList.add('select-option');
  option.textContent = choice;
  option.value = choice;

  if (flag.value === choice) {
    option.selected = true;
  }

  flagSelect.appendChild(option);

  // Add choice input
  const compact = document.createElement('div');
  compact.classList.add('compact');

  const field = document.createElement('div');
  field.classList.add('field');

  const input = document.createElement('input');
  input.name = `flag_metadata[choices][]`;
  input.classList.add('input-text', 'input-text--shallow', 'js-choice');
  input.value = choice || '';
  field.appendChild(input);

  input.addEventListener('input', () => {
    option.textContent = input.value;
    option.value = input.value;
  });

  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const newInput = addChoice();
      newInput.focus();
    }
  });

  const removeButton = document.createElement('button');
  removeButton.classList.add(
    'core-button',
    'core-button--smallest',
    'core-button--compact',
    'core-button--danger'
  );
  removeButton.textContent = 'Remove';
  removeButton.type = 'button';

  removeButton.addEventListener('click', e => {
    e.preventDefault();
    compact.remove();
    option.remove();
  });

  compact.appendChild(field);
  compact.appendChild(removeButton);
  multipleChoiceContainer.insertBefore(
    compact,
    document.getElementById('add-answer')
  );

  return input;
};

const flagSelectWrapper = document.getElementById('flag-select-wrapper');
const flagField = document.getElementById('flag-field');

const addMultipleChoiceFields = () => {
  // Change flag to select
  const field = document.createElement('div');
  field.classList.add('field');

  const label = document.createElement('label');
  label.classList.add('label');
  label.htmlFor = 'flag-select';
  label.innerText = 'Correct answer';

  const selectDiv = document.createElement('div');
  selectDiv.classList.add('select');

  const select = document.createElement('select');
  select.classList.add('select--single');
  select.name = 'flag';
  select.id = 'flag-select';

  const selectArrow = document.createElement('img');
  selectArrow.classList.add('select-icon');
  selectArrow.src = '/assets/images/chevron.svg';

  selectDiv.appendChild(select);
  selectDiv.appendChild(selectArrow);

  field.appendChild(label);
  field.appendChild(selectDiv);
  flagSelectWrapper.appendChild(field);

  // Hide previous flag input
  flagField.classList.add('helper-hidden');
  flag.disabled = true;

  // Add random option
  const checkboxWrapper = document.createElement('div');
  checkboxWrapper.classList.add('checkbox', 'field');

  const checkboxInput = document.createElement('input');
  checkboxInput.classList.add('checkbox-input');
  checkboxInput.name = 'flag_metadata[random]';
  checkboxInput.id = 'random-order';
  checkboxInput.type = 'checkbox';
  checkboxInput.checked = !!flagMetadata.random;

  const checkboxLabel = document.createElement('label');
  checkboxLabel.classList.add('checkbox-label');
  checkboxLabel.htmlFor = 'random-order';
  checkboxLabel.textContent = 'Display answers in a random order';

  checkboxWrapper.appendChild(checkboxInput);
  checkboxWrapper.appendChild(checkboxLabel);
  multipleChoiceContainer.appendChild(checkboxWrapper);

  // Add options
  if (flagMetadata.choices) {
    flagMetadata.choices.forEach(choice => {
      addChoice(choice);
    });
  } else {
    addChoice();
  }

  // Add "add answer"
  const addButton = document.createElement('button');
  addButton.textContent = 'Add answer';
  addButton.id = 'add-answer';
  addButton.classList.add('core-button', 'core-button--quiet-emphasis');
  addButton.type = 'button';
  multipleChoiceContainer.appendChild(addButton);

  addButton.addEventListener('click', e => {
    e.preventDefault();
    const input = addChoice();
    input.focus();
  });
};

const flagMatcher = document.createElement('div');
flagMatcher.className = 'tip flagMatcher';
flag.parentNode.insertBefore(flagMatcher, flag.nextSibling);

const checkFlagPattern = () => {
  flagMatcher.classList.remove('tip--warning');
  flagMatcher.textContent = '';
  if (flag.pattern && flag.validity.patternMismatch) {
    flagMatcher.classList.add('tip--warning');
    flagMatcher.textContent = `Flag is invalid: *${flag.title}*`;
  }
};

flag.addEventListener('focusout', checkFlagPattern);

const resetFlagModeFields = () => {
  //
  // Prefixed reset
  //

  // Hide prefix
  prefixWrapper.classList.add('helper-hidden');
  prefix.classList.add('input-text--disabled');
  prefix.disabled = true;

  // Hide preview
  flagPreviewWrapper.classList.add('helper-hidden');

  // Reset flag tip
  flagTip.textContent =
    'This is the thing players need to submit to score the challenge';
  flagTip.classList.remove('tip--warning');

  //
  // Multiple choice reset
  //

  // Hide flag select
  flagSelectWrapper.innerHTML = '';

  // Re-enable flag
  flagField.classList.remove('helper-hidden');
  flag.disabled = false;

  // Remove options and "add answer" for multiple choice
  multipleChoiceContainer.innerHTML = '';

  //
  // Acknowledged reset
  //

  // Hide button text
  acknowledgedWrapper.classList.add('helper-hidden');

  // Show test flag
  testFlagWrapper.classList.remove('helper-hidden');

  // Enable flag
  flag.readOnly = false;
  flag.classList.remove('input-text--disabled');

  // Set limit, maxlength and pattern
  const { limit, pattern, errormessage } = flagMode.options[
    flagMode.selectedIndex
  ].dataset;
  flag.dataset.limit = limit;
  flag.maxLength = limit;

  if (pattern) {
    flag.pattern = pattern;
  } else {
    flag.removeAttribute('pattern');
  }

  if (errormessage) {
    flag.title = errormessage;
  } else {
    flag.removeAttribute('title');
  }

  checkFlagPattern();
};

const updateFlagModeFields = () => {
  const prefixed = '7';
  const multipleChoice = '8';
  const acknowledged = '9';

  resetFlagModeFields();

  switch (flagMode.value) {
    case prefixed:
      addPrefixedFields();
      break;
    case multipleChoice:
      addMultipleChoiceFields();
      break;
    case acknowledged:
      addAcknowledgedFields();
      break;
    // no default
  }
};

updateFlagModeFields();

flagMode.addEventListener('change', updateFlagModeFields);

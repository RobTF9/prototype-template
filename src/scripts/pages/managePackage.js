/* global csrf_name, csrf_value, packageData */
/* eslint-disable no-new */
import Sortable from 'sortablejs';
import jsonRequest from '../common/jsonRequest';

const challengeGroups = document.querySelector('.js-challenge-groups');
const challenges = document.querySelectorAll('.js-challenges');
const noChallenges = document.querySelectorAll('.js-no-challenges');
const error = document.querySelector('.js-error');
const retry = document.querySelector('.js-retry-update-order');

const showError = () => {
  error.classList.remove('helper-hidden');
};

const hideError = () => {
  error.classList.add('helper-hidden');
};

// Get challenge order and send to backend to save
const updateOrder = () => {
  // Hide error if it's visible
  hideError();

  // Add/Remove 'No challenges...' note from groups
  [...noChallenges].forEach(noChallenge => {
    if (noChallenge.parentNode.children.length > 1) {
      noChallenge.classList.add('helper-hidden');
      return;
    }
    noChallenge.classList.remove('helper-hidden');
  });

  // Add/Remove first group timed warning from group
  const [firstChallengeGroup, ...rest] = challengeGroups.children;
  // Add to first if timed and not already there
  const opening = firstChallengeGroup.querySelector('.js-opening');
  if (
    firstChallengeGroup.dataset.unlock === 'timed' &&
    !firstChallengeGroup.querySelector('.js-first-timed-warning')
  ) {
    const el = document.createElement('div');
    el.className =
      'info core-text core-text--tertiary core-text--warning js-first-timed-warning';
    el.textContent =
      "This challenge group has a timed unlock and won't be available at the start of an event.";
    firstChallengeGroup.insertBefore(el, opening.nextSibling);
  }
  // Remove from rest
  rest.forEach(group => {
    const warning = group.querySelector('.js-first-timed-warning');

    if (warning) {
      group.removeChild(warning);
    }
  });

  // Get order of groups and challenges
  const order = [...challengeGroups.children].map(group => ({
    id: group.id,
    challenges: [...group.querySelector('.js-challenges').children]
      .filter(node => node.id !== '')
      .map(challenge => ({
        id: challenge.id,
      })),
  }));

  // Send order to endpoint to save
  jsonRequest(
    `/api/organisation/${packageData.organisationId}/package/${packageData.id}/updateChallengeOrder`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        order,
        csrf_name,
        csrf_value,
      }),
    }
  )
    .then(j => j.json())
    .then(data => {
      if (data !== 'success') {
        showError();
      }
    })
    .catch(error => {
      showError();
    });
};

const commonOptions = {
  handle: '.grabber',
  animation: 300,
  group: 'challengeGroups',
  fallbackOnBody: true,
  invertSwap: true,
  direction: 'vertical',
  onEnd: updateOrder,
};

// Sortable drag and drop group for challengeGroups
new Sortable(challengeGroups, {
  ...commonOptions,
  group: 'challengeGroups',
});

// Sortable drag and drop group for challenges
[...challenges].forEach(challenge => {
  new Sortable(challenge, {
    ...commonOptions,
    group: 'challenges',
  });
});

// Add click event handler for retry link
retry.addEventListener('click', e => {
  e.preventDefault();
  updateOrder();
});

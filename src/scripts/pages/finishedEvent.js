const viewLinks = document.querySelectorAll('.js-view-link');
const challengeGroups = document.querySelectorAll('.js-challenges');
const leaderBoardToggles = document.querySelectorAll(
  '.javascript-leaderboard-team-toggle'
);

const handleViewChange = event => {
  event.preventDefault();

  // If view already selected
  if (event.target.classList.contains('core-link--selected')) {
    return;
  }

  // Toggle selected link
  [...viewLinks].forEach(link => {
    link.classList.toggle('core-link--selected');
  });

  // Toggle challenge classes
  [...challengeGroups].forEach(challengeGroup => {
    [...challengeGroup.children].forEach(challenge => {
      challenge.classList.toggle('challenge--grid');
      challenge.classList.toggle('challenge--row');
      challenge.classList.toggle('layout');
      challenge.classList.toggle('layout--third');
    });
  });
};

const handleTeamToggle = e => {
  e.preventDefault();
  const link = e.target.tagName === 'SPAN' ? e.target.parentNode : e.target;

  // Toggle hidden class on team.
  link.parentNode.parentNode
    .querySelector('.team')
    .classList.toggle('helper-hidden');

  // Toggle open class on subject.
  link.parentNode.classList.toggle('subject--open');
};

[...viewLinks].forEach(link => {
  link.addEventListener('click', handleViewChange);
});

[...leaderBoardToggles].forEach(toggle => {
  toggle.addEventListener('click', handleTeamToggle);
});

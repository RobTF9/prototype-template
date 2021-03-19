const leaderBoardToggles = document.querySelectorAll(
  '.javascript-leaderboard-team-toggle'
);

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

[...leaderBoardToggles].forEach(toggle => {
  toggle.addEventListener('click', handleTeamToggle);
});

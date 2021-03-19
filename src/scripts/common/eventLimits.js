export default () => {
  const maxTeams = document.querySelector('.js-max-teams');
  const maxPlayersPerTeam = document.querySelector('.js-max-players-per-team');
  const participationModeEl = document.querySelector('.js-participation');

  const TEAM_PARTICIPATION = '2';

  // Initial values
  let participationMode = document.querySelector(
    'input[name="participation_mode"]:checked'
  ).value;

  const enable = e => {
    e.classList.remove('helper-hidden');
    const input = e.querySelector('.input-text');
    if (input === null) return;
    input.classList.remove('input-text--disabled');
    input.disabled = false;
  };

  const disable = e => {
    e.classList.add('helper-hidden');
    const input = e.querySelector('.input-text');
    if (input === null) return;
    input.classList.add('input-text--disabled');
    input.disabled = true;
  };

  const render = () => {
    // If Open and Team, show all limit inputs
    if (participationMode === TEAM_PARTICIPATION) {
      enable(maxTeams);
      enable(maxPlayersPerTeam);
    } else {
      disable(maxTeams);
      disable(maxPlayersPerTeam);
    }
  };

  // Add event listeners
  participationModeEl.addEventListener('change', ({ target: { value } }) => {
    participationMode = value;
    render();
  });
};

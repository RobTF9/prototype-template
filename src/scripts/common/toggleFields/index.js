import { participationMode } from '../enums';

export default () => {
  const participationModeParent = document.querySelector('.js-participation');
  const teamChat = document.querySelector('.js-team-chat');
  const duration = document.querySelector('.js-participation-duration');

  const toggleTeamChat = toggle => {
    if (teamChat === null) {
      return;
    }

    if (toggle === 'show') {
      teamChat.classList.remove('helper-hidden');
      return;
    }
    teamChat.classList.add('helper-hidden');
  };

  const toggleDuration = toggle => {
    if (duration === null) {
      return;
    }

    if (toggle === 'show') {
      duration.classList.remove('helper-hidden');
      return;
    }
    duration.classList.add('helper-hidden');
  };

  const handleChange = ({ target: { value } }) => {
    switch (value) {
      case `${participationMode.INDIVIDUAL}`: {
        toggleTeamChat('hide');
        toggleDuration('hide');
        break;
      }
      case `${participationMode.TEAM}`: {
        toggleTeamChat('show');
        toggleDuration('hide');
        break;
      }
      case `${participationMode.INDIVIDUAL_LIMITED}`: {
        toggleTeamChat('hide');
        toggleDuration('show');
        break;
      }
      default:
        break;
    }
  };

  participationModeParent.addEventListener('change', handleChange);
};

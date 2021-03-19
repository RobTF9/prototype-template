/* global organisationId, packageId, csrf_name, csrf_value */
import jsonRequest from '../common/jsonRequest';

const packageFiles = document.querySelector('.js-package-files');
const deleteFileLinks = document.querySelectorAll('.js-delete-file');
const deleteSignalError = document.querySelector('.js-delete-signal-error');

const showErrorSignal = () => {
  deleteSignalError.classList.remove('helper-hidden');
};

const hideErrorSignal = () => {
  deleteSignalError.classList.add('helper-hidden');
};

deleteFileLinks.forEach(link => {
  link.addEventListener('click', async e => {
    e.preventDefault();
    hideErrorSignal();

    // Get fileID
    const actionEl = e.target.parentNode.parentNode;
    const rowEl = actionEl.parentNode;
    const fileID = actionEl.id.substr(actionEl.id.indexOf('-') + 1);

    // Delete request
    try {
      const response = await jsonRequest(
        `/api/organisation/${organisationId}/package/${packageId}/file/${fileID}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            csrf_name,
            csrf_value,
          }),
        }
      );
      const data = await response.json();

      if (data === 'success') {
        // Remove file from UI
        rowEl.parentNode.removeChild(rowEl);

        // If no files left, show no files yet message
        if (packageFiles.children.length === 1) {
          const noFilesEl = document.querySelector('.js-no-files');
          noFilesEl.style.display = 'block';
        }
      } else {
        showErrorSignal();
      }
    } catch (error) {
      showErrorSignal();
    }
  });
});

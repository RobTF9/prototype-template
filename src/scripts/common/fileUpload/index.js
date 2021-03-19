/* global organisationId, packageId, csrf_name, csrf_value */
import Uppy from '@uppy/core';
import XHRUpload from '@uppy/xhr-upload';
import DragDrop from '@uppy/drag-drop';

export default () => {
  const files = document.querySelector('.js-uploaded-files');
  const uppy = new Uppy({ debug: false, autoProceed: true });

  function sanitize(str) {
    const temp = document.createElement('div');
    temp.textContent = str;
    return temp.innerHTML;
  }

  function hideNoFilesMessage() {
    // Hide no files message if it exists
    const noFilesEl = document.querySelector('.js-no-files');
    noFilesEl.style.display = 'none';
  }

  function addFileUI({ id, name, uploaded = false }) {
    const markup = `
      <div class="info layout layout--two-thirds-left" id="info-${sanitize(
        id
      )}">
          <div class="detail core-text">${sanitize(name)}</div>
          <div class="detail core-text core-text--tertiary core-text--${
            uploaded ? 'positive' : 'warning'
          } js-percent">
            ${uploaded ? 'File added' : 'Uploading: 0%'}
          </div>
      </div>

      <div class="actions layout layout--one-third-right" id="actions-${sanitize(
        id
      )}">
          <div class="action progress" ${
            uploaded ? 'style="display: none;"' : ''
          }>
            <img src="/assets/images/spinner.svg" class="image" alt="Loading Spinner">
          </div>

          <div class="action download" style="display: none;">
            <a href="#" class="core-link">Download</a>
          </div>

          <div class="action js-retry-upload" style="display: none;">
            <button type="button" class="core-link">Retry</button>
          </div>

          <div class="action js-download-file" style="display: none;">
            <a class="core-link" href="#" id="download-${sanitize(
              id
            )}">Download</a>
          </div>

          <div class="action js-remove-upload" ${
            uploaded ? '' : 'style="display: none;"'
          }>
            <button type="button" class="core-link core-link--danger">Remove</button>
          </div>
      </div>

      ${
        uploaded
          ? `<input type="hidden" name="files[]" value="${sanitize(id)}">`
          : ''
      }
  `;

    const el = document.createElement('div');
    el.classList = 'row layout-container';
    el.innerHTML = markup;

    files.appendChild(el);
  }

  uppy.on('file-added', file => {
    // Add CSRF name and value to request
    uppy.setFileMeta(file.id, {
      csrf_name,
      csrf_value,
    });

    // Disable form button when a new file is added
    const button = document.querySelector('input[type="submit"]');
    button.disabled = true;
  });

  uppy.on('upload', ({ fileIDs }) => {
    hideNoFilesMessage();

    // Add each file to UI
    fileIDs.forEach(fileID => {
      const file = uppy.getFile(fileID);

      if (!document.getElementById(`info-${fileID}`)) {
        addFileUI({ name: file.name, id: file.id });
      }
    });
  });

  uppy.on('upload-progress', (file, progress) => {
    const percentEl = document
      .getElementById(`info-${file.id}`)
      .querySelector('.js-percent');

    const percent = (progress.bytesUploaded / progress.bytesTotal) * 100;
    percentEl.textContent = `Uploading: ${Math.round(percent)}%`;
  });

  uppy.on('upload-success', (file, response) => {
    const infoEl = document.getElementById(`info-${file.id}`);

    //  Add hidden input for challenge form
    const { id } = response.body;
    const inputEl = document.createElement('input');
    inputEl.type = 'hidden';
    inputEl.name = 'files[]';
    inputEl.value = id;
    infoEl.parentNode.appendChild(inputEl);

    const downloadEl = document.getElementById(`download-${file.id}`);
    downloadEl.href = `/file/${id}`;

    // Add completed note to UI
    const messageEl = document.createElement('div');
    messageEl.classList =
      'detail core-text core-text--tertiary core-text--positive';
    messageEl.textContent = 'Upload complete';
    infoEl.querySelector('.js-percent').remove();
    infoEl.append(messageEl);

    // Show/hide relevant actions
    const actionsEl = document.getElementById(`actions-${file.id}`);
    actionsEl.querySelector('.progress').style.display = 'none';
    actionsEl.querySelector('.js-retry-upload').style.display = 'none';
    actionsEl.querySelector('.js-remove-upload').style.display = 'inline-block';
    actionsEl.querySelector('.js-download-file').style.display = 'inline-block';
  });

  uppy.on('upload-error', (file, error, response) => {
    // Add failed note to UI
    const infoEl = document.getElementById(`info-${file.id}`);
    const messageEl = document.createElement('div');
    messageEl.classList =
      'detail core-text core-text--tertiary core-text--danger';
    messageEl.textContent = 'Upload failed';
    infoEl.querySelector('.js-percent').style.display = 'none';
    infoEl.append(messageEl);

    // Show/hide relevant actions
    const actionsEl = document.getElementById(`actions-${file.id}`);
    actionsEl.querySelector('.progress').style.display = 'none';
    actionsEl.querySelector('.js-retry-upload').style.display = 'inline-block';
    actionsEl.querySelector('.js-remove-upload').style.display = 'inline-block';
    actionsEl.querySelector('.js-download-file').style.display = 'none';
  });

  uppy.on('complete', () => {
    // Enable form button when all uploads complete
    const button = document.querySelector('input[type="submit"]');
    button.disabled = false;
  });

  // Initialise Uppy plugins
  uppy
    .use(DragDrop, {
      target: '.js-DragDrop',
    })
    .use(XHRUpload, {
      endpoint: `/organisation/${organisationId}/package/${packageId}/upload-file`,
      formData: true,
      fieldName: 'file',
    });

  // Remove name from Uppy file input so it's not included in form data
  const uppyFileInput = document.querySelector('.uppy-DragDrop-input');
  uppyFileInput.name = '';

  // Event listener for Remove, Retry and Download clicks
  files.addEventListener('click', event => {
    const { target } = event;

    // Allow file download links to be clicked
    if (![...target.parentNode.classList].includes('js-download-file')) {
      event.preventDefault();
    }

    if ([...target.parentNode.classList].includes('js-retry-upload')) {
      // Get fileID
      const actionEl = target.parentNode.parentNode;
      const fileID = actionEl.id.substr(actionEl.id.indexOf('-') + 1);

      // Show uploading in info
      const infoEl = document.getElementById(`info-${fileID}`);
      infoEl.removeChild(infoEl.lastChild);
      infoEl.querySelector('.js-percent').textContent = 'Uploading: 0%';
      infoEl.querySelector('.js-percent').style.display = 'block';

      // Show/hide relevant actions
      const actionsEl = document.getElementById(`actions-${fileID}`);
      actionsEl.querySelector('.progress').style.display = 'inline-block';
      actionsEl.querySelector('.js-retry-upload').style.display = 'none';
      actionsEl.querySelector('.js-remove-upload').style.display = 'none';
      actionsEl.querySelector('.js-download-file').style.display = 'none';

      // Retry file upload
      uppy.retryUpload(fileID);
    }

    if ([...target.parentNode.classList].includes('js-remove-upload')) {
      // Get fileID
      const actionEl = target.parentNode.parentNode;
      const rowEl = actionEl.parentNode;
      const fileID = actionEl.id.substr(actionEl.id.indexOf('-') + 1);

      // Remove file upload
      if (uppy.getFile(fileID)) {
        uppy.removeFile(fileID);
      }

      // Remove file from UI
      rowEl.parentNode.removeChild(rowEl);

      // If no files left, show no files yet message
      if (document.querySelector('.js-uploaded-files').children.length === 1) {
        const noFilesEl = document.querySelector('.js-no-files');
        noFilesEl.style.display = 'block';
      }

      // Enable 'Add file' link if it exists
      const recentFileEl = document.getElementById(fileID);
      if (recentFileEl) {
        const link = recentFileEl.querySelector('.js-add-recent-file');
        link.disabled = false;
        link.classList.remove('core-link--disabled');
      }
    }
  });

  // Event listener for opening and closing recent files
  const recentFilesInput = document.getElementById('recent-files');
  const recentFilesLabel = document.querySelector('label[for="recent-files"]');
  if (recentFilesInput) {
    recentFilesInput.addEventListener('change', () => {
      if (recentFilesInput.checked) {
        recentFilesLabel.textContent = 'Hide recent files';
        return;
      }

      recentFilesLabel.textContent = 'Show recent files';
    });
  }

  // Event listener for recent files add clicks
  const recentFilesAddLinks = document.querySelectorAll('.js-add-recent-file');

  recentFilesAddLinks.forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();

      const row = event.target.parentNode.parentNode.parentNode;
      const name = row.querySelector('.detail').textContent;

      // Hide no files message if present
      hideNoFilesMessage();

      // Add file to Challenge files section
      addFileUI({ id: row.id, name, uploaded: true });

      // Disable 'Add file' link
      link.disabled = true;
      link.classList.add('core-link--disabled');
    });
  });
};

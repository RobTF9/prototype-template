import '@testing-library/jest-dom/extend-expect';
import fileUpload from './index';
import getHTML from './fileUpload.fixture';

describe('fileUpload', () => {
  beforeAll(() => {
    global.organisationId = '12345';
    global.packageId = '12345';
  });

  test('it initialises the drag and drop element', async () => {
    document.body.innerHTML = getHTML({});
    fileUpload();

    const dragDropEl = document.querySelectorAll('.uppy-DragDrop-container');
    expect(dragDropEl.length).toBe(1);
  });
});

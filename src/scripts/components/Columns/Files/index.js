import React from 'react';
import PropTypes from 'prop-types';
import {
  Wrapper,
  FilesWrapper,
  FileWrapper,
  Filename,
  Tip,
  Link,
} from './styles';

const Files = ({ files }) => (
  <Wrapper>
    <p className="core-text core-text--secondary">
      You’ll need these files for the event, download them now.
    </p>
    <FilesWrapper>
      {Object.values(files).map(file => (
        <FileWrapper key={file.id}>
          <Filename className="core-text core-text--secondary">
            {file.fileName}
          </Filename>
          {file.downloaded && (
            <Tip className="core-text core-text--tertiary">
              You’ve already downloaded this file
            </Tip>
          )}
          <Link
            href={file.link}
            className={`core-link ${
              file.downloaded ? 'core-link--quiet-emphasis' : ''
            }`}
          >
            Download
          </Link>
        </FileWrapper>
      ))}
    </FilesWrapper>
  </Wrapper>
);

Files.propTypes = {
  files: PropTypes.object,
};

export default Files;

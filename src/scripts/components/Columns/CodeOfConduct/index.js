import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import parseMarkdown from '../../../common/parseMarkdown';

const Wrapper = styled.div`
  padding-top: 10px;
`;

const CodeOfConduct = ({ markdown }) => (
  <Wrapper
    // eslint-disable-next-line react/no-danger
    dangerouslySetInnerHTML={{ __html: parseMarkdown(markdown) }}
  ></Wrapper>
);

CodeOfConduct.propTypes = {
  markdown: PropTypes.string,
};

export default CodeOfConduct;

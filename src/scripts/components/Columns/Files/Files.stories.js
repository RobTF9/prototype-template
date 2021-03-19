import React from 'react';
import Files from '.';

export default {
  title: 'Columns/Files',
  component: Files,
};

const Template = args => <Files {...args} />;

export const Default = Template.bind({});
Default.args = {
  files: {
    '12345': {
      id: '12345',
      link: '',
      fileName: 'FileName.txt',
      downloaded: true,
      eventFile: true,
    },
    '23456': {
      id: '23456',
      link: '',
      fileName: 'FileName2.txt',
      downloaded: false,
      eventFile: true,
    },
  },
};

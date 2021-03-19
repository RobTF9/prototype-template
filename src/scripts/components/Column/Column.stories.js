/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { withDesign } from 'storybook-addon-designs';
import Column from '.';
import CodeOfConduct from '../Columns/CodeOfConduct';
import { Main, Content } from './storyStyles';

export default {
  title: 'Column',
  component: Column,
  decorators: [withDesign],
  parameters: {
    design: {
      type: 'figma',
      url:
        'https://www.figma.com/file/8Qnrw2cDu2eMaWMBa7E2PZ/Entities-%2F-Event-%2F-Columns?node-id=0%3A1&viewport=117%2C-1514%2C0.8061825633049011',
    },
  },
  argTypes: {
    setColumns: { action: 'Set columns' },
    children: { control: { disable: true } },
    key: { control: { disable: true } },
    index: { control: { disable: true } },
    columns: { control: { disable: true } },
  },
};

const Template = args => <Column {...args}>{args.children}</Column>;

// Default
export const Default = Template.bind({});

Default.args = {
  title: 'Hello World',
  open: true,
  columns: 1,
  index: 0,
  key: `Hello World0`,
  children: <p className="core-text">Content</p>,
};

Default.decorators = [
  Story => (
    <Main {...{ columns: 1 }}>
      <Content {...{ columns: 1 }}>
        <p className="core-text">Main</p>
        <p className="sub-1280">
          If you can see this, your viewport width is less than 1280px, so the
          column will be placed off screen to the right, you can scroll to see
          it ----&gt;
        </p>
      </Content>
      <Story />
    </Main>
  ),
];

// WithCodeOfConduct
export const WithCodeOfConduct = Template.bind({});

WithCodeOfConduct.args = {
  ...Default.args,
  title: 'Code of conduct',
  children: (
    <CodeOfConduct
      {...{
        markdown:
          'Curabitur eget accumsan arcu, nec suscipit arcu. Vivamus sit amet vehicula leo. Integer massa nisl, cursus id nulla in, vehicula pretium tortor. Praesent porttitor, sapien non viverra gravida, lectus nisi bibendum felis, quis tempus lectus felis sed enim. Proin commodo ut arcu non faucibus. Nam eu lobortis felis. Quisque lobortis lorem a tortor viverra, ut tempor est mollis. Cras eleifend tincidunt lorem, at interdum massa eleifend et. Vivamus lobortis risus non congue accumsan. Pellentesque fermentum neque sapien, eget dignissim erat faucibus quis. In eget nisi at lacus tincidunt faucibus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Phasellus vestibulum, orci vel sodales sagittis, orci magna porta augue, sit amet malesuada diam leo a nunc. Cras elementum erat nec suscipit vulputate. Integer libero purus, egestas ut elit ac, dapibus rutrum sapien. Phasellus convallis gravida metus eu varius. Sed congue nisi id lectus molestie dapibus. Nunc vehicula tempor felis, eu pharetra massa convallis pellentesque. Vestibulum in ligula nec velit sollicitudin varius. In ut neque lorem. Ut iaculis, quam non consectetur commodo, orci libero porttitor purus, ac aliquam lectus est quis orci. Aliquam egestas consequat tincidunt.',
      }}
    />
  ),
};

WithCodeOfConduct.decorators = [...Default.decorators];

// TwoColumns
export const TwoColumns = Template.bind({});

TwoColumns.args = {
  ...WithCodeOfConduct.args,
};

TwoColumns.decorators = [
  Story => (
    <Main {...{ columns: 1 }}>
      <Content {...{ columns: 1 }}>
        <p className="core-text">Main</p>
        <p className="sub-1280">
          If you can see this, your viewport width is less than 1280px, so the
          column will be placed off screen to the right, you can scroll to see
          it ----&gt;
        </p>
      </Content>
      <Column {...Default.args}>
        <p className="core-text">Content</p>
      </Column>
      <Story />
    </Main>
  ),
];

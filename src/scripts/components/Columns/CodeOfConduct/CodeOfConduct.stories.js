import React from 'react';
import CodeOfConduct from '.';

export default {
  title: 'Columns/CodeOfConduct',
  component: CodeOfConduct,
};

const Template = args => <CodeOfConduct {...args} />;

export const Default = Template.bind({});
Default.args = {
  markdown:
    'Curabitur eget accumsan arcu, nec suscipit arcu. Vivamus sit amet vehicula leo. Integer massa nisl, cursus id nulla in, vehicula pretium tortor. Praesent porttitor, sapien non viverra gravida, lectus nisi bibendum felis, quis tempus lectus felis sed enim. Proin commodo ut arcu non faucibus. Nam eu lobortis felis. Quisque lobortis lorem a tortor viverra, ut tempor est mollis. Cras eleifend tincidunt lorem, at interdum massa eleifend et. Vivamus lobortis risus non congue accumsan. Pellentesque fermentum neque sapien, eget dignissim erat faucibus quis. In eget nisi at lacus tincidunt faucibus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Phasellus vestibulum, orci vel sodales sagittis, orci magna porta augue, sit amet malesuada diam leo a nunc. Cras elementum erat nec suscipit vulputate. Integer libero purus, egestas ut elit ac, dapibus rutrum sapien. Phasellus convallis gravida metus eu varius. Sed congue nisi id lectus molestie dapibus. Nunc vehicula tempor felis, eu pharetra massa convallis pellentesque. Vestibulum in ligula nec velit sollicitudin varius. In ut neque lorem. Ut iaculis, quam non consectetur commodo, orci libero porttitor purus, ac aliquam lectus est quis orci. Aliquam egestas consequat tincidunt.',
};

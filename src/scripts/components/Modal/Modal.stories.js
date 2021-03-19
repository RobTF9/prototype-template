/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import Modal from '.';

const Lorum = () => (
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce in sem eget
    felis varius posuere eu ut neque. Interdum et malesuada fames ac ante ipsum
    primis in faucibus. In purus felis, placerat id eros nec, suscipit efficitur
    risus. Nam posuere gravida faucibus. Curabitur porta vel odio quis
    porttitor. Donec urna diam, aliquam sit amet nunc cursus, pellentesque
    luctus nulla. Etiam molestie lorem justo, a fermentum tellus commodo quis.
    Morbi sagittis ipsum et nisi lobortis placerat. Pellentesque enim magna,
    aliquam ut convallis non, porttitor sed nibh. Nulla volutpat ante sit amet
    diam pharetra suscipit. Nullam auctor, felis ut interdum rutrum, augue nisl
    tincidunt lorem, vel blandit erat diam id lacus. Vivamus sem massa,
    tincidunt a vehicula egestas, scelerisque in urna. Nullam interdum diam
    ligula, quis sagittis mi ultrices at. Phasellus non ex sed lacus iaculis
    interdum eu a diam. Cras et condimentum sem, ut fermentum libero.
  </p>
);

export default {
  title: 'Modal',
  component: Modal,
  argTypes: {
    headerType: {
      control: {
        type: 'radio',
        options: ['basic', 'withPaginationLinks'],
      },
    },
    open: { control: { disable: true } },
    setOpen: { control: { disable: true } },
  },
};

const Template = args => {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ display: 'flex', height: '100%', background: '#1A1B20' }}>
      <div
        style={{ position: 'relative', overflow: open ? 'hidden' : 'scroll' }}
      >
        <h1>Content</h1>
        <Lorum />
        <button type="button" onClick={() => setOpen(true)}>
          Open Modal
        </button>
        <Modal {...{ open, setOpen, ...args }}>
          <div style={{ padding: '0 20px 20px 20px' }}>
            I'm some modal content
            <button type="button">Hello</button>
          </div>
        </Modal>
        <Lorum />
        <Lorum />
      </div>
      <aside style={{ flex: '0 0 300px', borderLeft: '1px solid grey' }}>
        <h2>Aside</h2>
        <button type="button">Some button</button>
      </aside>
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {};

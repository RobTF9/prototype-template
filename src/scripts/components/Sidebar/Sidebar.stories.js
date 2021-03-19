/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import Sidebar from '.';
import Flag from '../Icons/Flag';
import List from '../Icons/List';
import Book from '../Icons/Book';
import Download from '../Icons/Download';
import Users from '../Icons/Users';
import { Main, Wrapper } from '../styles/ContentWrapperContentStyles';
import Position from '../HeaderSections/Position';
import Progress from '../Icons/Progress';

export default {
  title: 'Sidebar',
  component: Sidebar,
};

const playerPositon = {
  position: 3,
  points: 100,
  percentComplete: 20,
  showPosition: true,
};

const Template = args => {
  const [sidebarActive, setSidebarActive] = useState(true);
  return (
    <Wrapper>
      <Main>
        <Sidebar
          {...{
            ...args,
            sidebarActive,
            setSidebarActive,
          }}
        />
      </Main>
    </Wrapper>
  );
};

export const Event = Template.bind({});
Event.args = {
  links: [
    { to: '/challenges', text: 'Challenges', icon: <Flag /> },
    { to: '/leaderboard', text: 'Leaderboard', icon: <List /> },
    { to: '/code', text: 'Code of conduct', icon: <Book /> },
    { to: '/files', text: 'Files', icon: <Download /> },
    { to: '/team', text: 'Team', icon: <Users /> },
  ],
  nonActiveHeaderChild: <Progress />,
  activeHeaderChild: (
    <Position
      {...{
        ...playerPositon,
      }}
    />
  ),
  children: (
    <>
      <h4 className="core-heading core-heading--quinary">Children header</h4>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce luctus
        dignissim porttitor. Aenean eu euismod lectus. Pellentesque at sodales
        nunc. Suspendisse in ipsum sed arcu vulputate ultrices quis in lacus.
        Curabitur faucibus ligula sit amet justo commodo pharetra. Sed mattis
        luctus orci, ut lobortis magna convallis vel. Duis eu eleifend ex. Nunc
        dolor nibh, consequat vulputate purus ac, tempor posuere mauris.
        Curabitur nisi enim, malesuada eget nulla ac, efficitur facilisis urna.
        Sed non mauris dictum, congue arcu ut, sollicitudin erat. Ut felis elit,
        cursus non magna ac, dapibus blandit ligula. Suspendisse congue posuere
        ipsum. Quisque sit amet pulvinar metus. Morbi eget sagittis ex. Praesent
        vel diam nisl. Praesent iaculis fermentum dapibus. Quisque fermentum
        massa justo, non condimentum purus imperdiet ac. Aliquam efficitur velit
        sed orci volutpat, at tempor sem aliquet. Maecenas vel fringilla odio.
        Morbi egestas scelerisque nulla, vel sodales purus fringilla non.
        Suspendisse lacinia, magna id semper auctor, augue lorem pellentesque
        urna, ut mattis libero nibh quis augue. Suspendisse iaculis et arcu et
        laoreet. Nunc lacinia lacinia libero, eget porta ante rhoncus et. Sed
        laoreet ex felis, sed porta purus feugiat eget. Etiam a placerat purus.
        Vestibulum neque leo, sollicitudin sed nisi vel, blandit lobortis
        turpis. In et porta risus, sed gravida tellus. Fusce lobortis quam ut
        augue semper, ut elementum eros finibus. Curabitur eleifend, enim id
        finibus vehicula, risus neque sagittis diam, ut fermentum lectus augue
        tempor dui. Vivamus non venenatis arcu. Morbi a ligula pulvinar,
        pharetra sapien id, sagittis augue. Fusce non felis sit amet leo semper
        pulvinar in nec tortor. In in odio dapibus, interdum dui ut, congue
        velit. Phasellus iaculis, mauris id fermentum venenatis, quam risus
        placerat purus, quis accumsan sem enim eu arcu. Nam iaculis fringilla
        erat sed condimentum. Donec quis purus vitae urna faucibus eleifend. Sed
        sed ex sit amet sem consectetur pretium sed id arcu. Etiam aliquam
        consectetur urna et cursus. Sed sed odio tincidunt, gravida lectus non,
        aliquet magna. Aliquam congue est id est posuere, non ultricies diam
        viverra. Donec vehicula eu nisl id malesuada. Etiam interdum dapibus
        nulla, vel bibendum elit. Curabitur nec porta metus, non aliquam metus.
        Mauris mollis scelerisque hendrerit. Sed egestas tortor imperdiet congue
        placerat. Maecenas leo odio, convallis eget diam congue, scelerisque
        porttitor neque. Duis vestibulum felis sit amet vehicula sagittis.
        Integer sagittis metus non orci ultricies faucibus. Integer tellus diam,
        ultrices quis est ut, tristique laoreet arcu. Quisque varius maximus
        arcu porta elementum. Cras fermentum.{' '}
      </p>
    </>
  ),
};

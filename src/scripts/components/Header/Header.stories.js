/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import { withDesign } from 'storybook-addon-designs';
import { useForm } from 'react-hook-form';
import Header from '.';
import { Heading } from './styles';
import UpcomingEventDates from '../HeaderSections/UpcomingEventDates';
import UpcomingEventCountdown from '../HeaderSections/UpcomingEventCountdown';
import Stats from '../HeaderSections/Stats';
import Position from '../HeaderSections/Position';
import ManageEventStatus from '../HeaderSections/ManageEventStatus';
import InlineField from '../InlineField';
import Title from '../InlineField/Title';

export default {
  title: 'Header',
  component: Header,
  decorators: [
    withDesign,
    storyFn => (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        {storyFn()}
        <div style={{ padding: '20px', flex: '1 0 auto' }}>Content</div>
      </div>
    ),
  ],
  parameters: {
    design: {
      type: 'figma',
      url:
        'https://www.figma.com/file/7QQzUiH7NPPTnMzzsJDsLb/Entities-%2F-Event-%2F-Header?node-id=0%3A1&viewport=210%2C94%2C0.9309106469154358',
    },
  },
  argTypes: {
    children: { control: { disable: true } },
  },
};

const Template = args => <Header {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: (
    <Heading className="core-heading" {...{ breakpoint: 600 }}>
      Event Title
    </Heading>
  ),
};

export const WithSubText = Template.bind({});
WithSubText.args = {
  title: (
    <Heading className="core-heading" {...{ breakpoint: 600 }}>
      Event Title
    </Heading>
  ),
  subText: {
    text: 'You are registered for this event. It has not started yet.',
  },
};

export const WithYellowSubText = Template.bind({});
WithYellowSubText.args = {
  title: (
    <Heading className="core-heading" {...{ breakpoint: 600 }}>
      Event Title
    </Heading>
  ),
  subText: {
    text: 'You are registered for this event. It has not started yet.',
    color: 'yellowprime',
  },
};

export const WithSection = Template.bind({});
WithSection.args = {
  title: (
    <Heading className="core-heading" {...{ breakpoint: 600 }}>
      Event Title
    </Heading>
  ),
  children: <div>Hello</div>,
};

export const WithTwoSections = Template.bind({});
WithTwoSections.args = {
  title: (
    <Heading className="core-heading" {...{ breakpoint: 600 }}>
      Event Title
    </Heading>
  ),
  children: [<div>Hello</div>, <div>World</div>],
};

export const UpcomingEvent = Template.bind({});
UpcomingEvent.args = {
  title: (
    <Heading className="core-heading" {...{ breakpoint: 960 }}>
      A Really Long Event Title - It just keeps going and going
    </Heading>
  ),
  subText: {
    text: 'You are registered for this event. It has not started yet.',
    color: 'yellowprime',
  },
  breakpoint: 960,
  children: [
    <UpcomingEventDates
      {...{
        start: new Date('01 Jan 2020 09:00'),
        end: new Date('01 Jan 2020 17:00'),
      }}
    />,
    <UpcomingEventCountdown
      {...{ end: new Date(Date.now() + 60000), fixedEnd: true }}
    />,
  ],
};

export const FinishedEvent = Template.bind({});
FinishedEvent.args = {
  title: (
    <Heading className="core-heading" {...{ breakpoint: 960 }}>
      A Really Long Event Title - It just keeps going and going
    </Heading>
  ),
  subText: {
    text: 'You participated in this event. It is now closed',
    color: 'redprime',
  },
  breakpoint: 960,
  children: [
    <Stats
      {...{
        headers: ['Total players', 'Challenges scored', 'Badges awarded'],
        data: [1632, 3260, 1700],
        hideMobile: true,
      }}
    />,
    <Position
      {...{
        position: 3,
        percentComplete: 60,
        points: 600,
        fullWidthMobile: true,
      }}
    />,
  ],
};

export const ManageEvent = () => {
  const originalData = 'A really long Event title that goes on and on';
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState('');
  const { register, watch, handleSubmit, setValue, errors } = useForm({
    defaultValues: { title: originalData },
  });

  function submit(formData) {
    console.log({ formData });

    setOpen(false);
    setStatus('LOADING');

    // Failed
    // setTimeout(() => {
    //   setStatus('ERROR');
    // }, 3000);

    // Success
    setTimeout(() => {
      setStatus('SUCCESS');

      setTimeout(() => {
        setStatus('READY');
      }, 3000);
    }, 3000);
  }

  return (
    <Header
      {...{
        title: (
          <InlineField
            {...{
              open,
              setOpen,
              setValue,
              status,
              submit: handleSubmit(submit),
              errors,
              name: 'title',
              originalData,
            }}
          >
            <Title
              {...{
                open,
                setOpen,
                status,
                register,
                watch,
                originalData,
                name: 'title',
                submit: handleSubmit(submit),
              }}
            />
          </InlineField>
        ),
        scrollableInfo: false,
        breakpoint: 960,
      }}
    >
      <Stats
        {...{
          headers: ['Active players', 'Correct attempts', 'Total attempts'],
          data: [1632, 3260, 3260],
          hideMobile: true,
        }}
      />
      <ManageEventStatus {...{ status: 0, noBorderMobile: true }} />
    </Header>
  );
};

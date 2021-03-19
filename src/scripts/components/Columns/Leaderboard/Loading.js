import React from 'react';
import {
  Wrapper,
  PosLoading,
  NameLoading,
  PercentLoading,
  BarLoading,
} from './Leader/styles';

const Loading = () =>
  [...Array(10)].map((el, leaderIndex) => (
    <Wrapper key={leaderIndex}>
      <PosLoading className="skeleton" />
      <NameLoading className="skeleton" />
      <PercentLoading className="skeleton" />
      <BarLoading className="skeleton" />
    </Wrapper>
  ));

export default Loading;

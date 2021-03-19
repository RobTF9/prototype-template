import styled from 'styled-components';

export const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  margin: 0 auto;
  max-width: 1200px;
  position: relative;

  & > :last-child {
    padding-bottom: 60px;
  }

  // Header.
  .header {
    align-items: flex-start;
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    padding-top: 20px;
    position: sticky;
    top: 0;
    width: 100%;
    z-index: 20;

    &::after {
      background: linear-gradient(
        to top,
        rgba(0, 0, 0, 0) 0%,
        rgba(26, 27, 32, 1) 50%
      );
      content: '';
      display: block;
      height: 60px;
      left: 0;
      pointer-events: none;
      position: absolute;
      right: 0;
      top: 0;
      width: 100%;
      z-index: -1;
    }
  }
`;

export const Comp = styled.div`
  background-image: url('/assets/images/comp-full-width.svg');
  background-position: bottom center;
  background-repeat: no-repeat;
  background-size: contain;
  flex-shrink: 0;
  height: 200px;
  margin-top: auto;
  width: 100%;
`;

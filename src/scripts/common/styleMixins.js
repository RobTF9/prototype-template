// For usage in styled components.
// Mirrors _base-mixins.scss - Add any that you need to use in styled components

export const visuallyHidden = () => `
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

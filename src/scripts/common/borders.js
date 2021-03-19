// For rendering consitent borders in styled components.
// Should mirror _core-borders.scss

export const borderWidth = 1;
export const dotWidth = 2;

export const fullBorder = color => `
  border: ${borderWidth}px solid ${color};

`;

export const sideBorder = (direction, color) => `
  border-${direction}: ${borderWidth}px solid ${color};

`;

export const dotBorder = (direction, color) => `
  border-${direction}: ${dotWidth}px dotted ${color};
`;

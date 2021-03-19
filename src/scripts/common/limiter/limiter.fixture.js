export default ({ limit, value = '' }) => `
  <input type="text" class="javascript-limiter-input" data-limit="${limit}" value="${value}" />
`;

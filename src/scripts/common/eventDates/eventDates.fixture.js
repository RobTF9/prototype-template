export default ({ startDate = '', endDate = '' }) => `
  <label for="starts_at" class="label">Starts at</label>
  <input id="starts_at" class="js-flatpickr" type="text" name="starts_at" value="${startDate}" placeholder="Pick a start date and time">
  <label for="ends_at" class="label">Ends at</label>
  <input id="ends_at" class="js-flatpickr" type="text" name="ends_at" value="${endDate}" placeholder="Pick an end date and time">
  <label for="timezone">Timezone</label>
  <select id="timezone" class="js-timezone">
    <optgroup label="+00:00">
      <option class="select-option" value="UTC">UTC</option>
    </optgroup>
    <optgroup label="+01:00">
      <option class="select-option" value="Europe/London" selected>London</option>
    </optgroup>
  </select>
  <span class="js-duration">Select some dates first</span>
`;

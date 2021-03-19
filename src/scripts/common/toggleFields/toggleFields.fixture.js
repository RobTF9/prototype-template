export default `
    <div class="js-participation">
        <input id="participation-individual" type="radio" name="participation_mode" value="1">
        <label for="participation-individual">Individual</label>
        <input id="participation-team" type="radio" name="participation_mode" value="2">
        <label for="participation-team">Teams</label>
        <input id="participation-individual-limited" type="radio" name="participation_mode" value="3">
        <label for="participation-individual-limited">Individual limited</label>
    </div>
    <fieldset class="js-team-chat helper-hidden"></fieldset>
    <fieldset class="js-participation-duration helper-hidden"></fieldset>
`;

import React from 'react';
import GeneralButton from '../../form/GeneralButton';

function ToggleProfilePage({ stateValue, raiseState, tabOptions }) {
  function changeModeHandler(event) {
    raiseState(() => event.target.name);
  }

  const buttons = tabOptions.map((t) => (
    <GeneralButton
      key={t}
      name={t}
      id={`${t}-tab-btn`}
      onClick={changeModeHandler}
      btnStyle={t === stateValue ? 'text-red-500' : 'text-black'}
    />
  ));
  return buttons
}

export default ToggleProfilePage;

import React from 'react';
import GeneralButton from '../../form/GeneralButton';

function ProfileTabs({ stateValue, raiseState, tabOptions }) {
  function changeModeHandler(event) {
    raiseState(() => event.target.name);
  }

  const buttons = tabOptions.map((tab) => (
    <GeneralButton
      key={tab}
      name={tab}
      id={`${tab}-tab-btn`}
      onClick={changeModeHandler}
      btnStyle={tab === stateValue ? 'tab text-gray-800' : 'tab text-gray-400'}
    />
  ));
  return buttons
}

export default ProfileTabs;

import React from 'react';
import PropTypes from 'prop-types';
import { createLabel } from '../../../lib/util-client';

function ToggleBodyFormButtons({ raiseState, buttonKeys, currentSection }) {
  function clickHandler(event) {
    raiseState(event.target.name);
  }
  const buttons = buttonKeys.map((key) => {
    const btnStyle = currentSection === key ? 'text-gray-800' : 'text-gray-400';
    return (
      <button key={key} type="button" className={`text-sm font-semibold ${btnStyle}`} name={key} onClick={clickHandler}>
        {createLabel(key)}
      </button>
    );
  });
  return buttons;
}

ToggleBodyFormButtons.propTypes = {
  raiseState: PropTypes.func.isRequired,
  buttonKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
  currentSection: PropTypes.string.isRequired,
};

export default ToggleBodyFormButtons;

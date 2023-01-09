import React from 'react';
import PropTypes from 'prop-types';
import { createLabel } from '../../../lib/util-client';

function ToggleBodyFormButtons({ curModel, raiseModel, buttonKeys }) {
  function clickHandler(event) {
    raiseModel(event.target.name);
  }
  const buttons = buttonKeys.map((key) => {
    const btnStyle = curModel === key ? 'text-gray-800' : 'text-gray-400';
    return (
      <button key={key} type="button" className={`text-sm font-semibold ${btnStyle}`} name={key} onClick={clickHandler}>
        {createLabel(key)}
      </button>
    );
  });
  
  return buttons;
}

ToggleBodyFormButtons.propTypes = {
  raiseModel: PropTypes.func.isRequired,
  buttonKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
  curModel: PropTypes.string.isRequired,
};

export default ToggleBodyFormButtons;

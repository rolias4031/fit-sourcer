import React from 'react';
import PropTypes from 'prop-types';

function NumberInputState({ id, label }) {
  const divClass = 'my-2';
  const labelClass = 'text-gray-700 text-sm block';
  const inputClass =
    'shadow appearance-none text-sm border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-20';
  return (
    <div className={divClass}>
      <label className={labelClass} htmlFor={id}>
        {label}
      </label>
      <input
        className={inputClass}
        type="number"
        id={id}
        step="0.1"
        min="1"
        max="1000"
      />
    </div>
  );
}

NumberInputState.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default NumberInputState;

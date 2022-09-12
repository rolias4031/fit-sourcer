import React from 'react';
import PropTypes from 'prop-types';
import { createLabel } from './TextInputState';

function NumberInputState({ id, label, name, stateValue, raiseState }) {
  function changeHandler(event) {
    console.log(name, event.target.value);
    raiseState((prevState) => {
      const { value } = event.target
      return { ...prevState, [name]: value }
    })
  }
  const divClass = 'my-2';
  const labelClass = 'text-gray-700 text-sm block';
  const inputClass =
    'shadow appearance-none text-sm border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-20';
  return (
    <div className={divClass}>
      <label className={labelClass} htmlFor={id}>
        {createLabel(name, label)}
      </label>
      <input
        onChange={changeHandler}
        className={inputClass}
        id={id}
        name={name}
        type="number"
        step="0.1"
        min="0"
        max="1000"
        value={stateValue}
      />
    </div>
  );
}

NumberInputState.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  stateValue: PropTypes.string.isRequired,
  raiseState: PropTypes.func.isRequired,
};

NumberInputState.defaultProps = {
  label: '',
}

export default NumberInputState;

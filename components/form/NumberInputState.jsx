import React from 'react';
import PropTypes from 'prop-types';
import GeneralLabel from './GeneralLabel';

/*
* can be state controlled or not. If no stateValue is supplied, then it renders without a value attribute and only raises state, without being tied to it. Important when the input needs to start blank.
*/

function NumberInputState({
  id,
  label,
  name,
  inputStyle,
  labelStyle,
  divStyle,
  stateValue,
  raiseState,
}) {
  function changeHandler(event) {
    raiseState((prevState) => ({ ...prevState, [name]: event.target.value }));
  }

  const labelContent = (
    <GeneralLabel id={id} name={name} label={label} labelStyle={labelStyle} />
  );
  const inputClass = `${inputStyle} number-input focus:outline-none focus:shadow-outline`;
  let inputContent = (
    <input
      onChange={changeHandler}
      className={inputClass}
      id={id}
      name={name}
      type="number"
      step="0.1"
      min="0"
      max="1000"
    />
  );
  if (stateValue) {
    inputContent = (
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
    );
  }
  return (
    <div className={divStyle}>
      {labelContent}
      {inputContent}
    </div>
  );
}

NumberInputState.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  inputStyle: PropTypes.string,
  labelStyle: PropTypes.string,
  divStyle: PropTypes.string,
  stateValue: PropTypes.string,
  raiseState: PropTypes.func.isRequired,
};

NumberInputState.defaultProps = {
  label: '',
  inputStyle: null,
  labelStyle: null,
  divStyle: null,
  stateValue: null,
};

export default NumberInputState;

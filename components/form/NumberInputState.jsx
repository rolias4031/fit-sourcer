import React from 'react';
import PropTypes from 'prop-types';
import GeneralLabel from './GeneralLabel';

/*
* this component is an inpute component. It does these things:
1. manages a label using the name property, or the given specific label.
2. raises its value on every click to its form's state. Doesn't contain its own state.
3. gets updated with the value passed into stateValue.
4. Is contained in its own div to keep label and input as one unit.
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
  const inputClass = `${inputStyle} focus:outline-none focus:shadow-outline`;
  return (
    <div className={divStyle}>
      {labelContent}
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
  inputStyle: PropTypes.string,
  labelStyle: PropTypes.string,
  divStyle: PropTypes.string,
  stateValue: PropTypes.string.isRequired,
  raiseState: PropTypes.func.isRequired,
};

NumberInputState.defaultProps = {
  label: '',
  inputStyle: null,
  labelStyle: null,
  divStyle: null,
};

export default NumberInputState;

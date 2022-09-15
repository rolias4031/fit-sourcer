import React from 'react';
import PropTypes from 'prop-types';
import GeneralLabel from './GeneralLabel';

function TextInputState({
  name,
  id,
  label,
  inputStyle,
  labelStyle,
  stateValue,
  raiseState,
}) {
  function changeHandler(event) {
    event.preventDefault();
    raiseState((prevState) => ({ ...prevState, [name]: event.target.value }));
  }

  const labelContent = (
    <GeneralLabel id={id} name={name} label={label} labelStyle={labelStyle} />
  );

  const inputClass = `${inputStyle} text-input focus:outline-none focus:shadow-outline`;
  let inputContent = (
    <input
      onChange={changeHandler}
      className={inputClass}
      type="text"
      id={id}
      name={name}
    />
  );
  if (stateValue) {
    inputContent = (
      <input
        onChange={changeHandler}
        className={inputClass}
        type="text"
        id={id}
        name={name}
        value={stateValue}
      />
    );
  }

  return (
    <>
      {labelContent}
      {inputContent}
    </>
  );
}

TextInputState.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  inputStyle: PropTypes.string,
  labelStyle: PropTypes.string,
  stateValue: PropTypes.string,
  raiseState: PropTypes.func.isRequired,
};

TextInputState.defaultProps = {
  label: null,
  inputStyle: null,
  labelStyle: null,
  stateValue: null,
};

export default TextInputState;

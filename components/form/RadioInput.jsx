import React from 'react';
import PropTypes from 'prop-types';
import GeneralLabel from './GeneralLabel'

function RadioInput({
  name,
  id,
  label,
  value,
  inputStyle,
  labelStyle,
  divStyle,
}) {
  return (
    <div className={divStyle}>
      <GeneralLabel name={name} label={label} id={id} labelStyle={labelStyle} />
      <input
        className={inputStyle}
        type="radio"
        id={id}
        name={name}
        value={value}
      />
    </div>
  );
}

RadioInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  inputStyle: PropTypes.string,
  labelStyle: PropTypes.string,
  divStyle: PropTypes.string,
};

RadioInput.defaultProps = {
  label: null,
  inputStyle: '',
  labelStyle: '',
  divStyle: '',
};

export default RadioInput;

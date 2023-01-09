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
  styles,
  curState,
  raiseState,
  disabled,
}) {
  function changeHandler(event) {
    raiseState((prevState) => ({ ...prevState, [name]: event.target.value }));
  }
  const inputClass = `${styles.input} focus:outline-none focus:shadow-outline`;
  return (
    <div className={styles.div}>
      <GeneralLabel
        id={id}
        name={name}
        label={label}
        style={styles.label}
      />
      <input
        onChange={changeHandler}
        className={inputClass}
        id={id}
        name={name}
        type="number"
        step="0.1"
        min="0"
        max="1000"
        value={curState}
        disabled={disabled}
      />
    </div>
  );
}

NumberInputState.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  styles: PropTypes.objectOf(PropTypes.string),
  curState: PropTypes.string.isRequired,
  raiseState: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

NumberInputState.defaultProps = {
  label: null,
  styles: { div: null, label: null, input: null },
  disabled: false,
};

export default NumberInputState;

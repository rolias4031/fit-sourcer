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

function TextInputState({
  name,
  id,
  label,
  placeholder,
  styles,
  curState,
  raiseState,
}) {
  function changeHandler(event) {
    event.preventDefault();
    raiseState((prevState) => ({ ...prevState, [name]: event.target.value }));
  }

  return (
    <div className={styles.div}>
    <GeneralLabel id={id} name={name} label={label} style={styles.label} />
    <input
        onChange={changeHandler}
        className={`${styles.input} focus:outline-none focus:shadow-outline`}
        type="text"
        id={id}
        name={name}
        value={curState}
        placeholder={placeholder}
      />
    </div>
  );
}

TextInputState.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  styles: PropTypes.exact({
    div: PropTypes.string,
    input: PropTypes.string,
    label: PropTypes.string,
  }),
  curState: PropTypes.string.isRequired,
  raiseState: PropTypes.func.isRequired,
};

TextInputState.defaultProps = {
  label: null,
  placeholder: null,
  styles: PropTypes.exact({
    div: '',
    input: '',
    label: '',
  }),
};

export default TextInputState;

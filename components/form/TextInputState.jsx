// built for ref use, not state. Perhaps built another TextInput component for state.
import React from 'react';
import PropTypes from 'prop-types';

function TextInputState({
  name, id, label, raiseState,
}) {

  function changeHandler(event) {
    event.preventDefault();
    const { value } = event.target;
    raiseState((prevState) => {
      const newState = { ...prevState, [name]: value };
      return newState;
    });
  }

  function createLabel(nameVal, labelVal) {
    if (labelVal) return labelVal
    const regex = /[A-Z]/
    let newLabel = nameVal[0].toUpperCase()
    for (let i=1; i < name.length; i+=1) {
      const match = regex.test(nameVal[i])
      if (match) {
        newLabel += ` ${nameVal[i]}`
      } else {
        newLabel += nameVal[i]
      }
    }
    return newLabel
  }

  return (
    <>
      <label
        className=" text-gray-700 text-sm"
        htmlFor={id}
      >
        {createLabel(name, label)}
      </label>
      <input
        onChange={changeHandler}
        className="shadow appearance-none text-sm border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="text"
        id={id}
        name={name}
      />
    </>
  );
}

TextInputState.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  raiseState: PropTypes.func.isRequired,
};

TextInputState.defaultProps = {
  label: null
};

export default TextInputState;

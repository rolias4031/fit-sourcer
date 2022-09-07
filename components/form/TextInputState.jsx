// built for ref use, not state. Perhaps built another TextInput component for state.
import React from 'react';
import PropTypes from 'prop-types';

function TextInputState({
  title, id, raiseState,
}) {
  function changeHandler(event) {
    event.preventDefault();
    const { value } = event.target;
    raiseState((prevState) => {
      const newState = { ...prevState, [id]: value };
      return newState;
    });
  }
  return (
    <>
      <label
        className=" text-gray-700 text-sm"
        htmlFor={id}
      >
        {title}
      </label>
      <input
        onChange={changeHandler}
        className="shadow appearance-none text-sm border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="text"
        id={id}
      />
    </>
  );
}

TextInputState.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  raiseState: PropTypes.func.isRequired,
};

TextInputState.defaultProps = {
};

export default TextInputState;

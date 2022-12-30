import React from 'react';
import PropTypes from 'prop-types';

function GeneralCheck({ label, id, name, checkStyle, raiseState }) {
  function clickHandler(event) {
    const { checked } = event.target;
    raiseState((prevState) => {
      const newState = { ...prevState, [name]: checked };
      return newState;
    });
  }

  const checkClass = `align-middle mr-3 w-4 h-4 bg-gray-100 text-blue-600 rounded ${checkStyle}`;
  return (
    <div className="mt-3">
      <input
        onClick={clickHandler}
        className={checkClass}
        type="checkbox"
        id={id}
        name={name}
      />
      <label
        className="text-gray-700 text-md align-middle font-bold"
        htmlFor={id}
      >
        {label}
      </label>
    </div>
  );
}

GeneralCheck.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  raiseState: PropTypes.func.isRequired,
  checkStyle: PropTypes.string,
};

GeneralCheck.defaultProps = {
  checkStyle: '',
};

export default GeneralCheck;

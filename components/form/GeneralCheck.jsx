import React from 'react';
import PropTypes from 'prop-types';

function GeneralCheck({ title, id, checkStyle, raiseState }) {
  const checkClass = `align-middle mr-3 w-4 h-4 bg-gray-100 text-blue-600 rounded ${checkStyle}`;
  function clickHandler(event) {
    const { checked } = event.target;
    raiseState((prevState) => {
      const newState = { ...prevState, [id]: checked };
      return newState;
    });
  }
  return (
    <div className="mt-3">
      <input
        onClick={clickHandler}
        className={checkClass}
        type="checkbox"
        id={id}
      />
      <label
        className="text-gray-700 text-md align-middle font-bold"
        htmlFor={id}
      >
        {title}
      </label>
    </div>
  );
}

GeneralCheck.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  raiseState: PropTypes.func.isRequired,
  checkStyle: PropTypes.string,
};

GeneralCheck.defaultProps = {
  checkStyle: '',
};

export default GeneralCheck;

import React from 'react';
import PropTypes from 'prop-types';

function ButtonGeneral({ clickHandler, title }) {
  return (
    <button type="button" onClick={clickHandler}>
      {title}
    </button>
  );
}

ButtonGeneral.propTypes = {
  clickHandler: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default ButtonGeneral;

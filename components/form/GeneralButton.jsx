import React from 'react';
import PropTypes from 'prop-types';
import { createLabel } from '../../lib/util-client';

/*
* button for general situations. see SubmitButton for submit needs.
*/

function GeneralButton({ btnStyle, name, onClick }) {
  function clickHandler(event) {
    onClick(event)
  }

  const btnClass = `btn ${btnStyle}`;
  return (
    <button onClick={clickHandler} type="button" name={name} className={btnClass}>
      {createLabel(name)}
    </button>
  );
}

GeneralButton.propTypes = {
  btnStyle: PropTypes.string,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

GeneralButton.defaultProps = {
  btnStyle: '',
  onClick: () => {},
};

export default GeneralButton;

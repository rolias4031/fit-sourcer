import React from 'react';
import PropTypes from 'prop-types';
import { createLabel } from '../../lib/util-client';

/*
* button for general situations. see SubmitButton for submit needs.
*/

function GeneralButton({ btnStyle, name, id, onClick, icon, disabled }) {
  function clickHandler(event) {
    onClick(event)
  }
  return (
    <button id={id} onClick={clickHandler} type="button" name={name} className={btnStyle} disabled={disabled}>
      {!icon ? createLabel(name) : icon}
    </button>
  );
}

GeneralButton.propTypes = {
  id: PropTypes.string,
  btnStyle: PropTypes.string,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  icon: PropTypes.node,
  disabled: PropTypes.bool,
};

GeneralButton.defaultProps = {
  id: null,
  btnStyle: '',
  onClick: () => {},
  icon: null,
  disabled: false
};

export default GeneralButton;

import React from 'react';
import PropTypes from 'prop-types';

function IconButton({ icon, btnStyle, onClick }) {
  const btnClass = `text-center ${btnStyle}`;
  return (
    <button type="button" className={btnClass}>
      {icon}
    </button>
  );
}

IconButton.propTypes = {
  icon: PropTypes.node.isRequired,
  btnStyle: PropTypes.node
};

IconButton.defaultProps = {
  btnStyle: null
}

export default IconButton;

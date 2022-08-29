/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';

function Header({ size, title }) {
  let header;
  switch (size) {
    case size === 1:
      header = <h1>{title}</h1>;
      break;
    case size === 2:
      header = <h2>{title}</h2>;
      break;
    case size === 3:
      header = <h3>{title}</h3>;
      break;
    default:
      header = <h1>{title}</h1>;
  }
  return header;
}

Header.propTypes = {
  size: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
};

export default Header;

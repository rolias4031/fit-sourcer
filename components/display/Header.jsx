/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';

function Header({ title }) {
  return <h1 className="page-header-text page-header-align">{title}</h1>;
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;

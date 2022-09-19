import React from 'react';
import PropTypes from 'prop-types';
import NavBar from './NavBar';

function Layout({ children }) {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired
};

export default Layout;

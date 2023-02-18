import React from 'react';
import PropTypes from 'prop-types';

function PageFrame({ children }) {
  return <div className="mx-auto w-full lg:w-3/4">{children}</div>;
}

PageFrame.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
};

export default PageFrame;

import React from 'react';
import PropTypes from 'prop-types';

function PageContainer({ style, children }) {
  return <div className={`m-5 mx-auto w-5/6 ${style}`}>{children}</div>;
}

PageContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  style: PropTypes.string,
};

PageContainer.defaultProps = {
  style: '',
};

export default PageContainer;

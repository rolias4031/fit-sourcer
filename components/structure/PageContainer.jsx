import React from 'react';
import PropTypes from 'prop-types';

function PageContainer({ style, children }) {
  return <div className={`m-5 ${style}`}>{children}</div>;
}

PageContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  contStyle: PropTypes.string,
};

PageContainer.defaultProps = {
  contStyle: '',
};

export default PageContainer;

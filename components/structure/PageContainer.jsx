import React from 'react';
import PropTypes from 'prop-types';

function PageContainer({ style, children }) {
  return <div className={`mx-auto m-5 xl:w-1/2 lg:w-3/4 md:w-5/6 ${style}`}>{children}</div>;
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

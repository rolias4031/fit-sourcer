import React from 'react';
import PropTypes from 'prop-types';

function GeneralContainer({ contStyle, children }) {
  const contClass = `my-5 p-5 bg-gray-100 ${contStyle}`;
  return <div className={contClass}>{children}</div>;
}

GeneralContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  contStyle: PropTypes.string,
};

GeneralContainer.defaultProps = {
  contStyle: '',
};

export default GeneralContainer;

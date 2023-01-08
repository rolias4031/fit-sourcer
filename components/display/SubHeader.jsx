/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';

function SubHeader({ header, style }) {
  return <p className={`subheader ${style}`}>{header}</p>;
}

SubHeader.propTypes = {
  header: PropTypes.string.isRequired,
  style: PropTypes.string,
};

SubHeader.defaultProps = {
  style: null,
};

export default React.memo(SubHeader);

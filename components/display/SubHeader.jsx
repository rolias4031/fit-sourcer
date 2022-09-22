/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import SuccessSymbol from '../util/SuccessSymbol';

function SubHeader({ header, headerStyle }) {
  return <p className={`sub-header-text ${headerStyle}`}>{header}</p>;
}

SubHeader.propTypes = {
  header: PropTypes.string.isRequired,
  headerStyle: PropTypes.string,
};

SubHeader.defaultProps = {
  headerStyle: null,
};

export default SubHeader;

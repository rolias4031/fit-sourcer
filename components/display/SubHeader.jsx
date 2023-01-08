/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';

function SubHeader({ header, headerStyle }) {
  console.log('subheader', header)
  return <p className={`sub-header-text ${headerStyle}`}>{header}</p>;
}

SubHeader.propTypes = {
  header: PropTypes.string.isRequired,
  headerStyle: PropTypes.string,
};

SubHeader.defaultProps = {
  headerStyle: null,
};

export default React.memo(SubHeader);

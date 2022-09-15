import React from 'react';
import PropTypes from 'prop-types'
import { createLabel } from '../../lib/util-client'

function GeneralLabel({ id, name, label, labelStyle }) {
  return (
    <label className={labelStyle} htmlFor={id}>
      {createLabel(name, label)}
    </label>
  );
}

GeneralLabel.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  labelStyle: PropTypes.string,
}

GeneralLabel.defaultProps = {
  label: null,
  labelStyle: null
}

export default GeneralLabel;

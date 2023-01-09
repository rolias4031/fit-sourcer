import React from 'react';
import PropTypes from 'prop-types';
import { createLabel } from '../../lib/util-client'

function GeneralLabel({ id, name, label, style }) {
  return (
    <label className={style} htmlFor={id}>
      {createLabel(name, label)}
    </label>
  );
}

GeneralLabel.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  style: PropTypes.string,
};

GeneralLabel.defaultProps = {
  label: null,
  style: null,
};

export default GeneralLabel;

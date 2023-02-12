import React from 'react';
import PropTypes from 'prop-types';
import { CheckIcon } from '@heroicons/react/24/solid';

function SuccessSymbol({ styles }) {
  return <CheckIcon className={`${styles.icon} text-emerald-500`} />;
}

SuccessSymbol.propTypes = {
  styles: PropTypes.exact({
    icon: PropTypes.string
  })
};

SuccessSymbol.defaultProps = {
  styles: {
    icon: 'w-5 h-5'
  },
};

export default SuccessSymbol;

import React from 'react';
import PropTypes from 'prop-types';
import { XMarkIcon } from '@heroicons/react/24/solid';

function ErrorSymbol({ styles }) {
  return <XMarkIcon className={`${styles.icon} text-red-500`} />;
}

ErrorSymbol.propTypes = {
  styles: PropTypes.exact({
    icon: PropTypes.string,
  }),
};

ErrorSymbol.defaultProps = {
  styles: {
    icon: 'w-5 h-5',
  },
};

export default ErrorSymbol;

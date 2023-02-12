import React from 'react';
import PropTypes from 'prop-types';
import { ArrowPathIcon } from '@heroicons/react/24/solid';

function LoadingSymbol({ styles }) {
  const animation = 'animate-spin'
  return <ArrowPathIcon className={`${styles.icon} ${animation}`} />;
}

LoadingSymbol.propTypes = {
  styles: PropTypes.exact({
    icon: PropTypes.string,
  }),
};

LoadingSymbol.defaultProps = {
  styles: {
    icon: 'w-5 h-5',
  },
};

export default LoadingSymbol;

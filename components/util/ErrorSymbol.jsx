import React from 'react';
import PropTypes from 'prop-types';
import { XMarkIcon } from '@heroicons/react/24/solid';

function ErrorSymbol({ style }) {
  return <XMarkIcon className={style ? style : 'w-6 h-6 text-red-500'} />;
}

ErrorSymbol.propTypes = {
  style: PropTypes.string,
};

ErrorSymbol.defaultProps = {
  style: null,
};

export default ErrorSymbol;

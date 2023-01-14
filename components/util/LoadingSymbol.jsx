import React from 'react';
import PropTypes from 'prop-types';
import { ArrowPathIcon } from '@heroicons/react/24/solid';

function LoadingSymbol({ style }) {
  return <ArrowPathIcon className={style ? style : 'w-6 h-6 animate-spin'} />;
}

LoadingSymbol.propTypes = {
  style: PropTypes.string,
};

LoadingSymbol.defaultProps = {
  style: null,
};

export default LoadingSymbol;

import React from 'react';
import PropTypes from 'prop-types';
import { CheckIcon } from '@heroicons/react/24/solid';

function SuccessSymbol({ style }) {
  return <CheckIcon className={style ? style : 'w-6 h-6 text-emerald-500'} />;
}

SuccessSymbol.propTypes = {
  style: PropTypes.string,
};

SuccessSymbol.defaultProps = {
  style: null,
};

export default SuccessSymbol;

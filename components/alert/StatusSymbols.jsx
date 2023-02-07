import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import LoadingSymbol from '../util/LoadingSymbol';
import SuccessSymbol from '../util/SuccessSymbol';
import ErrorSymbol from '../util/ErrorSymbol';

const symbolMap = new Map([
  ['loading', <LoadingSymbol />],
  ['success', <SuccessSymbol />],
  ['error', <ErrorSymbol />],
]);

function StatusSymbols({ status }) {
  const [alive, setAlive] = useState(false);
  
  useEffect(() => {
    if (status === 'idle') {
      setAlive(false);
    } else if (status === 'loading') {
      setAlive(true);
    } else if (status === 'success' || status === 'error') {
      setAlive(true);
      const id = setTimeout(() => {
        setAlive(false);
      }, [3000]);
      return () => clearTimeout(id);
    }
  }, [status]);

  const symbol = alive && (
    <div className="fixed bg-white rounded-full shadow-md shadow-gray-500 bottom-0 right-0 m-3 p-2">
      {symbolMap.get(status)}
    </div>
  );

  return symbol;
}

StatusSymbols.propTypes = {
  status: PropTypes.string.isRequired,
};

StatusSymbols.defaultProps = {
  status: 'idle',
};

export default StatusSymbols;

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import LoadingSymbol from './LoadingSymbol';
import SuccessSymbol from './SuccessSymbol';
import ErrorSymbol from './ErrorSymbol';

const symbolMap = new Map([
  ['loading', <LoadingSymbol />],
  ['success', <SuccessSymbol />],
  ['error', <ErrorSymbol />],
]);

function StatusSymbolsModal({ status }) {
  const [alive, setAlive] = useState(false);

  console.log({ status, alive });

  useEffect(() => {
    if (status === 'idle') {
      setAlive(false);
    } else if (status === 'loading') {
      setAlive(true)
    } else {
      setAlive(true);
      const id = setTimeout(() => {
        setAlive(false);
      }, [3000]);
      return () => clearTimeout(id);
    }
  }, [status]);

  const symbol = alive && (
    <div
      className={
        'fixed bg-white rounded-full drop-shadow bottom-0 right-0 m-3 p-2'
      }
    >
      {symbolMap.get(status)}
    </div>
  );

  return symbol;
}

StatusSymbolsModal.propTypes = {
  status: PropTypes.string.isRequired,
};

StatusSymbolsModal.defaultProps = {
  status: 'idle',
};

export default StatusSymbolsModal;

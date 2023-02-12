/* eslint-disable consistent-return */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import LoadingSymbol from '../util/LoadingSymbol';
import SuccessSymbol from '../util/SuccessSymbol';
import ErrorSymbol from '../util/ErrorSymbol';

export const symbolMap = new Map([
  ['loading', <LoadingSymbol />],
  ['success', <SuccessSymbol />],
  ['error', <ErrorSymbol />],
]);

function FullStatus({ status, aliveTime, styles }) {
  const [alive, setAlive] = useState(false);

  useEffect(() => {
    if (status === 'idle') {
      setAlive(false);
    } else if (status === 'loading') {
      setAlive(true);
    } else if (status === 'success' || status === 'error') {
      setAlive(true);
      if (aliveTime > 0) {
        const id = setTimeout(() => {
          setAlive(false);
        }, [aliveTime]);
        return () => clearTimeout(id);
      }
    }
  }, [status]);

  const symbol = alive && (
    <div className={styles.div}>{symbolMap.get(status)}</div>
  );

  return symbol;
}

FullStatus.propTypes = {
  status: PropTypes.string.isRequired,
  aliveTime: PropTypes.number,
  styles: PropTypes.exact({
    div: PropTypes.string,
  }),
};

FullStatus.defaultProps = {
  status: 'idle',
  aliveTime: 3000,
  styles: {
    div: '',
  },
};

export default FullStatus;

import React from 'react';
import PropTypes from 'prop-types';
import { symbolMap } from './FullStatus';

function PartialStatus({ type, statuses, styles }) {
  let alive = false;
  statuses.forEach((status) => {
    if (status === type) alive = true;
  });
  return alive ? <div className={styles.div}>{symbolMap.get(type)}</div> : null;
}

PartialStatus.propTypes = {
  statuses: PropTypes.arrayOf(PropTypes.string).isRequired,
  styles: PropTypes.exact({
    div: PropTypes.string,
  }),
  type: PropTypes.oneOf(['loading, success, error']).isRequired,
};

PartialStatus.defaultProps = {
  styles: { div: null },
};

export default PartialStatus;

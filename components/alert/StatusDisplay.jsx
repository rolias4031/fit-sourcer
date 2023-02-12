import React from 'react';
import PropTypes from 'prop-types';
import { genId } from '../../lib/util-client';
import FullStatus from './FullStatus';

function StatusDisplay({ statusArray }) {
  const statuses = statusArray.map((s) => (
    <FullStatus key={s.key} status={s.status} />
  ));
  return <div className='flex fixed bottom-0 right-0'>{statuses}</div>;
}

StatusDisplay.propTypes = {
  statusArray: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string))
    .isRequired,
};

export default StatusDisplay;

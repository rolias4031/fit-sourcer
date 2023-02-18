import React from 'react';
import PropTypes from 'prop-types';
import { createLabel } from '../../../../lib/util-client';

function GarmentCountTag({ type, count, isSelected, onSelectFilter }) {
  return (
    <button
      type="button"
      onClick={onSelectFilter}
      className={`flex space-x-3 ring-1 rounded-full px-3 py-1 text-sm items-center text-gray-800 hover:ring-gray-800 ${
        isSelected ? 'ring-gray-800' : 'ring-gray-300'
      }`}
    >
      <div className="">{createLabel(type)}</div>
      <div className="">{count}</div>
    </button>
  );
}

GarmentCountTag.propTypes = {
  type: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onSelectFilter: PropTypes.func.isRequired,
};

export default GarmentCountTag;

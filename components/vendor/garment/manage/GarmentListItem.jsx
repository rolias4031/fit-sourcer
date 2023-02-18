/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

function GarmentListItem({ info, selected }) {
  return (
    <Link href={{ pathname: 'manage', query: { id: info.id } }} shallow>
      <div
        className={`px-3 py-2 rounded-sm cursor-pointer bg-gray-100 hover:ring-1 ring-gray-800 ${
          selected ? 'ring-1' : null
        }`}
      >
        <p className="text-lg font-semibold">{info.name}</p>
        <p className="text-sm text-gray-800 overflow-hidden truncate">
          {info.description}
        </p>
        <p className="text-sm text-gray-500 font-mono">
          {info.modelNumber}
        </p>
      </div>
    </Link>
  );
}

GarmentListItem.propTypes = {
  info: PropTypes.shape({
    id: PropTypes.string,
    description: PropTypes.string,
    modelNumber: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
  selected: PropTypes.bool,
};

GarmentListItem.defaultProps = {
  selected: false,
};

export default GarmentListItem;

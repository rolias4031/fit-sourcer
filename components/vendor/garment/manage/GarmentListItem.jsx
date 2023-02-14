/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

function GarmentListItem({ info, selected }) {
  return (
    <Link href={{ pathname: 'manage', query: { id: info.id } }} shallow>
      <div
        className={`p-2 mb-2 rounded-sm cursor-pointer hover:bg-gray-100 ${
          selected ? 'bg-gray-100' : null
        }`}
      >
        <p className="text-lg">{info.name}</p>
        <p className="text-sm text-gray-800 ml-3 overflow-hidden truncate">{info.description}</p>
        <p className="text-sm text-gray-500 ml-3 font-mono">
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

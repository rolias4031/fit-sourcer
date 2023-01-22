/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

function GarmentListItem({ info }) {
  return (
    <div className="my-3 flex space-x-3 mx-3 border">
      <Link href={{ pathname: 'manage', query: { id: info.id } }} shallow>
        <p className="cursor-pointer">
          {info.name}
        </p>
      </Link>
      <p className="text-gray-500">{info.description}</p>
      <p className="text-gray-300">{info.modelNumber}</p>
    </div>
  );
}

GarmentListItem.propTypes = {
  info: PropTypes.shape({
    id: PropTypes.string,
    description: PropTypes.string,
    modelNumber: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
};

export default GarmentListItem;

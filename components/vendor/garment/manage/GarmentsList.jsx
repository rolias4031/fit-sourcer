import React from 'react';
import PropTypes from 'prop-types';
import GarmentListItem from './GarmentListItem';

function GarmentsList({ garments, selectedGarmentId, styles }) {
  const garmentsList = garments.map((garment) => (
    <GarmentListItem
      key={`${garment.id}${garment.updatedAt}`}
      info={garment}
      selected={garment.id === selectedGarmentId}
    />
  ));
  return <div className={styles.div}>{garmentsList}</div>;
}

GarmentsList.propTypes = {
  garments: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string,
      vendorId: PropTypes.string,
      name: PropTypes.string,
      description: PropTypes.string,
      modelNumber: PropTypes.string,
      link: PropTypes.string,
      garmentType: PropTypes.string,
      sex: PropTypes.string,
      updatedAt: PropTypes.string,
    }),
  ).isRequired,
  styles: PropTypes.exact({
    div: PropTypes.string,
  }),
  selectedGarmentId: PropTypes.string,
};

GarmentsList.defaultProps = {
  styles: {
    div: null,
  },
  selectedGarmentId: '',
};

export default GarmentsList;

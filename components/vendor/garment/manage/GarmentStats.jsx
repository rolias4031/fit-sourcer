import React from 'react';
import PropTypes from 'prop-types';
import { GARMENT_TYPES_KEYS } from '../../../../lib/constants';
import { useSortGarments } from '../../../../lib/hooks';
import GarmentCountTag from './GarmentCountTag';

function GarmentStats({ garments, styles, curFilter, raiseFilter }) {
  const { garmentCountsByType } = useSortGarments(garments);

  const countTags = GARMENT_TYPES_KEYS.map((key) => (
    <GarmentCountTag
      key={key}
      type={key}
      count={garmentCountsByType.get(key)}
      onSelectFilter={() => raiseFilter(key)}
      isSelected={key === curFilter}
    />
  ));
  return (
    <div className={styles.div}>
      <GarmentCountTag
        type="all"
        count={garments.length}
        isSelected={!curFilter}
        onSelectFilter={() => raiseFilter(null)}
      />
      {countTags}
    </div>
  );
}

GarmentStats.propTypes = {
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
  curFilter: PropTypes.string,
  raiseFilter: PropTypes.func.isRequired,
  styles: PropTypes.exact({
    div: PropTypes.string,
  }),
};

GarmentStats.defaultProps = {
  styles: {
    div: null,
  },
  curFilter: null,
};

export default GarmentStats;

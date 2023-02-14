import React from 'react';
import PropTypes from 'prop-types';
import { useGetGarmentDetail } from '../../../../lib/vendor/queries';
import IsLoading from '../../../util/IsLoading';
import IsError from '../../../util/IsError';
import GarmentDetailCard from './GarmentDetailCard';

function GarmentDetailPanel({ garmentId }) {
  const { data, status } = useGetGarmentDetail(garmentId);

  if (status === 'loading') {
    return <IsLoading />;
  }

  if (status === 'error') {
    return <IsError />;
  }

  return (
    <div className="my-5 p-4 basis-1/2">
      <GarmentDetailCard
        key={data.garment.id}
        garment={data.garment}
        styles={{ wrapper: 'w-full space-y-5' }}
      />
    </div>
  );
}

GarmentDetailPanel.propTypes = {
  garmentId: PropTypes.string.isRequired,
};

export default GarmentDetailPanel;

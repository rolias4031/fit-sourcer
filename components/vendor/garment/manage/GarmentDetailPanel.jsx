import React from 'react';
import PropTypes from 'prop-types';
import { useGetGarmentDetail } from '../../../../lib/vendor/queries';
import IsLoading from '../../../util/IsLoading';
import IsError from '../../../util/IsError';
import GarmentDetailCard from './GarmentDetailCard';
import FormController from '../../../form/FormController';

function GarmentDetailPanel({ garmentId }) {
  const { data, status } = useGetGarmentDetail(garmentId);

  if (status === 'loading') {
    return <IsLoading />;
  }

  if (status === 'error') {
    return <IsError />;
  }

  return (
    <FormController>
      {({ dynamicKey, resetFormHandler }) => (
        <div className="my-5 p-4 basis-1/2">
          <GarmentDetailCard
            key={`${data.garment.id}${dynamicKey}`}
            garment={data.garment}
            styles={{ wrapper: 'w-full space-y-5' }}
            onCancelChanges={resetFormHandler}
          />
        </div>
      )}
    </FormController>
  );
}

GarmentDetailPanel.propTypes = {
  garmentId: PropTypes.string.isRequired,
};

export default GarmentDetailPanel;

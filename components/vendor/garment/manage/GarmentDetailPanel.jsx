import React from 'react';
import PropTypes from 'prop-types';
import { useGetGarmentDetail } from '../../../../lib/vendor/queries';
import IsLoading from '../../../util/IsLoading';
import IsError from '../../../util/IsError';
import GarmentDetailCard from './GarmentDetailCard';
import StatusSymbols from '../../../alert/StatusSymbols';

function GarmentDetailPanel({ garmentId }) {
  const { data, status } = useGetGarmentDetail(garmentId);

  if (status === 'loading') {
    return <IsLoading />;
  }

  if (status === 'error') {
    return <IsError />;
  }

  return (
    <div className="m-5 basis-1/2">
      {/* <div className="flex">
        <GarmentDetailButtons
          editMode={editMode}
          setEditMode={setEditMode}
          onDelete={deleteHandler}
          onSave={editHandler}
        />
      </div> */}
      <GarmentDetailCard
        key={data.garment.id}
        garment={data.garment}
        styles={{ wrapper: 'border border-blue-500 w-full space-y-5' }}
      />
    </div>
  );
}

GarmentDetailPanel.propTypes = {
  garmentId: PropTypes.string.isRequired,
};

export default GarmentDetailPanel;

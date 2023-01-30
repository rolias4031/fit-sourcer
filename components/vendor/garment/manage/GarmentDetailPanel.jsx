import React, { useState } from 'react';
import { useRouter } from 'next/router';

import PropTypes from 'prop-types';
import { useGetGarmentDetail } from '../../../../lib/vendor/queries';
import IsLoading from '../../../util/IsLoading';
import IsError from '../../../util/IsError';
import GarmentDetailCard from './GarmentDetailCard';
import GarmentDetailButtons from './GarmentDetailButtons';
import { useDeleteGarment } from '../../../../lib/vendor/mutations';
import { baseUrl, METHODS } from '../../../../lib/constants';
import StatusSymbols from '../../../alert/StatusSymbols'

function GarmentDetailPanel({ garmentId }) {
  const { data, status } = useGetGarmentDetail(garmentId);
  const { mutate: deleteGarment, status: deleteStatus } = useDeleteGarment();
  const [editMode, setEditMode] = useState(false);
  const router = useRouter()

  const deleteHandler = () => {
    deleteGarment({
      url: `${baseUrl}/api/vendor/garment/delete`,
      method: METHODS.DELETE,
      body: {
        garmentId,
      },
    }, {
      onSuccess: () => {
        router.push('/vendor/manage')
      }
    });
  };

  if (status === 'loading') {
    return <IsLoading />;
  }

  if (status === 'error') {
    return <IsError />;
  }

  return (
    <div className="m-5 basis-1/2">
      <div className="flex">
        <GarmentDetailButtons editMode={editMode} setEditMode={setEditMode} onDelete={deleteHandler}/>
      </div>
      <GarmentDetailCard
        garment={data.garment}
        styles={{ wrapper: 'border border-blue-500 w-full space-y-5' }}
        editMode={editMode}
      />
      <StatusSymbols status={deleteStatus}/>
    </div>
  );
}

GarmentDetailPanel.propTypes = {
  garmentId: PropTypes.string.isRequired,
};

export default GarmentDetailPanel;

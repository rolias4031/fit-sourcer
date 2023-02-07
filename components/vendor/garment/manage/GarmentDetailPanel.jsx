import React, { useState } from 'react';
import { useRouter } from 'next/router';

import PropTypes from 'prop-types';
import { useGetGarmentDetail } from '../../../../lib/vendor/queries';
import IsLoading from '../../../util/IsLoading';
import IsError from '../../../util/IsError';
import GarmentDetailCard from './GarmentDetailCard';
import GarmentDetailButtons from './GarmentDetailButtons';
import {
  useDeleteGarment,
  useEditGarment,
} from '../../../../lib/vendor/mutations';
import { APP_URLS, baseUrl, METHODS } from '../../../../lib/constants';
import StatusSymbols from '../../../alert/StatusSymbols';

function GarmentDetailPanel({ garmentId }) {
  const { data, status } = useGetGarmentDetail(garmentId);
  const { mutate: deleteGarment, status: deleteStatus } = useDeleteGarment();
  const { mutate: editGarment, status: editStatus } = useEditGarment();
  const [editMode, setEditMode] = useState(false);
  const router = useRouter();

  const deleteHandler = () => {
    deleteGarment(garmentId, {
      onSuccess: () => {
        console.log('mutate');
        router.push(APP_URLS.vendorManage, undefined, { shallow: true });
      },
    });
  };

  const editHandler = (formValues) => {
    editGarment({
      url: `${baseUrl}/api/vendor/garment/edit`,
      method: 'PUT',
      body: formValues,
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
        <GarmentDetailButtons
          editMode={editMode}
          setEditMode={setEditMode}
          onDelete={deleteHandler}
          onSave={editHandler}
        />
      </div>
      <GarmentDetailCard
        key={data.garment.id}
        garment={data.garment}
        styles={{ wrapper: 'border border-blue-500 w-full space-y-5' }}
        editMode={editMode}
      />
      <StatusSymbols status={deleteStatus} />
    </div>
  );
}

GarmentDetailPanel.propTypes = {
  garmentId: PropTypes.string.isRequired,
};

export default GarmentDetailPanel;

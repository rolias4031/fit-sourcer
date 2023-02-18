import React from 'react';
import PropTypes from 'prop-types';
import { useGetGarmentDetail } from '../../../../lib/vendor/queries';
import IsLoading from '../../../util/IsLoading';
import IsError from '../../../util/IsError';
import GarmentDetailCard from './GarmentDetailCard';
import FormController from '../../../form/FormController';

function GarmentDetailPanel({ garmentId, styles }) {
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
        <div className={styles.div}>
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
  styles: PropTypes.exact({
    div: PropTypes.string,
  }),
};

GarmentDetailPanel.defaultProps = {
  styles: {
    div: null,
  },
};

export default GarmentDetailPanel;

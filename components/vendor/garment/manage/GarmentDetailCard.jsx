import React from 'react';
import PropTypes from 'prop-types';
import { fullLowerBodyGarment } from '../../../../lib/types';
import { GARMENT_TYPES } from '../../../../lib/constants';
import NumberInputState from '../../../form/NumberInputState';
import TextInputState from '../../../form/TextInputState';
import { useExistingGarment } from '../../../../lib/vendor/hooks';

// press an edit button and inputs take place of displays.

function GarmentDetailCard({ garment, styles, editMode }) {
  const {
    images,
    setImages,
    infoValues,
    setInfoValues,
    measValues,
    setMeasValues,
  } = useExistingGarment(garment);

  console.log(garment);

  const infoInputs = Object.keys(infoValues).map((val) => (
    <TextInputState
      key={val}
      id={val}
      name={val}
      styles={{
        input: 'input input-base basis-1/2',
        label: 'label label-base',
        div: 'flex space-x-3 justify-between items-center',
      }}
      curState={infoValues[val]}
      raiseState={setInfoValues}
      disabled={!editMode}
    />
  ));

  const measInputs = Object.keys(measValues).map((val) => (
    <NumberInputState
      key={val}
      id={val}
      name={val}
      styles={{
        input: `input input-base basis-1/2`,
        label: 'label label-base',
        div: 'flex justify-between items-center',
      }}
      curState={measValues[val]}
      raiseState={setMeasValues}
      disabled={!editMode}
    />
  ));

  return (
    <div className={styles.wrapper}>
      <div className="w-full flex flex-col space-y-1">
        <p className="text-lg font-bold">Info</p>
        {infoInputs}
      </div>

      <div className="w-full flex flex-col space-y-1">
        <p className="text-lg font-bold">Measurements</p>
        {measInputs}
      </div>
    </div>
  );
}

GarmentDetailCard.propTypes = {
  garment: fullLowerBodyGarment.isRequired,
  styles: PropTypes.shape({
    wrapper: PropTypes.string,
  }),
  editMode: PropTypes.bool.isRequired,
};

GarmentDetailCard.defaultProps = {
  styles: {
    wrapper: '',
  },
};

export default GarmentDetailCard;

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
  const { garmentType } = garment;
  const { measModel } = GARMENT_TYPES.get(garmentType);

  console.log(garment);

  const infoInputs = Object.keys(infoValues).map((val) => (
    <TextInputState
      key={val}
      id={val}
      name={val}
      styles={{
        input: `${
          editMode ? 'input-sm input-base' : 'bg-white label-sm label-base'
        }`,
        label: 'label-sm label-base',
        div: 'flex',
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
        input: `${
          editMode ? 'input-sm input-base' : 'bg-white label-sm label-base'
        }`,
        label: 'label-sm label-base',
        div: 'flex',
      }}
      curState={measValues[val]}
      raiseState={setMeasValues}
      disabled={!editMode}
    />
  ));

  return (
    <div className={styles.wrapper}>
      <div>{infoInputs}</div>
      <div>{measInputs}</div>
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

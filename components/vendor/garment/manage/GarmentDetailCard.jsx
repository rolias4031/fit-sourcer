import React from 'react';
import PropTypes from 'prop-types';
import { fullLowerBodyGarment } from '../../../../lib/types';
import { GARMENT_TYPES } from '../../../../lib/constants';
import GarmentNumTag from './GarmentNumTag';
import NumberInputState from '../../../form/NumberInputState';

// press an edit button and inputs take place of displays.

function GarmentDetailCard({ garment, styles, editMode }) {
  const { garmentType } = garment;
  const garmentMeta = GARMENT_TYPES.get(garmentType);

  // const garmentNums = Object.keys(garment[garmentMeta.numsModel]).map((msmnt) => {
  //   console.log(msmnt)
  //   return <NumberInputState key={msmnt} id={`${msmnt}-edit-garment`} name={msmnt} inputStyle={editMode ? 'input-sm input-base' : 'bg-white'} labelStyle="label-sm label-base" divStyle="" stateValue raiseState={} disabled={!editMode}/>
  // })
  // console.log({garmentNums});

  // console.log(garment);

  return (
    <div className={styles.wrapper}>
      <p>{garment.name}</p>
      <p>{garment.description}</p>
      <p>{garment.modelNumber}</p>
      <input className="border p-1 disabled:bg-white" type="number" />
    </div>
  );
}

GarmentDetailCard.propTypes = {
  garment: fullLowerBodyGarment.isRequired,
  styles: PropTypes.shape({
    wrapper: PropTypes.string,
  }),
};

GarmentDetailCard.defaultProps = {
  styles: {
    wrapper: '',
  },
};

export default GarmentDetailCard;

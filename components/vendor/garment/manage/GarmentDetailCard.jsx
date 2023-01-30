import React from 'react';
import Image from 'next/image';
import PropTypes from 'prop-types';
import { fullLowerBodyGarment } from '../../../../lib/types';
import { baseUrl, GARMENT_SEX_TYPES, METHODS } from '../../../../lib/constants';
import TextInputState from '../../../form/TextInputState';
import { useExistingGarment } from '../../../../lib/vendor/hooks';
import SelectInput from '../../../form/SelectInput';
import GarmentNumsInput from '../create/GarmentNumsInput';
import { useDeleteGarment } from '../../../../lib/vendor/mutations';

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

  const imageElements = images.map((i) => (
    <Image key={i.url} src={i.url} height="200" width="200" />
  ));

  return (
    <div className={styles.wrapper}>
      <div className="w-full flex flex-col space-y-1">
        <p className="text-lg font-bold">Info</p>
        <div className="flex space-x-2">
          <TextInputState
            key="infoValues-name"
            id="infoValues-name"
            name="name"
            styles={{
              input: 'input input-base',
              label: 'label label-base',
              div: 'flex flex-col basis-2/3',
            }}
            curState={infoValues.name}
            raiseState={setInfoValues}
            disabled={!editMode}
          />
          <TextInputState
            key="infoValue-model"
            id="infoValues-model"
            name="modelNumber"
            styles={{
              input: 'input input-base',
              label: 'label label-base',
              div: 'flex flex-col basis-1/3',
            }}
            curState={infoValues.modelNumber}
            raiseState={setInfoValues}
            disabled={!editMode}
          />
        </div>
        <div className="flex space-x-2">
          <SelectInput
            key="select-input-sex"
            id="select-input-sex"
            name="sex"
            label="Garment Sex"
            styles={{
              label: 'label label-base',
              select: 'input select-input-base',
              div: 'flex flex-col basis-1/2',
            }}
            optionsArr={GARMENT_SEX_TYPES}
            raiseState={setInfoValues}
            curState={infoValues.sex}
            disabled={!editMode}
          />
          <TextInputState
            key="infoValues-type"
            id="infoValues-type"
            name="garmentType"
            styles={{
              input: 'input input-base',
              label: 'label label-base',
              div: 'flex flex-col basis-1/2',
            }}
            curState={infoValues.garmentType}
            raiseState={setInfoValues}
            disabled
          />
        </div>
        <TextInputState
          key="infoValue-description"
          id="infoValues-description"
          name="description"
          styles={{
            input: 'input input-base',
            label: 'label label-base',
            div: 'flex flex-col',
          }}
          curState={infoValues.description}
          raiseState={setInfoValues}
          disabled={!editMode}
        />
      </div>
      <div className="w-full flex flex-col space-y-1">
        <p className="text-lg font-bold">Measurements</p>
        <GarmentNumsInput
          measState={measValues}
          raiseMeas={setMeasValues}
          styles={{
            input: `input input-base basis-1/3`,
            label: 'label label-base',
            div: 'flex justify-between items-center space-y-1',
            container: '',
          }}
          disabled={!editMode}
        />
      </div>
      <div>{imageElements}</div>
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

import React from 'react';
import PropTypes from 'prop-types';
import { fullLowerBodyGarment } from '../../../../lib/types';
import { GARMENT_SEX_TYPES, GARMENT_TYPES } from '../../../../lib/constants';
import NumberInputState from '../../../form/NumberInputState';
import TextInputState from '../../../form/TextInputState';
import { useExistingGarment } from '../../../../lib/vendor/hooks';
import SelectInput from '../../../form/SelectInput';

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

  const infoInputs = Object.keys(infoValues).map(
    (val) =>
      val !== 'description' && (
        <TextInputState
          key={val}
          id={val}
          name={val}
          styles={{
            input: 'input input-base',
            label: 'label label-base',
            div: 'flex flex-col',
          }}
          curState={infoValues[val]}
          raiseState={setInfoValues}
          disabled={!editMode}
        />
      ),
  );

  const measInputs = Object.keys(measValues).map((val) => (
    <NumberInputState
      key={val}
      id={val}
      name={val}
      styles={{
        input: `input input-base basis-1/3`,
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

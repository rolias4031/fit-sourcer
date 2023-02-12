import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { fullLowerBodyGarment } from '../../../../lib/types';
import { GARMENT_SEX_TYPES } from '../../../../lib/constants';
import TextInputState from '../../../form/TextInputState';
import {
  useExistingGarment,
  useManageGarmentMutations,
} from '../../../../lib/vendor/hooks';
import SelectInput from '../../../form/SelectInput';
import GarmentNumsInput from '../create/GarmentNumsInput';
import GarmentImagesInput from './GarmentImagesInput';
import GarmentDetailButtons from './GarmentDetailButtons';

function GarmentDetailCard({ garment, styles }) {
  const [editMode, setEditMode] = useState(false);
  const {
    images,
    setImages,
    infoValues,
    setInfoValues,
    measValues,
    setMeasValues,
  } = useExistingGarment(garment);

  const { deleteGarment, editGarment, deleteStatus, editStatus } =
    useManageGarmentMutations();

  return (
    <>
      <div className="flex">
        <GarmentDetailButtons
          editMode={editMode}
          setEditMode={setEditMode}
          onDelete={() => deleteGarment(garment.id)}
          onSave={() =>
            editGarment({
              garmentId: garment.id,
              infoValues,
              measValues,
              imageValues: images,
            })
          }
          onSaveStatus={editStatus}
        />
      </div>
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
        <div>
          <GarmentImagesInput
            curImages={images}
            raiseImages={setImages}
            disabled={!editMode}
          />
        </div>
      </div>
    </>
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

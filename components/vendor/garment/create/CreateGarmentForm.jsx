import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  baseUrl,
  GARMENT_SEX_TYPES,
  GARMENT_TYPES_KEYS,
} from '../../../../lib/constants';
import GarmentInfoInput from './GarmentInfoInput';
import GarmentNumsInput from './GarmentNumsInput';
import SelectInput from '../../../form/SelectInput';
import GeneralButton from '../../../form/GeneralButton';
import Alert from '../../../alert/Alert';
import {
  useFullGarmentDetails,
} from '../../../../lib/vendor/hooks';
import { useAlerts } from '../../../../lib/hooks';
import { useSaveGarment, useUploadGarmentImage } from '../../../../lib/vendor/mutations';
import StatusSymbols from '../../../alert/StatusSymbols';
import ImageUpload from '../../../form/ImageUpload';
import UploadedImageTag from './UploadedImageTag';

function CreateGarmentForm({ id, formClass, onRemove }) {
  const {
    mutate: saveGarment,
    status: saveGarmentStatus,
    isSuccess,
  } = useSaveGarment();
  const { uploadGarmentImage, status: uploadGarmentStatus } =
    useUploadGarmentImage();

  const { alerts, resetAlerts, createAlerts, handleForeignAlert } = useAlerts();
  const {
    infoValues,
    setInfoValues,
    measValues,
    setMeasValues,
    images,
    setImages,
    garmentDetailsIncomplete,
  } = useFullGarmentDetails();

  const renderUploadedImageTags = () =>
    images.map((image) => (
      <UploadedImageTag
        styles={{
          div: 'flex flex-row w-fit shrink-0 items-center text-xs text-gray-500 bg-white rounded-sm py-1 px-2 mx-1 border border-gray-200',
        }}
        key={image.name}
        imageName={image.name}
        onRemove={setImages}
      />
    ));

  const saveHandler = useCallback(() => {
    // get image urls from images
    console.log(images);
    const imageValues = images.map((image) => ({ url: image.url, key: image.key }));
    const config = {
      url: `${baseUrl}/api/vendor/garment/create`,
      method: 'POST',
      body: { infoValues, measValues, imageValues },
    };
    saveGarment(config, {
      onError: (data) => {
        createAlerts(data.errors);
      },
      onSuccess: () => {
        createAlerts('Garment Created', false);
      },
    });
  });

  const uploadHandler = useCallback(async (image) => {
    uploadGarmentImage(image, {
      onSuccess: (data) => {
        setImages((prev) => {
          console.log(data);
          const thisImage = image;
          thisImage.url = data.url;
          thisImage.key = data.key
          console.log({thisImage})
          return [...prev, thisImage];
        });
      },
      onError: () => {
        handleForeignAlert('Could not upload image - unknown error');
      },
    });
  });

  return (
    <>
      <form className={formClass} id={id}>
        <div className="flex flex-row px-1">
          <SelectInput
            id="selet-garment-type"
            curState={infoValues.garmentType}
            raiseState={setInfoValues}
            optionsArr={GARMENT_TYPES_KEYS}
            name="Garment Type"
            styles={{
              label: 'label-sm label-base block',
              select: 'input-sm select-input-base w-40',
              div: 'mr-2',
            }}
          />
          <SelectInput
            id="select-garment-sex"
            curState={infoValues.sex}
            raiseState={setInfoValues}
            optionsArr={GARMENT_SEX_TYPES}
            name="Garment Sex"
            styles={{
              label: 'label-sm label-base block',
              select: 'input-sm select-input-base w-40',
              div: 'flex-1',
            }}
          />
          <div className="flex flex-row items-center space-x-3">
            {saveGarmentStatus !== 'loading' ? (
              <>
                <GeneralButton
                  name={!isSuccess ? 'Save' : 'Saved!'}
                  id="save-garment-btn"
                  styles={{
                    button: `btn-sm hover-child ${
                      !isSuccess ? 'btn-blue' : 'btn-gray'
                    }`,
                  }}
                  onClick={saveHandler}
                  disabled={garmentDetailsIncomplete()}
                />
                <GeneralButton
                  name="Remove"
                  styles={{
                    button: 'btn-sm btn-red hover-child',
                  }}
                  btnStyle="btn-sm btn-red hover-child"
                  onClick={onRemove}
                />
              </>
            ) : (
              <StatusSymbols status={saveGarmentStatus} />
            )}
          </div>
        </div>
        <GarmentInfoInput
          infoState={infoValues}
          raiseInfo={setInfoValues}
          styles={{
            div: 'w-full',
          }}
        />
        <GarmentNumsInput
          measState={measValues}
          raiseMeas={setMeasValues}
          styles={{
            input: `input input-base basis-auto`,
            label: 'label-sm label-base basis-1/2',
            div: 'flex justify-between items-center w-1/3 space-y-1',
            container: 'px-1',
          }}
          contStyle="flex flex-row flex-wrap justify-start"
        />
        <div className="flex flex-row pt-2 border-t mt-2 px-1">
          <ImageUpload
            name="garmentImages"
            label="Images"
            styles={{
              label: 'label-sm label-base',
              input: 'btn-sm btn-blue w-fit mt-1',
              div: 'flex flex-col',
            }}
            id="garment-image-upload"
            curImages={images}
            onUpload={uploadHandler}
          />
          <div className="flex flex-row flex-wrap ml-3 space-y-1 items-end">
            {renderUploadedImageTags()}
          </div>
          <div className="flex flex-row items-center ml-auto">
            <StatusSymbols status={uploadGarmentStatus} />
          </div>
        </div>
      </form>
      <Alert alerts={alerts} onReset={resetAlerts} />
    </>
  );
}

CreateGarmentForm.propTypes = {
  id: PropTypes.string,
  formClass: PropTypes.string,
  onRemove: PropTypes.func.isRequired,
};

CreateGarmentForm.defaultProps = {
  id: null,
  formClass: PropTypes.string,
};

export default CreateGarmentForm;

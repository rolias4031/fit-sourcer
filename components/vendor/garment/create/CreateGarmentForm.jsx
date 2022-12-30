import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  baseUrl,
  GARMENT_SEX_TYPES,
  GARMENT_TYPES_KEYS,
} from '../../../../lib/constants'
import GarmentInfoInput from './GarmentInfoInput';
import GarmentNumsInput from './GarmentNumsInput';
import SelectInput from './SelectInput';
import GeneralButton from '../../form/GeneralButton';
import Alert from '../../alert/Alert';
import {
  useAlerts,
  useFullGarmentDetails,
  useUploadGarmentImage,
} from '../../../../lib/vendor/hooks';
import { useSimpleMutation } from '../../../../lib/vendor/mutations';
import StatusSymbols from '../../../util/StatusSymbols';
import ImageUpload from '../../form/ImageUpload';
import UploadedImageTag from './UploadedImageTag';

/*
 * DOES: dynamically renders input fields based on the selected garment type

 * get garmentTypes from lib/constants, or make this fetch the garment types so that it stays up to date with models. <-

 ! Next Steps - create the GarmentFormButtons to save, clear, and remove a GarmentForm
 */

function CreateGarmentForm({ id, formClass, onRemove }) {
  const { mutate: saveGarment, isLoading, isSuccess } = useSimpleMutation();
  const { uploadGarmentImage, isLoading: isUploadLoading } =
    useUploadGarmentImage();

  const { alerts, resetAlerts, createAlerts, handleForeignAlert } = useAlerts();
  const {
    infoValues,
    setInfoValues,
    measValues,
    setMeasValues,
    images,
    setImages,
    setGarmentType,
    setGarmentSex,
    garmentDetailsIncomplete
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
    const imageUrls = images.map((image) => image.uploadUrl);
    const config = {
      url: `${baseUrl}/api/vendor/garment/create`,
      method: 'POST',
      inputs: { infoValues, measValues, imageUrls },
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
          const thisImage = image;
          thisImage.uploadUrl = data;
          return [...prev, thisImage];
        });
      },
      onError: () => {
        handleForeignAlert('Could not upload image - unknown error')
      },
    });
  });

  return (
    <>
      <form className={formClass} id={id}>
        <div className="flex flex-row px-1">
          <SelectInput
            id="selet-garment-type"
            stateValue={infoValues.garmentType}
            raiseState={setGarmentType}
            optionsArr={GARMENT_TYPES_KEYS}
            name="Garment Type"
            labelStyle="label-sm label-base block"
            selectStyle="select-input-sm select-input-base w-40"
            divStyle="mr-2"
          />
          <SelectInput
            id="select-garment-sex"
            stateValue={infoValues.sex}
            raiseState={setGarmentSex}
            optionsArr={GARMENT_SEX_TYPES}
            name="Garment Sex"
            labelStyle="label-sm label-base block"
            selectStyle="select-input-sm select-input-base w-40"
            divStyle="flex-1"
          />
          <div className="flex flex-row items-center space-x-3">
            {!isLoading ? (
              <>
                <GeneralButton
                  name={!isSuccess ? 'Save' : 'Saved!'}
                  id="save-garment-btn"
                  btnStyle={`btn-sm hover-child ${!isSuccess ? 'btn-blue' : 'btn-gray'}`}
                  onClick={saveHandler}
                  disabled={garmentDetailsIncomplete()}
                />
                <GeneralButton
                  name="Remove"
                  btnStyle="btn-sm btn-red hover-child"
                  onClick={onRemove}
                />
              </>
            ) : (
              <StatusSymbols loading={isLoading} success={isSuccess} />
            )}
          </div>
        </div>
        <GarmentInfoInput
          stateValues={infoValues}
          raiseState={setInfoValues}
          divStyle="w-full"
        />
        <GarmentNumsInput
          stateValues={measValues}
          raiseState={setMeasValues}
          contStyle="flex flex-row flex-wrap justify-start"
        />
        <div className="flex flex-row pt-2 border-t mt-2 px-1">
          <ImageUpload
            name="garmentImages"
            label="Images"
            id="garment-image-upload"
            divStyle="flex flex-col"
            inputStyle="btn-sm btn-blue w-fit mt-1"
            labelStyle="label-sm label-base"
            raiseState={setImages}
            contState={images}
            onUpload={uploadHandler}
          />
          <div className="flex flex-row flex-wrap ml-3 space-y-1 items-end">
            {renderUploadedImageTags()}
          </div>
          <div className="flex flex-row items-center ml-auto">
            <StatusSymbols loading={isUploadLoading} />
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

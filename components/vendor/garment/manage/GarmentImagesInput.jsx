import React from 'react';
import PropTypes from 'prop-types';
import { useAlerts } from '../../../../lib/hooks';
import {
  useDeleteGarmentImage,
  useUploadGarmentImage,
} from '../../../../lib/vendor/mutations';
import ImageEditTag from '../../../form/ImageEditTag';
import ImageUpload from '../../../form/ImageUpload';
import { calcLoading } from '../../../../lib/util-client';

function GarmentImagesInput({ curImages, raiseImages, disabled }) {
  const { alerts, createAlerts, resetAlerts, handleForeignAlert } = useAlerts();
  const { mutate: uploadImage, status: uploadImageStatus } =
    useUploadGarmentImage();
  const { mutate: deleteImage, status: deleteImageStatus } =
    useDeleteGarmentImage();

  const uploadHandler = async (image) => {
    uploadImage(image, {
      onSuccess: (data) => {
        raiseImages((prev) => {
          const thisImage = image;
          thisImage.url = data.url;
          thisImage.key = data.key;
          return [...prev, thisImage];
        });
      },
      onError: () => {
        handleForeignAlert('Could not upload image - unknown error');
      },
    });
  };

  const removeImageHandler = (imageToDelete) => {
    deleteImage(imageToDelete, {
      onSuccess: () => {
        raiseImages(
          curImages.filter((image) => image.url !== imageToDelete.url),
        );
      },
    });
  };

  const imageTags = curImages.map((i) => (
    <ImageEditTag
      imageInfo={{ url: i.url, key: i.key }}
      key={i.url}
      onRemoveImage={removeImageHandler}
      disabled={disabled}
    />
  ));
  return (
    <div className="">
      <ImageUpload
        name="images"
        id="manage-garment-images"
        curImages={curImages}
        onUpload={uploadHandler}
        styles={{
          div: 'flex flex-col',
          label: 'text-lg font-bold w-fit',
          input: 'btn-sm btn-blue w-fit mt-1',
        }}
        disabled={disabled}
        isLoading={calcLoading([uploadImageStatus, deleteImageStatus])}
      />
      <div className="flex space-x-3 mt-2 mb-5">{imageTags}</div>
    </div>
  );
}

GarmentImagesInput.propTypes = {
  curImages: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string,
      url: PropTypes.string,
      key: PropTypes.string,
      garmentId: PropTypes.string,
    }),
  ).isRequired,
  raiseImages: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

GarmentImagesInput.defaultProps = {
  disabled: false,
};

export default GarmentImagesInput;

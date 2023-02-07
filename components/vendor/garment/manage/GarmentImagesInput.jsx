import React from 'react';
import PropTypes from 'prop-types';
import { useAlerts } from '../../../../lib/hooks';
import {
  useDeleteGarmentImage,
  useUploadGarmentImage,
} from '../../../../lib/vendor/mutations';
import ImageEditTag from '../../../form/ImageEditTag';
import ImageUpload from '../../../form/ImageUpload';
import StatusSymbols from '../../../alert/StatusSymbols';
import { baseUrl } from '../../../../lib/constants';

function GarmentImagesInput({ curImages, raiseImages, disabled }) {
  const { alerts, createAlerts, resetAlerts, handleForeignAlert } = useAlerts();
  const { uploadGarmentImage, status } = useUploadGarmentImage();
  const { mutate: deleteImage, status: deleteStatus } = useDeleteGarmentImage();

  const uploadHandler = async (image) => {
    uploadGarmentImage(image, {
      onSuccess: (data) => {
        raiseImages((prev) => {
          const thisImage = image;
          thisImage.url = data.url;
          thisImage.key = data.key;
          console.log('uploadHandler', thisImage.url);
          return [...prev, thisImage];
        });
      },
      onError: () => {
        handleForeignAlert('Could not upload image - unknown error');
      },
    });
  };

  const removeImageHandler = (imageToDelete) => {
    console.log('removeImageHandler', { imageToDelete, curImages });
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
    <div>
      <ImageUpload
        name="changeGarmentImages"
        id="manage-garment-images"
        curImages={curImages}
        onUpload={uploadHandler}
        styles={{
          label: 'label label-base',
          input: 'btn-sm btn-blue w-fit mt-1',
          div: 'flex flex-col',
        }}
        disabled={disabled}
      />
      <div className="flex space-x-3">{imageTags}</div>
      <StatusSymbols status={deleteStatus} />
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

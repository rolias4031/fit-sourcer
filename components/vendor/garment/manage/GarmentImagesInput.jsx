import Image from 'next/image';
import PropTypes from 'prop-types';
import React from 'react';
import { useAlerts } from '../../../../lib/hooks';
import { useUploadGarmentImage } from '../../../../lib/vendor/mutations';
import ImageEditTag from '../../../form/ImageEditTag';
import ImageUpload from '../../../form/ImageUpload';

function GarmentImagesInput({ curImages, raiseImages, disabled }) {
  const { alerts, createAlerts, resetAlerts, handleForeignAlert } = useAlerts();
  const { uploadGarmentImage, status } = useUploadGarmentImage();

  const uploadHandler = async (image) => {
    uploadGarmentImage(image, {
      onSuccess: (data) => {
        raiseImages((prev) => {
          const thisImage = image;
          thisImage.url = data;
          console.log(thisImage.url);
          return [...prev, thisImage];
        });
      },
      onError: () => {
        handleForeignAlert('Could not upload image - unknown error');
      },
    });
  };

  const removeImageHandler = (imageUrl) => {
    console.log(curImages)
    console.log(imageUrl);
    const newImages = curImages.filter((image) => image.url !== imageUrl)
    raiseImages(newImages)
  }

  const imageTags = curImages.map((i) => (
    <ImageEditTag url={i.url} key={i.url} onRemoveImage={removeImageHandler} disabled={disabled}/>
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
      <div className='flex space-x-3'>
        {imageTags}
      </div>
    </div>
  );
}

GarmentImagesInput.propTypes = {
  curImages: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string,
      url: PropTypes.string,
      garmentId: PropTypes.string,
    }),
  ).isRequired,
  raiseImages: PropTypes.func.isRequired,
};

export default GarmentImagesInput;

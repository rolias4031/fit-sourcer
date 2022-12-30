import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { XMarkIcon } from '@heroicons/react/20/solid';

function UploadedImageTag({ styles, imageName, onRemove }) {
  const removeHandler = useCallback(() => {
    onRemove((prev) => {
      const imageToRemove = prev.find((image) => image.name === imageName);
      const copy = [...prev];
      copy.splice(prev.indexOf(imageToRemove), 1);
      return copy;
    });
  });

  return (
    <div className={styles?.div}>
      <p className="">{imageName}</p>
      <XMarkIcon
        className="h-4 w-4 ml-3 inline text-red-400 cursor-pointer shrink-0"
        onClick={removeHandler}
      />
    </div>
  );
}

UploadedImageTag.propTypes = {
  styles: PropTypes.exact({
    div: PropTypes.string,
  }),
  imageName: PropTypes.string.isRequired,
  onRemove: PropTypes.func.isRequired,
};

UploadedImageTag.defaultProps = {
  styles: null,
};

export default UploadedImageTag;

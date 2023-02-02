import React from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';

import { XMarkIcon } from '@heroicons/react/24/solid';

function ImageEditTag({ url, onRemoveImage, disabled }) {
  return (
    <div className="relative h-40 w-40 border leading-tight rounded overflow-hidden">
      {!disabled && (
        <XMarkIcon
          className="m-1 float-right w-5 h-5 relative z-10 bg-white text-red-500 rounded-full opacity-70 hover:cursor-pointer"
          onClick={() => onRemoveImage(url)}
        />
      )}

      <Image className="block" src={url} layout="fill" objectFit="cover" />
    </div>
  );
}

ImageEditTag.propTypes = {
  url: PropTypes.string.isRequired,
  onRemoveImage: PropTypes.func.isRequired,
};

export default ImageEditTag;

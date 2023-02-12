import React, { useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { CloudArrowUpIcon } from '@heroicons/react/20/solid';
import GeneralLabel from './GeneralLabel';
import GeneralButton from './GeneralButton';
import LoadingSymbol from '../util/LoadingSymbol';

function ImageUpload({
  name,
  id,
  label,
  styles,
  curImages,
  onUpload,
  disabled,
  hideLabel,
  isLoading,
}) {
  const inputRef = useRef(null);

  const clickHandler = useCallback(() => {
    inputRef.current.value = null;
    inputRef.current.click();
  });

  const uploadHandler = useCallback((event) => {
    const { files } = event.target;
    if (files.length === 0) return;
    if (curImages.length >= 3) return;
    // const nameExists = curImages.find((image) => image.name === files[0].name);
    // if (nameExists) return;
    onUpload(event.target.files[0]);
  });

  return (
    <div className={styles.div}>
      {!hideLabel ? (
        <GeneralLabel id={id} name={name} label={label} style={styles.label} />
      ) : null}
      <GeneralButton
        name="upload image"
        icon={
          isLoading ? (
            <LoadingSymbol />
          ) : (
            <CloudArrowUpIcon className="h-5 w-5" />
          )
        }
        id={id}
        styles={{ button: styles.input }}
        onClick={clickHandler}
        disabled={disabled}
      />
      <input
        onChange={uploadHandler}
        name={name}
        ref={inputRef}
        className="hidden"
        type="file"
        accept="image/jpeg image/png"
        disabled={disabled}
      />
    </div>
  );
}

ImageUpload.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  styles: PropTypes.exact({
    input: PropTypes.string,
    label: PropTypes.string,
    div: PropTypes.string,
  }),
  curImages: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
  onUpload: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  hideLabel: PropTypes.bool,
};

ImageUpload.defaultProps = {
  label: null,
  styles: {
    input: '',
    label: '',
    div: '',
  },
  disabled: false,
  hideLabel: false,
};

export default ImageUpload;

import React, { useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { CloudArrowUpIcon } from '@heroicons/react/20/solid';
import GeneralLabel from './GeneralLabel'
import GeneralButton from './GeneralButton'

function ImageUpload({
  name,
  id,
  label,
  labelStyle,
  inputStyle,
  divStyle,
  contState,
  onUpload,
}) {
  const inputRef = useRef(null);

  const clickHandler = useCallback(() => {
    inputRef.current.value = null;
    inputRef.current.click();
  });

  const uploadHandler = useCallback((event) => {
    const { files } = event.target;
    if (files.length === 0) return;
    if (contState.length >= 3) return;
    const nameExists = contState.find((image) => image.name === files[0].name);
    if (nameExists) return;
    onUpload(event.target.files[0]);
  });

  return (
    <div className={divStyle}>
      <GeneralLabel id={id} name={name} label={label} labelStyle={labelStyle} />
      <GeneralButton
        name="upload image"
        icon={<CloudArrowUpIcon className="h-5 w-5" />}
        id={id}
        btnStyle={inputStyle}
        onClick={clickHandler}
      />
      <input
        onChange={uploadHandler}
        name={name}
        ref={inputRef}
        className="hidden"
        type="file"
        accept="image/jpeg image/png"
      />
    </div>
  );
}

ImageUpload.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  labelStyle: PropTypes.string,
  inputStyle: PropTypes.string,
  divStyle: PropTypes.string,
  contState: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
  onUpload: PropTypes.func.isRequired,
};

ImageUpload.defaultProps = {
  label: null,
  labelStyle: null,
  inputStyle: null,
  divStyle: null,
};

export default ImageUpload;

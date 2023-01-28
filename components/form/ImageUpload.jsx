import React, { useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { CloudArrowUpIcon } from '@heroicons/react/20/solid';
import GeneralLabel from './GeneralLabel'
import GeneralButton from './GeneralButton'

function ImageUpload({
  name,
  id,
  label,
  styles,
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
    <div className={styles.div}>
      <GeneralLabel id={id} name={name} label={label} style={styles.label} />
      <GeneralButton
        name="upload image"
        icon={<CloudArrowUpIcon className="h-5 w-5" />}
        id={id}
        styles={{ button: styles.input }}
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
  styles: PropTypes.exact({
    input: PropTypes.string,
    label: PropTypes.string,
    div: PropTypes.string,
  }),
  contState: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
  onUpload: PropTypes.func.isRequired,
};

ImageUpload.defaultProps = {
  label: null,
  styles: {
    input: '',
    label: '',
    div: '',
  },
};

export default ImageUpload;

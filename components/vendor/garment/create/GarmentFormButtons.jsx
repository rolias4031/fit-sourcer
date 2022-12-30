import React from 'react';
import PropTypes from 'prop-types';
import GeneralButton from '../../form/GeneralButton';

function GarmentFormButtons({
  divStyle,
  saveHandler,
  removeHandler,
}) {
  return (
    <div className={divStyle}>
      <GeneralButton
        name="Save"
        id="save-garment-btn"
        btnStyle="btn-sm btn-blue hover-child"
        onClick={saveHandler}
      />
      <GeneralButton
        name="Remove"
        btnStyle="btn-sm btn-red hover-child"
        onClick={removeHandler}
      />
    </div>
  );
}

GarmentFormButtons.propTypes = {
  divStyle: PropTypes.string,
  saveHandler: PropTypes.func.isRequired,
  removeHandler: PropTypes.func.isRequired,
};

GarmentFormButtons.defaultProps = {
  divStyle: '',
};

export default GarmentFormButtons;

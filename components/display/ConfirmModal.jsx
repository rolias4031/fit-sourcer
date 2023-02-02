import React from 'react';
import PropTypes from 'prop-types';
import GeneralButton from '../form/GeneralButton';

function ConfirmModal({ message, onCancel, onConfirm }) {
  return (
    <div className="fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-sm p-5 w-[400px] h-[200px] flex flex-col justify-between">
        <p className="text-xl font-semibold text-center">{message}</p>
        <div className="flex justify-between">
          <GeneralButton
            name="cancel"
            id=""
            onClick={onCancel}
            styles={{ button: 'btn btn-blue' }}
          />
          <GeneralButton
            name="confirm"
            id=""
            onClick={onConfirm}
            styles={{ button: 'btn btn-red' }}
          />
        </div>
      </div>
    </div>
  );
}

ConfirmModal.propTypes = {
  message: PropTypes.string,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

ConfirmModal.defaultProps = {
  message: 'Are you sure you want to continue?',
};

export default ConfirmModal;

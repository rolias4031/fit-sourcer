import React, { useState } from 'react';
import PropTypes from 'prop-types';
import GeneralButton from './GeneralButton';
import ConfirmModal from '../display/ConfirmModal';

function ButtonWithConfirm({ name, id, icon, styles, message, onClick }) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  return (
    <>
      <GeneralButton
        styles={{
          button: styles.button,
        }}
        name={name}
        icon={icon}
        id={id}
        onClick={() => setIsConfirmOpen(true)}
      />
      {isConfirmOpen && (
        <ConfirmModal
          message={message}
          onCancel={() => setIsConfirmOpen(false)}
          onConfirm={onClick}
        />
      )}
    </>
  );
}

ButtonWithConfirm.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  icon: PropTypes.element,
  styles: PropTypes.exact({
    button: PropTypes.string,
  }),
  message: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

ButtonWithConfirm.defaultProps = {
  icon: null,
  styles: {
    button: '',
  },
};

export default ButtonWithConfirm;

import React from 'react';
import PropTypes from 'prop-types';

function BootstrapContainer({ children, config }) {
  const contClass = `${config.contClass}`;
  const rowClass = `${config.rowClass}`;
  const colClass = `${config.colClass}`;
  return (
    <div className={contClass}>
      <div className={rowClass}>
        <div className={colClass}>{children}</div>
      </div>
    </div>
  );
}
BootstrapContainer.propTypes = {
  children: PropTypes.node.isRequired,
  config: PropTypes.exact({
    contClass: PropTypes.string,
    rowClass: PropTypes.string,
    colClass: PropTypes.string,
  }).isRequired,
};

export default BootstrapContainer;

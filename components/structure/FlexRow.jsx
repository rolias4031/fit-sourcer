import React from 'react';
import PropTypes from 'prop-types';

function FlexRow({ children }) {
  function renderContent() {
    const content = children.map((child, el) => {
      const id = el * Math.random();
      return (
        <div key={id} className="w-full">
          {child}
        </div>
      );
    });
    return content;
  }
  return <div className="flex space-x-2">{renderContent()}</div>;
}

FlexRow.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
};

export default FlexRow;

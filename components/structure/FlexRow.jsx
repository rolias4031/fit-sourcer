import React from 'react';
import PropTypes from 'prop-types';

function FlexRow({ children }) {
  const content = children.map((child) => (
    <div key={child.props.id} className="w-full">
      {child}
    </div>
  ));
  return <div className="flex space-x-2">{content}</div>;
}

FlexRow.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
};

export default FlexRow;

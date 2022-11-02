import React from 'react';
import PropTypes from 'prop-types';
import SubmitButton from '../form/SubmitButton';
import GeneralButton from '../form/GeneralButton';

function AppCard({ app, onClick }) {
  console.log('AppCard', app);
  function clickHandler(event) {
    event.preventDefault();
    onClick(app.vendorProfile.id);
  }
  return (
    <div className="flex border p-2 bg-gray-50 rounded-md">
      <div className="flex flex-col flex-1">
        <p className="font-bold">{app.vendorProfile.name}</p>
        <p className="text-sm">{app.vendorProfile.description}</p>
        <p className="text-sm text-gray-600">{app.vendorProfile.userId}</p>
        <p className="text-sm text-gray-600">{app.email}</p>
      </div>
      <div className="flex flex-col space-y-2 my-auto">
        <SubmitButton
          title="Approve"
          id="vendor-apps-submit-btn"
          btnStyle="btn-sm btn-blue"
        />
        <GeneralButton btnStyle="btn-sm btn-red" name="deny"/>
      </div>
    </div>
  );
}

AppCard.propTypes = {
  app: PropTypes.shape({
    email: PropTypes.string,
    id: PropTypes.string,
    role: PropTypes.string,
    updatedAt: PropTypes.string,
    vendorProfile: PropTypes.objectOf(PropTypes.string),
  }).isRequired,
};

export default AppCard;

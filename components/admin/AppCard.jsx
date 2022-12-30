import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import GeneralButton from '../form/GeneralButton';

function AppCard({ app, onSubmit }) {
  console.log('AppCard', app);
  const manageHandler = useCallback((event) => {
    console.log('manageHandler', app.vendorProfile.id, event);
    onSubmit({ appId: app.vendorProfile.id, applyingUserId: app.id, action: event.target.name });
  });
  return (
    <div
      className="flex border p-2 bg-gray-50 rounded-md"
    >
      <div className="flex flex-col flex-1">
        <p className="font-bold">{app.vendorProfile.name}</p>
        <p className="text-sm">{app.vendorProfile.description}</p>
        <p className="text-sm text-gray-600">{app.vendorProfile.userId}</p>
        <p className="text-sm text-gray-600">{app.email}</p>
      </div>
      <div className="flex flex-col space-y-2 my-auto">
        <GeneralButton
          btnStyle="btn-sm btn-blue"
          name="approve"
          onClick={manageHandler}
        />
        <GeneralButton
          btnStyle="btn-sm btn-red"
          name="deny"
          onClick={manageHandler}
        />
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
  onSubmit: PropTypes.func.isRequired,
};

export default AppCard;

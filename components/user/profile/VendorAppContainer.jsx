import React, { useCallback, useContext } from 'react';
import { useSimpleMutation } from '../../../lib/mutations';
import { ALERT_LOC_IDS } from '../../../lib/constants';
import VendorAppForm from './VendorAppForm';
import SubHeader from '../../display/SubHeader';
import Alert from '../../alert/Alert';
import { useAlerts } from '../../../lib/hooks';

/*
* DOES:
- holds logic to submit request to become a vendor.
- renders the VendorAppForm
*/

function VendorAppContainer() {
  // comp hooks
  const { alerts, createAlerts, resetAlerts } = useAlerts()
  const { mutate, isLoading, isSuccess, isError } = useSimpleMutation();
  // comp functions
  const vendorAppHandler = useCallback((values) => {
    // takes formValues from VendorAppForm
    const config = {
      method: 'POST',
      url: 'http://localhost:3000/api/vendor/create',
      inputs: values,
    };
    mutate(config, {
      onSettled: (data, error) => {
        console.log({ data, error });
        createAlerts(data.errors)
      },
    });
  });
  return (
    <div>
      <SubHeader header="Apply for Vendorship" headerStyle="my-1" />
      <VendorAppForm onSubmit={vendorAppHandler} />
      <Alert alerts={alerts} onReset={resetAlerts} />
    </div>
  );
}

export default VendorAppContainer;

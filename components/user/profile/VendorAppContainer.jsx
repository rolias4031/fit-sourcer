import React, { useCallback } from 'react';
import { useSimpleMutation } from '../../../lib/mutations';
import VendorAppForm from './VendorAppForm';
import SubHeader from '../../display/SubHeader';
import Alert from '../../alert/Alert';
import { useAlerts } from '../../../lib/hooks';
import { baseUrl } from '../../../lib/constants';

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
      url: `${baseUrl}/api/vendor/create`,
      inputs: values,
    };
    mutate(config, {
      onSettled: (data, error) => {
        console.log({ data, error });
        createAlerts(error.errors)
      },
    });
  });
  return (
    <>
      <SubHeader header="Apply for Vendorship" headerStyle="my-1" />
      <VendorAppForm onSubmit={vendorAppHandler} />
      <Alert alerts={alerts} onReset={resetAlerts} />
    </>
  );
}

export default VendorAppContainer;

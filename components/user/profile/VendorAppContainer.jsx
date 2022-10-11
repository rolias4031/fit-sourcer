import React, { useCallback, useContext } from 'react';
import { useSimpleMutation } from '../../../lib/mutations';
import { ALERT_LOC_IDS } from '../../../lib/constants';
import VendorAppForm from './VendorAppForm';
import SubHeader from '../../display/SubHeader';
import { AlertContext } from '../../../context/AlertContext';
import Alert from '../../alert/Alert';

/*
* DOES:
- holds logic to submit request to become a vendor.
- renders the VendorAppForm
*/

function VendorAppContainer() {
  // comp hooks
  const alertCtx = useContext(AlertContext);
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
        alertCtx.updateAlerts({
          messages: error ? error.errors : data.display,
          locId: ALERT_LOC_IDS.VENDOR_APP_CONTAINER,
          error: error && true
        })
      },
    });
  });
  return (
    <div>
      <SubHeader header="Apply for Vendorship" headerStyle="my-1" />
      <VendorAppForm onSubmit={vendorAppHandler} />
      <Alert locId={ALERT_LOC_IDS.VENDOR_APP_CONTAINER} />
    </div>
  );
}

export default VendorAppContainer;

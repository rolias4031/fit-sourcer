/* eslint-disable import/prefer-default-export */
import { useMutation } from 'react-query';
import { baseUrl } from '../constants';

// mutateWithInputs is fetch function for basic POST/PUT mutations.
async function mutateWithInput(config) {
  // config = { method, inputs, url }
  const fetchOptions = {
    method: config.method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ inputs: config.inputs }),
  };
  const response = await fetch(config.url, fetchOptions);
  const result = await response.json();
  if (!response.ok || !(response.status in { 200: null, 201: null })) {
    const error = new Error();
    error.errors = result.errors;
    throw error;
  }
  return result;
}

async function uploadToS3(config) {
  // config = { method, inputs, url }
  const fetchOptions = {
    method: config.method,
    body: config.inputs,
  };
  const response = await fetch(config.url, fetchOptions);
  if (!response.ok || !(response.status in { 200: null, 201: null })) {
    const error = new Error('Upload to AWS S3 bucket failed');
    throw error;
  }
  return response;
}

async function mutateNoInputs(config) {
  // config = {method, url}
  const fetchOptions = {
    method: config.method,
    headers: { 'Content-Type': 'application/json' },
  };
  const response = await fetch(config.url, fetchOptions);
  const result = await response.json();
  if (!response.ok || !(response.status in { 200: null, 201: null })) {
    const error = new Error();
    error.errors = result.errors;
    throw error;
  }
  return result;
}

const useCheckIfVendor = () => useMutation(mutateWithInput);

export const useSendSigninCode = (
  signIn,
  setIsCodeInput,
  handleForeignAlert,
  createAlerts,
) => {
  const { mutate: checkIfVendor } = useCheckIfVendor();
  const sendCodeHandler = async (formValues) => {
    // useMutation for vendor check
    checkIfVendor(
      {
        method: 'POST',
        url: `${baseUrl}/api/vendor/vendor-check`,
        inputs: formValues,
      },
      {
        onSuccess: async (data) => {
          try {
            await signIn.create({
              identifier: formValues.email,
            });
            await signIn.prepareFirstFactor({
              strategy: 'email_code',
              emailAddressId: data.emailAddressId,
            });
            setIsCodeInput(() => true);
          } catch (error) {
            handleForeignAlert('Something went wrong', error);
          }
        },
        onError: (data) => {
          createAlerts(data.errors);
        },
      },
    );
  };
  return useMutation(sendCodeHandler);
};

export const useAttemptSignIn = (
  signIn,
  router,
  handleForeignAlert,
  createAlerts,
) => {
  const signInHandler = async (emailCode) => {
    try {
      await signIn.attemptFirstFactor({
        strategy: 'email_code',
        code: emailCode,
      });
      createAlerts('Success', false);
      router.reload();
    } catch (error) {
      // handle foreign error
      handleForeignAlert('Code is incorrect or expired', error);
    }
  };
  return useMutation(signInHandler);
};

export const useSimpleMutation = () => useMutation(mutateWithInput);

export const useGetPresignedUrls = () => useMutation(mutateWithInput);

export const useUploadImageToS3 = () => useMutation(uploadToS3);

/* eslint-disable import/prefer-default-export */
import { useMutation } from 'react-query';
import { APP_URLS, baseUrl, METHODS } from '../constants';

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

async function mutateWithBody(config) {
  // config = { method, url, body = {key: vals} }
  const fetchOptions = {
    method: config.method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(config.body),
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

const useCheckIfVendor = () => {
  // procedure here for mutations
  // must return the raw mutate function because that allows passing of onSuccess, onError, options etc.
  // wrap the fetch function in a generic fetchHandler to hardcode the variables for mutateWithBody
  // pass the variable in as argument
  function fetchHandler(userEmail) {
    return mutateWithBody({
      method: 'POST',
      url: `${baseUrl}/api/vendor/vendor-check`,
      body: { email: userEmail },
    });
  }

  return useMutation(fetchHandler);
};

export const useSendSigninCode = (
  signIn,
  setIsCodeInput,
  handleForeignAlert,
  createAlerts,
) => {
  const { mutate: checkIfVendor } = useCheckIfVendor();
  const sendCodeHandler = async (userEmail) => {
    checkIfVendor(userEmail, {
      onSuccess: async (data) => {
        try {
          await signIn.create({
            identifier: userEmail,
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
    });
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

export const useUploadGarmentImage = () => {
  const { mutateAsync: getPresignedUrls } = useGetPresignedUrls();
  const { mutateAsync: uploadImageToS3 } = useUploadImageToS3();

  const { mutate, status } = useMutation(async (image) => {
    const urlData = await getPresignedUrls({
      url: `${baseUrl}/api/util/get-s3-urls`,
      method: 'POST',
      inputs: { ext: image.type.split('/')[1] },
    });
    console.log('useUploadGarmentImage > urlData', { urlData });
    const uploadData = await uploadImageToS3({
      url: urlData.uploadUrl,
      method: 'PUT',
      inputs: image,
    });
    return { url: urlData.hostedUrl, key: urlData.key };
  });

  return { mutate, status };
};

export const useDeleteS3Object = () => useMutation(mutateWithBody);

export const useDeleteGarmentImage = () =>
  useMutation((imageToDelete) =>
    mutateWithBody({
      url: `${baseUrl}/api/util/delete-image`,
      method: 'DELETE',
      body: { key: imageToDelete.key },
    }),
  );

export const useDeleteGarmentMutation = ({ queryClient, router }) => {
  const deleteGarmentHandler = (garmentId) =>
    mutateWithBody({
      url: `${baseUrl}/api/vendor/garment/delete`,
      method: METHODS.DELETE,
      body: {
        garmentId,
      },
    });

  return useMutation(deleteGarmentHandler, {
    onSuccess: () => {
      queryClient.invalidateQueries('vendor-profile');
      router.push(APP_URLS.vendorManage, undefined, { shallow: true });
    },
  });
};

export const useEditGarmentMutation = (queryClient) => {
  const editGarmentHandler = (formValues) =>
    mutateWithBody({
      url: `${baseUrl}/api/vendor/garment/edit`,
      method: 'PUT',
      body: formValues,
    });

  return useMutation(editGarmentHandler, {
    onSuccess: () => {
      queryClient.invalidateQueries('vendor')
    },
  });
};

export const useSaveGarment = () => useMutation(mutateWithBody);

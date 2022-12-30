/* eslint-disable import/prefer-default-export */
import { useMutation } from 'react-query';

// dont use try/catch with useMutation, bc that 'handles' the error and returns a successful mutation.
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
    body: config.inputs
  };
  const response = await fetch(config.url, fetchOptions);
  if (!response.ok || !(response.status in { 200: null, 201: null })) {
    const error = new Error('Upload to AWS S3 bucket failed');
    throw error;
  }
  return response
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

export const useSimpleMutation = () => useMutation(mutateWithInput);

export const useGetPresignedUrls = () => useMutation(mutateWithInput)

export const useUploadImageToS3 = () => useMutation(uploadToS3)
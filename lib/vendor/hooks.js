/* eslint-disable import/prefer-default-export */
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import {
  baseUrl,
  GARMENT_SEX_TYPES,
  GARMENT_TYPES,
  GARMENT_TYPES_KEYS,
} from '../constants';
import { useGetPresignedUrls, useUploadImageToS3 } from './mutations';
import { useGetVendorProfile } from './queries'
import { initGarmentMeas, inputValuesInvalid } from '../util-client'

export const usePrepGarmentDetail = () => {
  const router = useRouter();
  const [curId, setCurId] = useState();

  useEffect(() => {
    if (!router.isReady) return;
    setCurId(() => router.query.garmentId);
  }, [router]);

  return { curId };
};

export const useAllVendorGarments = () => {
  const { data, isLoading, isError } = useGetVendorProfile();
  const [vendorData, setVendorData] = useState();

  useEffect(() => {
    if (data) {
      setVendorData(() => data.vendor);
    }
  }, [data]);

  return {
    vendorData,
    allGarments: vendorData?.vendorProfile?.garments,
    isLoading,
    isError,
  };
};

export const useUploadGarmentImage = () => {
  const { mutateAsync: getPresignedUrls } = useGetPresignedUrls();
  const { mutateAsync: uploadImageToS3 } = useUploadImageToS3();

  const {
    mutate: uploadGarmentImage,
    isLoading,
    isSuccess,
  } = useMutation(async (image) => {
    const urlData = await getPresignedUrls({
      url: `${baseUrl}/api/util/get-s3-urls`,
      method: 'POST',
      inputs: { ext: image.type.split('/')[1] },
    });
    console.log(urlData);
    const uploadData = await uploadImageToS3({
      url: urlData.uploadUrl,
      method: 'PUT',
      inputs: image,
    });
    console.log(uploadData);
    return urlData.uploadUrl;
  });

  return { uploadGarmentImage, isLoading, isSuccess };
};

export const useExistingGarment = (garment) => {
  const [images, setImages] = useState(garment.images);
  const [infoValues, setInfoValues] = useState({
    name: garment.name,
    description: garment.description,
    modelNumber: garment.modelNumber,
    sex: garment.sex,
    garmentType: garment.garmentType,
  });
  const [measValues, setMeasValues] = useState(() => {
    if (garment) {
      const { numsModel } = GARMENT_TYPES.get(infoValues.garmentType).numsModel;
      const existingGarmentNums = garment[numsModel];
      return existingGarmentNums;
    }
    return initGarmentMeas(GARMENT_TYPES.get(infoValues.garmentType).nums);
  });

  return {
    images,
    setImages,
    infoValues,
    setInfoValues,
    measValues,
    setMeasValues,
  };
};

export const useFullGarmentDetails = () => {
  const [images, setImages] = useState([]);
  const [infoValues, setInfoValues] = useState({
    name: '',
    description: '',
    modelNumber: '',
    sex: GARMENT_SEX_TYPES[0],
    garmentType: GARMENT_TYPES_KEYS[0],
  });
  const [measValues, setMeasValues] = useState(() =>
    initGarmentMeas(GARMENT_TYPES.get(infoValues.garmentType).measKeys)
  );

  const setGarmentType = (val) => {
    setInfoValues((prev) => ({ ...prev, garmentType: val }));
  };

  const setGarmentSex = (val) => {
    setInfoValues((prev) => ({ ...prev, sex: val }));
  };

  const garmentDetailsIncomplete = () => {
    // infoValues, numValues, images
    const checks = [infoValues, measValues].map((input) =>
      inputValuesInvalid(input),
    );
    return checks.includes(true);
  };

  useEffect(() => {
    setMeasValues(() =>
      initGarmentMeas(GARMENT_TYPES.get(infoValues.garmentType).measKeys),
    );
  }, [infoValues.garmentType]);

  return {
    infoValues,
    setInfoValues,
    measValues,
    setMeasValues,
    images,
    setImages,
    setGarmentType,
    setGarmentSex,
    garmentDetailsIncomplete,
  };
};

export const useAlerts = () => {
  class Alert {
    constructor(message, isError = true) {
      this.message = message;
      this.timeStamp = Date.now();
      this.isError = isError;
    }
  }
  // reqErrors = [{ message(string), error(bool), timestamp(string) }]
  const [alerts, setAlerts] = useState([]);
  const resetAlerts = () => {
    setAlerts(() => []);
  };

  const createAlerts = (messages, isError = true) => {
    // loop through returned errors, creating timestamps and pushing to array that gets set to setAlerts
    // error format = { message, timestamp, error(bool) }
    // error.error === false means its not an error, will display differently.
    const rawAlerts = Array.isArray(messages) ? messages : [messages];
    const formattedAlerts = rawAlerts.map((alert) => new Alert(alert, isError));
    setAlerts(() => formattedAlerts);
  };

  const handleForeignAlert = (customMsg, error = null) => {
    // try to grab error props
    const message = error.message ? error.message : customMsg;
    const formattedAlert = new Alert(message, true);
    setAlerts(() => [formattedAlert]);
  };

  return { alerts, resetAlerts, createAlerts, handleForeignAlert };
};

export const useFilterProfile = (profile) => {
  const {
    id: lowerId,
    userId: lowerUserId,
    updatedAt: lowerUpdatedAt,
    ...lowerNums
  } = profile.lowerBody;

  const {
    id: upperId,
    userId: upperUserId,
    updatedAt: upperUpdatedAt,
    ...upperNums
  } = profile.upperBody;

  const bodyMap = new Map([
    [
      'lower',
      { nums: lowerNums, updatedAt: lowerUpdatedAt, param: 'lowerBody' },
    ],
    [
      'upper',
      { nums: upperNums, updatedAt: upperUpdatedAt, param: 'upperBody' },
    ],
  ]);

  return bodyMap;
};

/* eslint-disable import/prefer-default-export */
import React, { useState, useEffect } from 'react';
import { useQueryClient } from 'react-query';
import { useRouter } from 'next/router';
import {
  GARMENT_SEX_TYPES,
  GARMENT_TYPES,
  GARMENT_TYPES_KEYS,
} from '../constants';
import { initGarmentMeas, inputValuesInvalid } from '../util-client';
import { useDeleteGarmentMutation, useEditGarmentMutation } from './mutations';

export const useFilterVendorGarments = (garments) => {
  const [searchStr, setSearchStr] = useState('');
  const [filter, setFilter] = useState(null);

  const searchGarmentHandler = ({ query, garmentName }) => {
    const regex = new RegExp(query, 'gi');
    return garmentName.match(regex);
  };

  let filteredGarmentsList = filter
    ? garments.filter((garment) => garment.garmentType === filter)
    : garments;

  filteredGarmentsList =
    searchStr.length > 0
      ? filteredGarmentsList.filter((garment) =>
          searchGarmentHandler({ query: searchStr, garmentName: garment.name }),
        )
      : filteredGarmentsList;

  return { searchStr, setSearchStr, filter, setFilter, filteredGarmentsList };
};

export const useManageGarmentMutations = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { mutate: deleteGarment, status: deleteStatus } =
    useDeleteGarmentMutation({ queryClient, router });
  const { mutate: editGarment, status: editStatus } =
    useEditGarmentMutation(queryClient);

  return {
    deleteGarment,
    editGarment,
    deleteStatus,
    editStatus,
    queryClient,
    router,
  };
};

export const usePrepGarmentDetail = () => {
  const router = useRouter();
  const [curId, setCurId] = useState();

  useEffect(() => {
    if (!router.isReady) return;
    setCurId(() => router.query.garmentId);
  }, [router]);

  return { curId };
};

export const useExistingGarment = (garment) => {
  const [images, setImages] = useState(garment.images);
  const [infoValues, setInfoValues] = useState({
    name: garment.name,
    description: garment.description,
    modelNumber: garment.modelNumber,
    sex: garment.sex,
    garmentType: garment.garmentType,
    link: garment.link,
  });
  const [measValues, setMeasValues] = useState(() => {
    const { measModel } = GARMENT_TYPES.get(infoValues.garmentType);
    const { id, garmentId, ...measurements } = garment[measModel];
    return measurements;
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
    link: '',
  });
  const [measValues, setMeasValues] = useState(() =>
    initGarmentMeas(GARMENT_TYPES.get(infoValues.garmentType).measKeys),
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

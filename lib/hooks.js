/* eslint-disable import/prefer-default-export */
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

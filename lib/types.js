/* eslint-disable import/prefer-default-export */
import PropTypes from 'prop-types';

const str = PropTypes.string;

export const garmentImage = PropTypes.shape({
  garmentId: str,
  id: str,
  url: str,
});

export const fullLowerBodyGarment = PropTypes.shape({
  id: str,
  name: str,
  sex: str,
  description: str,
  modelNumber: str,
  garmentType: str,
  updatesAt: str,
  vendorId: str,
  lowerBodyGarmentMeasurements: PropTypes.shape({
    waist: str,
    hip: str,
    seat: str,
    thigh: str,
    calf: str,
    inseam: str,
    outseam: str,
    legOpening: str,
  }),
  images: PropTypes.arrayOf(garmentImage),
});

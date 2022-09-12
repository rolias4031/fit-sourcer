/* eslint-disable import/prefer-default-export */
export const ERRORS = {
  METHOD_NOT_ALLOWED: 'Method not allowed',
  EMAIL_TAKEN: 'Email taken',
  USER_NOT_FOUND: 'User not found',
  NOT_FOUND: 'Not Found',
  BAD_CREDS: 'Bad credentials',
  SIGNED_OUT: 'You are signed out',
  VALIDATION_FAILED: 'Validation failed',
  UNAUTHORIZED: 'Unauthorized'
};

export const SUCCESS = {
  DELETE: 'Delete successful',
  NEW_USER: 'New user created',
};

export const METHODS = {
  POST: 'POST',
  GET: 'GET',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

// object that contains common keys used in state & body objects throughout the app
export const ST8_KEYS = {
  email: 'email',
  firstName: 'firstName',
  lastName: 'lastName',
  confirm: 'confirm'
}

export const defaultLowerBody = {
  waist: 0,
  hip: 0,
  seat: 0,
  thigh: 0,
  calf: 0,
  inseam: 0,
  outseam: 0,
}

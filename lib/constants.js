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

export const ALERT_LOC_IDS = {
  DELETE_USER_CONTAINER: 'DELETE_USER_CONTAINER',
  EDIT_BODY_CONTAINER: 'EDIT_BODY_CONTAINER',
  CREATE_GARMENT_CONTAINER: 'CREATE_GARMENT_CONTAINER',
  VENDOR_APP_CONTAINER: 'VENDOR_APP_CONTAINER'
}

export const BODY_MODELS_OBJ = {
  lowerBody: 'lowerBody',
  upperBody: 'upperBody',
}

export const BODY_MODELS_ARR = Object.values(BODY_MODELS_OBJ)
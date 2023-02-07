/* eslint-disable import/prefer-default-export */
export const baseUrl = 'http://localhost:3000';
export const s3BucketBaseUrl = 'https://fitsourcer-files.s3.amazonaws.com'
export const APP_URLS = {
  vendorSignout: `${baseUrl}/vendor/signout`,
  vendorManage: `${baseUrl}/vendor/manage`,
  userHome: `${baseUrl}/user/home`,
  userProfile: `${baseUrl}/user/profile`
}

export const USER_ROLES = {
  user: 'user',
  vendor: 'vendor',
  admin: 'admin',
}

export const GARMENT_SEX_TYPES = ['men', 'women', 'unisex'];

export const GARMENT_TYPES = new Map([
  [
    'pant',
    {
      type: 'pant',
      measModel: 'lowerBodyGarmentMeasurements',
      measKeys: [
        'waist',
        'hip',
        'seat',
        'thigh',
        'calf',
        'inseam',
        'outseam',
        'legOpening',
      ],
    },
  ],
  [
    'short',
    {
      type: 'short',
      measModel: 'lowerBodyGarmentMeasurements',
      measKeys: [
        'waist',
        'hip',
        'seat',
        'thigh',
        'inseam',
        'outseam',
        'legOpening',
      ],
    },
  ],
]);

export const GARMENT_TYPES_KEYS = Array.from(GARMENT_TYPES.keys())


export const VENDOR_PROFILE_STATUSES = {
  pending: 'pending',
  approved: 'approved'
}

export const ERRORS = {
  METHOD_NOT_ALLOWED: 'Method not allowed',
  EMAIL_TAKEN: 'Email taken',
  USER_NOT_FOUND: 'User not found',
  NOT_FOUND: 'Not Found',
  BAD_CREDS: 'Bad credentials',
  SIGNED_OUT: 'You are signed out',
  VALIDATION_FAILED: 'Validation failed',
  UNAUTHORIZED: 'Unauthorized',
  UKNOWN_PRISMA: 'Prisma error'
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
  confirm: 'confirm',
};

export const ALERT_LOC_IDS = {
  DELETE_USER_CONTAINER: 'DELETE_USER_CONTAINER',
  EDIT_BODY_CONTAINER: 'EDIT_BODY_CONTAINER',
  CREATE_GARMENT_CONTAINER: 'CREATE_GARMENT_CONTAINER',
  VENDOR_APP_CONTAINER: 'VENDOR_APP_CONTAINER',
  CREATE_ADMIN_CONTAINER: 'CREATE_ADMIN_CONTAINER',
};

export const BODY_MODELS_OBJ = {
  lowerBody: 'lowerBody',
  upperBody: 'upperBody',
};

export const BODY_MODELS_ARR = Object.values(BODY_MODELS_OBJ);

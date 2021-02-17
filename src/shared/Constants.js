export const GOOGLE_SIGN_IN_CONFIG = {
  webClientId:
    '806630784909-tgc9pms99p2rnsqgvihrao7bmgi2guce.apps.googleusercontent.com',
  offlineAccess: true,
  hostedDomain: '',
  forceConsentPrompt: true,
};

export const SPINNER_COLOR = 'orange';
export const SPINNER_SIZE_LG = 80;
export const SPINNER_SIZE_SM = 30;
export const SPINNER_STYLE_CENTERED = {flex: 1, justifyContent: 'center'};
export const ERROR_MESSAGE = 'Error message';
export const INVALID_INPUTS = 'Invalid inputs!';
export const SUCCESSFUL_MESSAGE = 'Successfully updated!';
export const PROFILE_IMAGE_UPDATED = 'Profile image successfully updated!';
export const DATA_SUBMITTED = 'Data successfully Submitted!';
export const CATEGORIES = 'categories';
export const FACE_TO_FACE = 'Face to Face';
export const ONLINE = 'Online';

export const STATUS = 'status';
export const ORDER__STATUS = 'orderStatus';
export const UPDATED_AT = 'updatedAt';
export const CREATED_AT = 'createdAt';
export const USER_ID = 'userID';
export const IS_BEST = 'is_best';
export const IS_ORDERED = 'isOrdered';

export const ORDER_STATUS = [
  {name: 'PENDING'},
  {name: 'ACCEPTED'},
  {name: 'REJECTED'},
  {name: 'SHIPPED'},
  {name: 'DELIVERED'},
];

export const ORDER_BY = {
  DESC: 'desc',
  ASC: 'asc',
};

export const OPERATOR = {
  EQ: '==',
  IN: 'in',
  ARRAY_CONTAINS_ANY: 'array-contains-any',
};

export const FIRESTORE_COLLECTIONS = {
  USERS: 'userss',
  CAKES: 'cakes',
  SHOPPING_CART: 'shopping-cart',
  ORDERS: 'orders',
  CATEGORY: 'category',
  COMMENTS: 'comments',
  DECOR_GALLERY: 'decor-gallery',
  DECOR_GALLERY_ITEM: 'decor-gallery-item',
  TRAINING_WORKSHOPS: 'training-workshop',
  TRAINING_CATEGORY: 'training-category',
};

export const COMMENT_TYPE = {
  FEEDBACK: 'FEEDBACK',
  ITEM: 'ITEM',
  TRAINING: 'TRAINING',
};

export const FIREBASE_STORAGE_FOLDER = {
  USER_PROFILES: 'user-profiles',
  CAKES_IMAGES: 'cake-images',
  DECOR_GALLERY_IMAGES: 'decor-gallery',
  TRAINING_WORKSHOP_IMAGES: 'training-workshop',
};

export const ADMIN_MANAGEMENT_LIST = [
  {
    name: FIRESTORE_COLLECTIONS.CAKES,
    category: FIRESTORE_COLLECTIONS.CATEGORY,
    photoFolder: FIREBASE_STORAGE_FOLDER.CAKES_IMAGES,
  },
  {
    name: FIRESTORE_COLLECTIONS.CATEGORY,
    category: null,
  },
  {
    name: FIRESTORE_COLLECTIONS.DECOR_GALLERY_ITEM,
    category: FIRESTORE_COLLECTIONS.DECOR_GALLERY,
    photoFolder: FIREBASE_STORAGE_FOLDER.DECOR_GALLERY_IMAGES,
  },
  {
    name: FIRESTORE_COLLECTIONS.DECOR_GALLERY,
    category: null,
  },
  {
    name: FIRESTORE_COLLECTIONS.TRAINING_WORKSHOPS,
    category: FIRESTORE_COLLECTIONS.TRAINING_CATEGORY,
    photoFolder: FIREBASE_STORAGE_FOLDER.TRAINING_WORKSHOP_IMAGES,
  },
  {
    name: FIRESTORE_COLLECTIONS.TRAINING_CATEGORY,
    category: null,
  },
  {
    name: FIRESTORE_COLLECTIONS.ORDERS,
    category: null,
  },
  {
    name: FIRESTORE_COLLECTIONS.COMMENTS,
    category: null,
  },
];

export const SOCIAL_MEDIA = {
  INSTAGRAM: 'https://www.instagram.com/sugars.cake/',
  FACEBOOK: 'https://www.facebook.com/sugarscakes198',
  EMAIL: 'mailto:sugarscake18@gmail.com',
};

export const ADD_USER_INFO = 'ADD_USER_INFO';
export const LOADING_FALSE = 'LOADING_FALSE';
export const LOADING_TRUE = 'LOADING_TRUE';
export const UPDATE_USER_EMAIL = 'UPDATE_USER_EMAIL';

export const addUserInfo = (user, id) => ({
  type: ADD_USER_INFO,
  payload: {
    id,
    user,
  },
});

export const updateUserEmail = (email, id) => ({
  type: UPDATE_USER_EMAIL,
  payload: {
    id,
    email,
  },
});

export const loadingFalse = () => ({
  type: LOADING_FALSE,
});

export const loadingTrue = () => ({
  type: LOADING_TRUE,
});

export const ADD_USER_INFO = 'ADD_USER_INFO';

export const addUserInfo = (user, id) => ({
  type: ADD_USER_INFO,
  payload: {
    id,
    user,
  },
});

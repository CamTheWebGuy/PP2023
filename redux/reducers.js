import { ADD_USER_INFO } from './actions';

const initialState = {
  userInfo: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER_INFO: {
      const { user, id } = action.payload;
      return {
        ...state,
        userInfo: [...state.userInfo, { user, id }],
      };
    }
    default:
      return state;
  }
};

export default userReducer;

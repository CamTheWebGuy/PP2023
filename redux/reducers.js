import {
  ADD_USER_INFO,
  LOADING_FALSE,
  LOADING_TRUE,
  UPDATE_USER_EMAIL,
} from './actions';

const initialState = {
  userInfo: [],
  loading: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER_INFO: {
      const { user, id } = action.payload;
      return {
        ...state,
        userInfo: [{ user, id }],
      };
    }
    case UPDATE_USER_EMAIL: {
      const { email, id } = action.payload;
      const currentUser = state.userInfo[0].user;
      const updatedUser = {
        ...currentUser,
        email: email, // Update the email property
      };
      return {
        ...state,
        userInfo: [{ user: updatedUser, id }],
      };
    }
    case LOADING_TRUE: {
      return {
        ...state,
        loading: true,
      };
    }
    case LOADING_FALSE: {
      return {
        ...state,
        loading: false,
      };
    }
    default:
      return state;
  }
};

export default userReducer;

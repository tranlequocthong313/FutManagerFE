import { ADMIN_ROLE } from "../configs/constants";

export const USER_ACTION_TYPE = {
  LOGIN: "LOGIN",
  CURRENT: "CURRENT",
  LOGOUT: "LOGOUT",
};

export const initialUserState = {
  isLoggedIn: false,
  isAdmin: false,
};

const userReducer = (state, action) => {
  console.group(action.type);
  console.log(action);
  console.groupEnd();
  switch (action.type) {
    case USER_ACTION_TYPE.LOGIN:
      return {
        ...state,
        ...action.payload,
        isLoggedIn: true,
        isAdmin: action.payload.role === ADMIN_ROLE,
      };
    case USER_ACTION_TYPE.CURRENT:
      return {
        ...state,
        ...action.payload,
        isLoggedIn: true,
        isAdmin: action.payload.role === ADMIN_ROLE,
      };
    case USER_ACTION_TYPE.LOGOUT:
      return initialUserState;
    default:
      return state;
  }
};

export default userReducer;

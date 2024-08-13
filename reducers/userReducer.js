import AsyncStorage from "@react-native-async-storage/async-storage";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "../configs/constants";

export const USER_ACTION_TYPE = {
  LOGIN: 0,
  CURRENT: 1,
  LOGOUT: 2,
};

export const initialUserState = {
  isLoggedIn: false,
};

const userReducer = (state, action) => {
  switch (action.type) {
    case USER_ACTION_TYPE.LOGIN:
      return {
        ...state,
        ...action.payload,
        isLoggedIn: true,
      };
    case USER_ACTION_TYPE.CURRENT:
      return {
        ...state,
        ...action.payload,
        isLoggedIn: true,
      };
    case USER_ACTION_TYPE.LOGOUT:
      return initialUserState;
    default:
      return state;
  }
};

export default userReducer;

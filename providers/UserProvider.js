import React, { useEffect } from "react";
import { useReducer } from "react";
import { UserContext, UserDispatchContext } from "../contexts/UserContext";
import userReducer, {
  USER_ACTION_TYPE,
  initialUserState,
} from "../reducers/userReducer";
import { authHTTP, userEndpoints } from "../configs/apis";
import * as RootNavigation from "../utils/RootNavigation";

export default function UserProvider({ children }) {
  const [user, dispatch] = useReducer(userReducer, initialUserState);

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const res = await (await authHTTP()).get(userEndpoints.current);
        if (res.status === 200) {
          dispatch({ type: USER_ACTION_TYPE.CURRENT, payload: res.data });
        } else {
          RootNavigation.navigate("Login");
        }
      } catch (error) {
        console.error(error);
        RootNavigation.navigate("Login");
      }
    };
    getCurrentUser();
  }, []);

  return (
    <UserContext.Provider value={user}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserContext.Provider>
  );
}

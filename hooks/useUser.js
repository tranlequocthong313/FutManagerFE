import { useContext } from "react";
import { UserContext, UserDispatchContext } from "../contexts/UserContext";

export const useUser = () => useContext(UserContext);

export const useUserDispatch = () => useContext(UserDispatchContext);

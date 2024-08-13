import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { ACCESS_TOKEN_KEY } from "./constants";
import * as RootNavigation from "../utils/RootNavigation";

// const baseURL = "https://futmanagerbe.onrender.com"; // TODO: change this before pushing to github
const baseURL = "http://192.168.1.175:8000";

export const userEndpoints = {
  login: "/users/login/",
  register: "/users/register/",
  current: "/users/current/",
};

export const notificationEndpoints = {
  notifications: "/notifications/",
  readNotification: "/notifications/read/",
  sendFcmToken: "/fcm-tokens/",
  deleteFcmToken: (id) => `/fcm-tokens/${id}`,
};

export const authHTTP = async () => {
  const token = await AsyncStorage.getItem(ACCESS_TOKEN_KEY);
  if (!token) {
    RootNavigation.navigate("Login");
    throw new Error("Where is your token at 🥺");
  }
  return axios.create({
    baseURL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const HTTP = axios.create({
  baseURL,
});

export default HTTP;

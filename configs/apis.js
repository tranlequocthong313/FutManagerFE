import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { ACCESS_TOKEN_KEY } from "./constants";
import * as RootNavigation from "../utils/RootNavigation";

const baseURL = "https://futmanagerbe.onrender.com";

export const userEndpoints = {
  login: "/users/login/",
  register: "/users/register/",
  current: "/users/current/",
};

export const fieldEndpoints = {
  fields: "/fields",
  book: (id) => `/fields/${id}/book/`,
  bookings: (id) => `/fields/${id}/bookings/`,
};

export const notificationEndpoints = {
  notifications: "/notifications/",
  readNotification: "/notifications/read/",
  sendFcmToken: "/fcm-tokens/",
  deleteFcmToken: (id) => `/fcm-tokens/${id}/`,
};

export const statsEndpoints = {
  revenue: "/fields/revenue/stats/",
  status: (id) => `/fields/${id}/statuses/stats/`,
  review: (id) => `/fields/${id}/ratings/stats/`,
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

import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { ACCESS_TOKEN_KEY } from "./constants";

const baseURL = "https://futmanagerbe.onrender.com";

export const userEndpoints = {
  login: "/users/login/",
  register: "/users/register/",
  current: "/users/current/",
};

export const authHTTP = async () => {
  const token = await AsyncStorage.getItem(ACCESS_TOKEN_KEY);
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

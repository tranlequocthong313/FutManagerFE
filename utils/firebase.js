import AsyncStorage from "@react-native-async-storage/async-storage";
import { authHTTP, notificationEndpoints } from "../configs/apis";
import { FCM_TOKEN_KEY } from "../configs/constants";

async function saveTokenToDatabase(token) {
  const storedToken = JSON.parse(await AsyncStorage.getItem(FCM_TOKEN_KEY));
  if (token !== storedToken?.token) {
    try {
      const r = await (
        await authHTTP()
      ).post(notificationEndpoints.sendFcmToken, {
        token,
      });
      if (r.status === 201) {
        await AsyncStorage.setItem(FCM_TOKEN_KEY, JSON.stringify(r.data));
      }
    } catch (error) {
      console.error(error);
    }
  }
}

export default saveTokenToDatabase;

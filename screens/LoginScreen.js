import React, { useContext, useState } from "react";
import { View, Text, ImageBackground, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomInput from "../components/CustomInput"; // Sửa lại đường dẫn
import CustomButton from "../components/CustomButton"; // Sửa lại đường dẫn
import CheckBox from "react-native-check-box";
import HTTP, { userEndpoints } from "../configs/apis";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "../configs/constants";
import { UserContext, UserDispatchContext } from "../contexts/UserContext";
import { USER_ACTION_TYPE } from "../reducers/userReducer";

const LoginScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showClearUsernameIcon, setShowClearUsernameIcon] = useState(false);
  const [showPasswordVisibilityIcon, setShowPasswordVisibilityIcon] =
    useState(false);
  const [hideVisibilityPassword, setHidePasswordVisibility] = useState(true);
  const dispatch = useContext(UserDispatchContext);
  const user = useContext(UserContext);

  const onChangePhoneNumber = (text) => {
    setPhoneNumber(text);
    setShowClearUsernameIcon(phoneNumber !== "");
  };

  const onChangePassword = (text) => {
    setPassword(text);
    setShowPasswordVisibilityIcon(text !== "");
  };

  const onClickClearUsernameIcon = () => {
    setShowClearUsernameIcon(false);
    setPhoneNumber("");
  };

  const onClickPasswordVisibilityIcon = () => {
    setHidePasswordVisibility((prev) => !prev);
  };

  const login = async () => {
    try {
      const res = await HTTP.post(userEndpoints.login, {
        username: phoneNumber,
        password,
      });
      if (res.status === 200) {
        await AsyncStorage.setItem(ACCESS_TOKEN_KEY, res.data.tokens.access);
        await AsyncStorage.setItem(REFRESH_TOKEN_KEY, res.data.tokens.refresh);
        dispatch({
          type: USER_ACTION_TYPE.LOGIN,
          payload: res.data.user,
        });

        navigation.reset({
          index: 0,
          routes: [{ name: "BottomTabNavigation" }],
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ImageBackground
      source={require("../asset/Loginbackground.jpg")}
      style={styles.background}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Đăng nhập</Text>

        <View style={styles.inputs}>
          <CustomInput
            label="Số điện thoại"
            value={phoneNumber}
            onChangeText={onChangePhoneNumber}
            icon="clear"
            styleIcon={{
              backgroundColor: "#000",
              color: "#fff",
              borderRadius: 50,
            }}
            size={18}
            showIcon={showClearUsernameIcon}
            onClickIcon={onClickClearUsernameIcon}
          />
          <CustomInput
            label="Mật khẩu"
            value={password}
            onChangeText={onChangePassword}
            secureTextEntry={hideVisibilityPassword}
            icon={hideVisibilityPassword ? "visibility-off" : "visibility"} // visibility-off
            size={24}
            showIcon={showPasswordVisibilityIcon}
            onClickIcon={onClickPasswordVisibilityIcon}
          />
        </View>

        <View style={styles.rememberMeContainer}>
          <CheckBox
            isChecked={rememberMe}
            onClick={() => setRememberMe((prev) => !prev)}
            checkBoxColor="#05834E"
            checkedCheckBoxColor="#05834E"
          />
          <Text style={styles.rememberMeText}>Nhớ tài khoản</Text>
        </View>

        <CustomButton
          title="Đăng Nhập"
          onPress={login}
          style={styles.loginButton}
        />

        <Text style={styles.registerText}>
          Bạn chưa có tài khoản?{" "}
          <Text
            style={styles.registerLink}
            onPress={() => navigation.navigate("Register")}
          >
            Đăng ký
          </Text>
        </Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    color: "#05834E",
  },
  overlay: {
    width: "90%",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: 20,
    borderRadius: 10,
    color: "#05834E",
    minHeight: "60%",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "left",
    color: "#05834E",
  },
  inputs: {
    marginTop: 30,
    marginBottom: 20,
  },
  rememberMeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 36,
    color: "#05834E",
  },
  rememberMeText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#05834E",
    fontWeight: "bold",
  },
  loginButton: {
    backgroundColor: "#05834E",
    borderRadius: 16,
    width: "80%",
    margin: "auto",
    borderColor: "#fff",
    borderWidth: 1,
  },
  registerText: {
    textAlign: "center",
    color: "#000",
    marginTop: 20,
    marginBottom: 60,
  },
  registerLink: {
    color: "#05834E",
    fontWeight: "bold",
  },
});

export default LoginScreen;

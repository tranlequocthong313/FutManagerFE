import React, { useState } from 'react';
import { View, Text, ImageBackground, StyleSheet, CheckBox } from 'react-native';
import CustomInput from '../components/CustomInput';  // Sửa lại đường dẫn
import CustomButton from '../components/CustomButton';  // Sửa lại đường dẫn
// import loginBackground from '../asset/Loginbackground'

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <ImageBackground
      // source={loginBackground}
      style={styles.background}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Đăng nhập</Text>
        
        <CustomInput
          placeholder="Số điện thoại hoặc email"
          value={email}
          onChangeText={setEmail}
        />
        <CustomInput
          placeholder="Mật khẩu"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <View style={styles.rememberMeContainer}>
          {/* <CheckBox
            value={rememberMe}
            onValueChange={setRememberMe}
          /> */}
          <Text style={styles.rememberMeText}>Nhớ tài khoản</Text>
        </View>

        <CustomButton
          title="Đăng Nhập"
          onPress={() => alert('Đăng nhập')}
        />

        <Text style={styles.registerText}>
          Bạn chưa có tài khoản? <Text style={styles.registerLink}>Đăng ký</Text>
        </Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    width: '80%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  rememberMeText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  registerText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#333',
  },
  registerLink: {
    color: '#2D9CDB',
    fontWeight: 'bold',
  },
});

export default LoginScreen;

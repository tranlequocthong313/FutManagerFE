import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import RegisterInput from '../components/RegisterInput';
import RegisterButton from '../components/RegisterButton';
// import loginBackground from '../asset/Loginbackground'

const RegisterScreen = ({ navigation }) => {
  return (
    <ImageBackground
      // source={loginBackground} // Đặt link ảnh nền
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Đăng Ký</Text>
        
        <RegisterInput placeholder="Số điện thoại hoặc email" icon="close" />
        <RegisterInput placeholder="Tên đầy đủ" icon="close" />
        <RegisterInput placeholder="Mật khẩu" icon="eye" secureTextEntry={true} />
        <RegisterInput placeholder="Nhập lại mật khẩu" icon="eye" secureTextEntry={true} />
        
        <RegisterButton title="Đăng Ký" onPress={() => { /* Xử lý đăng ký */ }} />
        <Text style={styles.loginText}>
          Bạn đã có tài khoản?{' '}
          <Text style={styles.loginLink} onPress={() => navigation.navigate('Login')}>
            Đăng nhập
          </Text>
        </Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 20,
    margin: 10,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  loginText: {
    marginTop: 20,
    color: '#000',
  },
  loginLink: {
    color: '#0066cc',
    fontWeight: 'bold',
  },
});

export default RegisterScreen;

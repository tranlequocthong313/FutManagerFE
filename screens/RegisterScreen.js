import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
// import loginBackground from '../asset/Loginbackground'

const RegisterScreen = () => {
  return (
    <ImageBackground
      // source={loginBackground} // Đặt link ảnh nền
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Đăng Ký</Text>
        
        <Text style={styles.loginText}>
          Bạn đã có tài khoản?{' '}
          <Text style={styles.loginLink} onPress={() => { } }>
            Đăng nhập
          </Text>
        </Text>
      </View>
    </ImageBackground>
  );
}

export default RegisterScreen;

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


import React, { useState } from 'react';
import { View, Text, ImageBackground, StyleSheet, Alert } from 'react-native';
import CustomInput from '../components/CustomInput';  // Sửa lại đường dẫn
import CustomButton from '../components/CustomButton';  // Sửa lại đường dẫn
import { useNavigation } from '@react-navigation/native';
import validator from 'validator';
import HTTP, { userEndpoints } from '../configs/apis';

const RegisterScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showClearPhoneNumberIcon, setShowClearPhoneNumberIcon] = useState(false);
  const [showClearEmailIcon, setShowClearEmailIcon] = useState(false);
  const [showClearFullNameIcon, setShowClearFullNameIcon] = useState(false);
  const [showPasswordVisibilityIcon, setShowPasswordVisibilityIcon] = useState(false);
  const [showConfirmPasswordVisibilityIcon, setShowConfirmPasswordVisibilityIcon] = useState(false);
  const [hideVisibilityPassword, setHidePasswordVisibility] = useState(true);
  const [hideVisibilityConfirmPassword, setHideConfirmPasswordVisibility] = useState(true);
  const navigation = useNavigation(); 

  const onChangePhoneNumber = (text) => {
    setPhoneNumber(text);
    setShowClearPhoneNumberIcon(text !== '');
  };

  const onChangeEmail = (text) => {
    setEmail(text);
    setShowClearEmailIcon(text !== '');
  };

  const onChangeFullName = (text) => {
    setFullName(text);
    setShowClearFullNameIcon(text !== '');
  };

  const onChangePassword = (text) => {
    setPassword(text);
    setShowPasswordVisibilityIcon(text !== '');
  };

  const onChangeConfirmPassword = (text) => {
    setConfirmPassword(text);
    setShowConfirmPasswordVisibilityIcon(text !== '');
  };

  const onClickClearPhoneNumberIcon = () => {
    setShowClearPhoneNumberIcon(false);
    setPhoneNumber('');
  };

  const onClickClearEmailIcon = () => {
    setShowClearEmailIcon(false);
    setEmail('');
  };

  const onClickClearFullNameIcon = () => {
    setShowClearFullNameIcon(false);
    setFullName('');
  };

  const onClickPasswordVisibilityIcon = () => {
    setHidePasswordVisibility(prev => !prev);
  };

  const onClickConfirmPasswordVisibilityIcon = () => {
    setHideConfirmPasswordVisibility(prev => !prev);
  };

  const handleRegister = async () => {
    // Kiểm tra định dạng email và số điện thoại
    if (!validator.isEmail(email)) {
      Alert.alert('Lỗi', 'Email không hợp lệ');
      return;
    }
    if (!validator.isMobilePhone(phoneNumber, 'any', { strictMode: false })) {
      Alert.alert('Lỗi', 'Số điện thoại không hợp lệ');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Lỗi', 'Mật khẩu xác nhận không khớp');
      return;
    }

    try {
      // Gửi yêu cầu đăng ký với dữ liệu JSON
      await HTTP.post(userEndpoints['register'], {
        phone_number: phoneNumber,
        email,
        full_name: fullName,
        password,
      });
      Alert.alert('Thành công', 'Đăng ký thành công');
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Lỗi', 'Đăng ký không thành công');
    }
  };
  
  return (
    <ImageBackground
      source={require('../asset/Loginbackground.jpg')} // Sửa lại đường dẫn
      style={styles.background}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Đăng ký</Text>

        <View style={styles.inputs}>
        <CustomInput
            label="Tên đầy đủ"
            value={fullName}
            onChangeText={onChangeFullName}
            icon="clear"
            styleIcon={{ backgroundColor: "#000", color: "#fff", borderRadius: 50 }}
            size={18}
            showIcon={showClearFullNameIcon}
            onClickIcon={onClickClearFullNameIcon}
          />
            <CustomInput
            label="Email"
            value={email}
            onChangeText={onChangeEmail}
            icon="clear"
            styleIcon={{ backgroundColor: "#000", color: "#fff", borderRadius: 50 }}
            size={18}
            showIcon={showClearEmailIcon}
            onClickIcon={onClickClearEmailIcon}
          />
          <CustomInput
            label="Số điện thoại"
            value={phoneNumber}
            onChangeText={onChangePhoneNumber}
            icon="clear"
            styleIcon={{ backgroundColor: "#000", color: "#fff", borderRadius: 50 }}
            size={18}
            showIcon={showClearPhoneNumberIcon}
            onClickIcon={onClickClearPhoneNumberIcon}
          />
        
      
          <CustomInput
            label="Mật khẩu"
            value={password}
            onChangeText={onChangePassword}
            secureTextEntry={hideVisibilityPassword}
            icon={hideVisibilityPassword ? "visibility-off" : "visibility"}
            size={24}
            showIcon={showPasswordVisibilityIcon}
            onClickIcon={onClickPasswordVisibilityIcon}
          />
          <CustomInput
            label="Nhập lại mật khẩu"
            value={confirmPassword}
            onChangeText={onChangeConfirmPassword}
            secureTextEntry={hideVisibilityConfirmPassword}
            icon={hideVisibilityConfirmPassword ? "visibility-off" : "visibility"}
            size={24}
            showIcon={showConfirmPasswordVisibilityIcon}
            onClickIcon={onClickConfirmPasswordVisibilityIcon}
          />
        </View>

        <CustomButton
          title="Đăng ký"
          onPress={() => handleRegister()}
          style={styles.registerButton}
        />

        <Text style={styles.loginText}>
          Đã có tài khoản? <Text style={styles.loginLink} onPress={() => navigation.navigate('Login')}>Đăng nhập</Text>
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
    width: '90%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 20,
    borderRadius: 10,
    minHeight: '60%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'left',
    color: '#05834E',
  },
  inputs: {
    marginTop: 30,
    marginBottom: 20,
  },
  registerButton: {
    backgroundColor: '#05834E',
    borderRadius: 16,
    width: '80%',
    margin: 'auto',
    borderColor: "#fff",
    borderWidth: 1,
  },
  loginText: {
    textAlign: 'center',
    color: '#000',
    marginTop: 20,
    marginBottom: 60,
  },
  loginLink: {
    color: '#05834E',
    fontWeight: 'bold',
  },
});

export default RegisterScreen;

import React from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const CustomInput = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  label,
  icon,
  styleIcon,
  size,
  showIcon,
  onClickIcon
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
        />
        {showIcon && 
          <Icon onPress={onClickIcon} style={{...styles.icon, ...styleIcon}} name={icon} size={size} color="#000" />
        }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 10,
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'row'
  },
  icon: {
    padding: 2,
    position: 'absolute',
    right: 0,
    margin: 10,
    marginRight: 14
  },
  label: {
    color: '#05834E',
    marginBottom: 8,
    fontWeight: 'bold'
  },
  input: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 8,
    paddingLeft: 16,
    paddingVertical: 8,
    borderRadius: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#05834E'
  },
});

export default CustomInput;

import React from 'react';
import { StyleSheet, Image } from 'react-native';

// Import the local avatar image
const avatarImage = { uri: 'https://placehold.co/200x200/png' }; // Replace with your avatar image source

export default function AvatarTitle() {
  return (
      <Image source={avatarImage} style={styles.avatar} />
  );
}

const styles = StyleSheet.create({
  avatar: {
    marginTop: 50,
    width: 80,
    height: 80,
    borderWidth: 2,
    borderRadius: 50,
    borderColor: '#fff',
  },
});

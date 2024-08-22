// Question.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Question = ({ title, content }) => (
  <View style={styles.question}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.content}>{content}</Text>
  </View>
);

const styles = StyleSheet.create({
  question: {
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  content: {
    marginTop: 8,
    fontSize: 14,
  },
});

export default Question;

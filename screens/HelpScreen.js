import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import Header from '../components/Header';
import Question from '../components/Question';

const HelpScreen = () => {
  return (
    <View style={styles.container}>
      {/* <Header title="Trợ giúp" /> */}
      <ScrollView contentContainerStyle={styles.content}>
        <Question
          title="Question 1"
          content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed gravida facilisis urna et scelerisque..."
        />
        <Question
          title="Question 2"
          content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed gravida facilisis urna et scelerisque..."
        />
        <Question
          title="Question 3"
          content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed gravida facilisis urna et scelerisque..."
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 16,
  },
});

export default HelpScreen;

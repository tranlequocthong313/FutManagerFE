import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import Rating from '../components/Rating';
import UserReview from '../components/UserReview';

const ReviewScreen = () => {
    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <Rating />
                <UserReview rating={4.0} reviewCount={1253} />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#00C673",
    },
    scrollView: {
        flex: 1,
    },
});

export default ReviewScreen;

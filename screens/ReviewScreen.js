import React from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import Rating from '../components/Rating';
import UserReview from '../components/UserReview';
import FloatingChatBubble from '../components/FloatingChatBubble'; // Nhập component FloatingChatBubble

export default function ReviewScreen() {
    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <Rating />
                <UserReview />
                
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#00C673",
    },
    scrollView: {
        flex: 1,
        padding: 10,
    },
    header: {
        fontSize: 22,
        fontWeight: 'bold',
        marginVertical: 10,
    },
});
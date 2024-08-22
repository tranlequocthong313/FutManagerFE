import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import Question from '../components/Question';
import { FontAwesome } from "@expo/vector-icons";
import { authHTTP, serviceEndpoints } from '../configs/apis';

const categoryIcons = {
    'General Information': 'info-circle',
    'Technical Support': 'wrench',
    'Billing and Payments': 'credit-card',
    'Scheduling': 'calendar',
    'Account Settings': 'user-cog'
};

const HelpScreen = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchHelps = async () => {
            try {
                const res = await (await authHTTP()).get(serviceEndpoints.helps);
                setCategories(res.data.results);
            } catch (error) {
                console.error(error);
            }
        };

        fetchHelps();
    }, []);

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                {categories.map((category) => (
                    <View key={category.id} style={styles.categoryContainer}>
                        <View style={styles.categoryHeader}>
                            <FontAwesome
                                name={categoryIcons[category.name] || 'question-circle'}
                                size={24}
                                color="#000"
                            />
                            <Text style={styles.categoryTitle}>{category.name}</Text>
                        </View>
                        {category.helps.map((question) => (
                            <Question
                                key={question.id}
                                title={
                                    <View style={styles.titleContainer}>
                                        <FontAwesome name="question" size={20} color="#000" />
                                        <Text style={styles.titleText}>{question.title}</Text>
                                    </View>
                                }
                                content={question.content}
                            />
                        ))}
                    </View>
                ))}
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
    categoryContainer: {
        marginBottom: 20, // Space between categories
    },
    categoryHeader: {
        flexDirection: 'row', // Align icon and title horizontally
        alignItems: 'center', // Center icon and title vertically
        marginBottom: 10, // Space below the header
    },
    categoryTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10, // Space between icon and title
    },
    titleContainer: {
        flexDirection: 'row', // Hiển thị biểu tượng và tiêu đề theo hàng ngang
        alignItems: 'center', // Căn chỉnh biểu tượng và tiêu đề theo chiều dọc
    },
    titleText: {
        marginLeft: 8, // Khoảng cách giữa biểu tượng và tiêu đề
        fontSize: 16, // Kích thước chữ của tiêu đề
    },
});

export default HelpScreen;

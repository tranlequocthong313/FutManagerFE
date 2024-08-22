import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import axios from 'axios';
import { authHTTP, fieldEndpoints, statsEndpoints } from '../configs/apis'; // Ensure these are correctly set up

const StatisticsRatingScreen = () => {
    const [selectedField, setSelectedField] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [ratings, setRatings] = useState(null);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [fields, setFields] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchFields();
    }, []);

    const fetchFields = async () => {
        setLoading(true);
        try {
            const response = await (await authHTTP()).get(fieldEndpoints.fields);
            if (response.status === 200) {
                setFields(response.data.results);
                if (response.data.results.length > 0) {
                    setSelectedField(response.data.results[0]?.id);
                }
            } else {
                console.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    };

    const handleConfirm = (date) => {
        setDatePickerVisibility(false);
        setSelectedDate(date);
    };

    const fetchRatings = async () => {
        if (selectedField === null) return;

        const month = selectedDate.getMonth() + 1;
        const year = selectedDate.getFullYear();
        try {
            const response = await (await authHTTP()).get(`${statsEndpoints.review(selectedField)}?month=${month}&year=${year}`);
            setRatings(response.data.report);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchRatings();
    }, [selectedField, selectedDate]);

    const calculateAverageRating = () => {
        if (!ratings) return 0;

        let totalWeightedScore = 0;
        let totalReviews = 0;

        for (let star = 1; star <= 5; star++) {
            const count = ratings[star] || 0;
            totalWeightedScore += star * count;
            totalReviews += count;
        }

        return totalReviews > 0 ? (totalWeightedScore / totalReviews).toFixed(1) : 0;
    };

    const ratingBreakdown = [1, 2, 3, 4, 5].map(star => ({
        star,
        count: ratings ? ratings[star] || 0 : 0
    }));

    const tableData = [
        { key: "Average Rating", value: calculateAverageRating() || 'N/A' },
        { key: "Total Reviews", value: ratings ? Object.values(ratings).reduce((a, b) => a + b, 0) : 0 },
        { key: "5-Star Reviews", value: ratings?.[5] || 0 },
        { key: "4-Star Reviews", value: ratings?.[4] || 0 },
        { key: "3-Star Reviews", value: ratings?.[3] || 0 },
        { key: "2-Star Reviews", value: ratings?.[2] || 0 },
        { key: "1-Star Reviews", value: ratings?.[1] || 0 },
    ];

    return (
        <View style={styles.container}>
            {/* Filter Section */}
            <View style={styles.filterContainer}>
                <Picker
                    style={styles.picker}
                    selectedValue={selectedField}
                    onValueChange={(itemValue) => setSelectedField(itemValue)}
                >
                    {fields.map((field) => (
                        <Picker.Item key={field.id} label={field.name} value={field.id} />
                    ))}
                </Picker>

                <Text onPress={() => setDatePickerVisibility(true)} style={styles.datePickerText}>
                    {`${selectedDate.getMonth() + 1}/${selectedDate.getFullYear()}`}
                </Text>
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={() => setDatePickerVisibility(false)}
                />
            </View>

            {/* Rating Section */}
            <ScrollView contentContainerStyle={styles.ratingContainer}>
                <Text style={styles.mainRating}>
                    {calculateAverageRating() || 'N/A'}
                </Text>
                <Text style={styles.starText}>
                    {[...Array(5)].map((_, index) => (
                        <Text key={index} style={styles.star}>
                            {index < Math.round(calculateAverageRating()) ? '★' : '☆'}
                        </Text>
                    ))}
                </Text>
                <Text style={styles.ratingCount}>{ratings ? Object.values(ratings).reduce((a, b) => a + b, 0) : 0}</Text>

                {/* Breakdown Section */}
                {ratingBreakdown.map(({ star, count }) => (
                    <View key={star} style={styles.breakdownContainer}>
                        <Text style={styles.breakdownText}>{count}</Text>
                        <Text style={styles.breakdownStars}>
                            {[...Array(5)].map((_, index) => (
                                <Text key={index} style={styles.star}>
                                    {index < star ? '★' : '☆'}
                                </Text>
                            ))}
                        </Text>
                    </View>
                ))}

                {/* Additional Table Section */}
                <View style={styles.statsTable}>
                    <FlatList
                        data={tableData}
                        renderItem={({ item }) => (
                            <View style={styles.tableRow}>
                                <Text style={styles.tableKey}>{item.key}:</Text>
                                <Text style={styles.tableValue}>{item.value}</Text>
                            </View>
                        )}
                        keyExtractor={(item) => item.key}
                        style={styles.table}
                    />
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2ecc71',
    },
    filterContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        backgroundColor: '#ccc',
        paddingVertical: 10,
    },
    picker: {
        flex: 4,
        backgroundColor: '#ccc',
        fontWeight: 'bold',
    },
    datePickerText: {
        flex: 1,
        fontSize: 16,
        color: "#00C673",
        marginLeft: 16,
    },
    ratingContainer: {
        alignItems: 'center',
        padding: 20,
    },
    mainRating: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#000',
    },
    starText: {
        fontSize: 32,
        marginVertical: 10,
    },
    star: {
        color: '#FFD700',
        textShadowColor: '#FFFFFF',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 1,
    },
    ratingCount: {
        fontSize: 16,
        color: '#000',
    },
    breakdownContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        marginVertical: 5,
    },
    breakdownText: {
        fontSize: 18,
        color: '#000',
    },
    breakdownStars: {
        fontSize: 18,
        flexDirection: 'row',
    },
    statsTable: {
        marginTop: 50,
        width: '100%',
    },
    tableRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: '#ecf0f1',
        marginVertical: 5,
        borderRadius: 5,
    },
    tableKey: {
        fontSize: 16,
        color: '#000',
    },
    tableValue: {
        fontSize: 16,
        color: '#000',
    },
    table: {
        width: '100%',
    },
});

export default StatisticsRatingScreen;

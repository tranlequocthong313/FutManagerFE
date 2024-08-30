import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import Rating from '../components/Rating';
import UserReview from '../components/UserReview';
import { authHTTP, fieldEndpoints } from '../configs/apis';
import { useNavigation } from '@react-navigation/native';

const ReviewScreen = ({ route }) => {
    const [reviewData, setReviewData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { field } = route.params;
    const navigation = useNavigation();

    const fetchReviewData = async () => {
        try {
            const instance = await authHTTP();
            const response = await instance.get(fieldEndpoints.reviews(field.id));
            setReviewData(response.data);
        } catch (error) {
            console.error("Error fetching data:", error); // Debugging line
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReviewData();
    }, [field]);

    const refreshReviews = () => {
        setLoading(true);
        fetchReviewData();
    };

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.container}>
                <Text>Error fetching data: {error.message || 'Unknown error'}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <Rating field={field} onSuccess={refreshReviews} />
                {reviewData && (
                    <UserReview
                        rating={reviewData.average_rating}
                        reviewCount={reviewData.total_rating}
                        reviews={reviewData.results}
                    />
                )}
            </ScrollView>
            {field.status === 'Available' && (
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate("FieldBooking", { field })}
                >
                    <Text style={styles.buttonText}>Đặt sân ngay</Text>
                </TouchableOpacity>
            )}
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
        width: '100%',
    },
    button: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        backgroundColor: '#D7BC2F',
        padding: 15,
        borderRadius: 20,
        alignItems: 'center',
        elevation: 3,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ReviewScreen;

import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, ActivityIndicator, Text } from 'react-native';
import Rating from '../components/Rating';
import UserReview from '../components/UserReview';
import { authHTTP, fieldEndpoints } from '../configs/apis';

const ReviewScreen = ({ route }) => {
    const [reviewData, setReviewData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { field } = route.params;

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
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#00C673",
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollView: {
        flex: 1,
        width: '100%',
    },
});

export default ReviewScreen;

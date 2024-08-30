import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { formatDistanceToNow, vi } from 'date-fns'; // Import Vietnamese locale
import Divider from './Divider';

const UserReview = ({ rating = 0, reviewCount = 0, reviews = [] }) => {
    const [showMore, setShowMore] = useState({}); // Track expanded state for each review

    const toggleShowMore = (id) => {
        setShowMore((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    // Function to get the first 5 words and append '...' if truncated
    const displayText = (text, show) => {
        const words = text.split(' ');
        return show ? text : (words.length > 5 ? words.slice(0, 5).join(' ') + '...' : text);
    };

    // Function to determine if "Show More" button should be displayed
    const shouldShowMoreButton = (text) => {
        return text.split(' ').length > 5;
    };

    return (
        <View style={styles.reviewContainer}>
            <View style={styles.ratingWrapper}>
                <View style={styles.ratingContainer}>
                    <Text style={styles.averageRating}>{rating.toFixed(1)}</Text>
                </View>
                <View style={styles.starAndReviewContainer}>
                    <View style={styles.starRow}>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <FontAwesome
                                key={star}
                                name={star <= Math.round(rating) ? 'star' : 'star-o'}
                                size={24}
                                color={star <= Math.round(rating) ? '#E2C113' : '#fff'}
                                style={styles.starIcon}
                            />
                        ))}
                    </View>
                    <Text style={styles.reviewCount}>{reviewCount} reviews</Text>
                </View>
            </View>
            <Divider />
            {reviews.map((review) => (
                <View key={review.id} style={styles.userReview}>
                    <Image
                        source={{
                            uri: "https://res.cloudinary.com/diojasks1/image/upload/v1723804774/r04iqcz0m6lpmqlj7pp0.png",
                        }}
                        style={styles.userImage}
                    />
                    <View style={styles.userInfo}>
                        <Text style={styles.userName}>{review.user.full_name}</Text>
                        <View style={styles.userRating}>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <FontAwesome
                                    key={star}
                                    name={star <= review.rating ? 'star' : 'star-o'}
                                    size={24}
                                    color={star <= review.rating ? '#E2C113' : '#fff'}
                                    style={styles.starIcon}
                                />
                            ))}
                        </View>
                        <Text style={styles.reviewDate}>
                            {review.created_date ? `${formatDistanceToNow(new Date(review.created_date), { addSuffix: true, locale: vi })}` : ''}
                        </Text>
                        <Text style={styles.reviewText}>
                            {displayText(review.review, showMore[review.id])}
                        </Text>
                        {shouldShowMoreButton(review.review) && (
                            <TouchableOpacity onPress={() => toggleShowMore(review.id)}>
                                <Text style={styles.showMoreText}>
                                    {showMore[review.id] ? "Ẩn bớt" : "Hiện thêm"}
                                </Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    reviewContainer: {
        backgroundColor: '#00C673',
        borderRadius: 8,
        marginBottom: 10,
    },
    ratingWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 8,
        marginHorizontal: 70,
    },
    ratingContainer: {
        justifyContent: 'center',
    },
    averageRating: {
        fontSize: 48,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#2B2525',
    },
    starAndReviewContainer: {
        alignItems: 'center',
    },
    starRow: {
        flexDirection: 'row',
        marginBottom: 4,
    },
    reviewCount: {
        fontSize: 16,
        color: '#fff',
    },
    userReview: {
        width: '100%',
        padding: 16,
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginLeft: 15,
    },
    userImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 16,
    },
    userInfo: {
        flex: 1,
    },
    userName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
    userRating: {
        flexDirection: 'row',
        marginTop: 4,
    },
    starIcon: {
        marginRight: 8,
    },
    reviewText: {
        fontSize: 16,
        color: '#fff',
        marginTop: 8,
        paddingRight: 20,
    },
    showMoreText: {
        color: '#E2C113',
        marginTop: 4,
        fontWeight: 'bold',
        alignSelf: 'flex-end',
        marginRight: 50,
    },
    reviewDate: {
        fontSize: 12,
        color: '#666',
        marginTop: 8,
    },
});

export default UserReview;

import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const UserReview = ({ rating = 0, reviewCount = 0 }) => {
    return (
        <View style={styles.reviewContainer}>
            <View style={styles.ratingContainer}>
                <Text style={styles.averageRating}>{rating.toFixed(1)}</Text>
                <View style={styles.starRow}>
                    {[1, 2, 3, 4, 5].map((star) => (
                        <FontAwesome
                            key={star}
                            name={star <= Math.round(rating) ? 'star' : 'star-o'}
                            size={24}
                            color="#FFD700"
                        />
                    ))}
                </View>
            </View>
            <Text style={styles.reviewCount}>{reviewCount} reviews</Text>
            <View style={styles.userReview}>
                <Image
                    source={{
                        uri: "https://res.cloudinary.com/diojasks1/image/upload/v1723804779/tycwpxoyw3mha6aoqqzd.jpg",
                    }}
                    style={styles.userImage}
                    alt="User avatar"
                />
                <View>
                    <Text style={styles.userName}>User name</Text>
                    <View style={styles.userRating}>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <FontAwesome
                                key={star}
                                name="star"
                                size={16}
                                color="#FFD700"
                            />
                        ))}
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    reviewContainer: {
        backgroundColor: '#00C673',
        padding: 16,
        borderRadius: 8,
        marginBottom: 16,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
    },
    averageRating: {
        fontSize: 48,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#2B2525',
    },
    starRow: {
        flexDirection: 'row',
        marginLeft: 8,  // Add margin to separate averageRating from starRow
    },
    reviewCount: {
        textAlign: 'center',
        fontSize: 16,
        color: '#666',
        marginBottom: 16,
    },
    userReview: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    userImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 8,
    },
    userName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    userRating: {
        flexDirection: 'row',
    },
});

export default UserReview;

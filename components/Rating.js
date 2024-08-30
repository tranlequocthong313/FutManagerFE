import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { authHTTP, fieldEndpoints } from '../configs/apis'; // Ensure this import path is correct

const Rating = ({ field, onSuccess }) => {
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState('');
    const [isInputVisible, setIsInputVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [hasReviewed, setHasReviewed] = useState(false);

    useEffect(() => {
        // Check if the user has already reviewed this field
        const checkIfReviewed = async () => {
            try {
                const axiosInstance = await authHTTP();
                const response = await axiosInstance.get(fieldEndpoints.reviews(field.id));

                if (response.data.is_reviewed === true) {
                    setHasReviewed(true);
                }
            } catch (error) {
                console.error('Error checking if reviewed:', error);
            }
        };

        checkIfReviewed();
    }, [field]);

    const handleRating = (star) => {
        setRating(star);
        setIsInputVisible(true);
    };

    const handleCancel = () => {
        setRating(0);
        setReviewText('');
        setIsInputVisible(false);
    };

    const handleSubmit = async () => {
        setLoading(true);

        if (!reviewText.trim()) {
            setLoading(false);
            Alert.alert('Error', 'Please enter your review before submitting.');
            return;
        }

        try {
            const axiosInstance = await authHTTP();
            const response = await axiosInstance.post(fieldEndpoints.reviews(field.id), {
                rating,
                review: reviewText,
            });

            if (response.status === 201) {
                Alert.alert('Success', 'Your rating has been submitted successfully.');
                setRating(0);
                setReviewText('');
                setIsInputVisible(false);
                setHasReviewed(true); // Hide the star rating after successful submission
                if (onSuccess) {
                    onSuccess();
                }
            }
        } catch (error) {
            console.error('Error submitting rating:', error);
            Alert.alert('Error', 'There was an error submitting your rating.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.ratingContainer}>
            <View style={styles.fieldInfo}>
                <Image
                    source={field?.img ? { uri: field.img } : { uri: "https://res.cloudinary.com/diojasks1/image/upload/v1723804779/tycwpxoyw3mha6aoqqzd.jpg" }}
                    style={styles.fieldImage}
                />
                <View style={styles.fieldDetails}>
                    <Text style={styles.fieldText}>{field.name}</Text>
                    <Text style={styles.fieldText}>Loại sân: sân {field.field_type}</Text>
                </View>
            </View>
            {!hasReviewed && (
                <View style={styles.starContainer}>
                    {[1, 2, 3, 4, 5].map((star) => (
                        <FontAwesome
                            key={star}
                            name={star <= rating ? 'star' : 'star-o'}
                            size={50}
                            color={star <= rating ? '#E2C113' : '#fff'}
                            style={styles.starIcon}
                            onPress={() => handleRating(star)}
                        />
                    ))}
                </View>
            )}
            {isInputVisible && (
                <View style={styles.containerReview}>
                    <Text style={styles.labelInput}>Nhận xét</Text>
                    <TextInput
                        style={styles.input}
                        multiline
                        numberOfLines={4}
                        value={reviewText}
                        onChangeText={setReviewText}
                    />
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={[styles.button, styles.buttonCancel]} onPress={handleCancel}>
                            <Text style={styles.buttonText}>Hủy</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, styles.buttonSubmit]} onPress={handleSubmit} disabled={loading}>
                            <Text style={styles.buttonText}>
                                {loading ? 'Đang gửi...' : 'Đánh giá'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    ratingContainer: {
        backgroundColor: '#00C673',
        shadowColor: 'transparent',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0,
        shadowRadius: 0,
        elevation: 0,
    },
    fieldInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
        backgroundColor: '#DDD',
        padding: 5,
    },
    fieldImage: {
        width: 100,
        height: 60,
        marginRight: 20,
        marginLeft: 20,
        borderWidth: 2,
        borderColor: 'black',
    },
    fieldDetails: {
        flex: 1,
        backgroundColor: '#DDD',
        borderRadius: 8,
        paddingTop: 13,
        marginBottom: 16,
        height: 80,
    },
    fieldText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    starContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 30,
        marginHorizontal: 60,
    },
    labelInput: {
        fontWeight: 'bold',
        color: '#FFF',
        fontSize: 16,
        marginBottom: 8,
    },
    input: {
        borderColor: '#DDD',
        borderWidth: 1,
        borderRadius: 8,
        padding: 8,
        marginBottom: 16,
        height: 140,
        backgroundColor: '#FFF',
        textAlignVertical: 'top',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        alignSelf: 'center',
        marginBottom: 16,
    },
    button: {
        flex: 1,
        borderRadius: 10,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 15,
    },
    buttonCancel: {
        backgroundColor: '#999999',
    },
    buttonSubmit: {
        backgroundColor: '#E2C113',
    },
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
    },
    containerReview: {
        width: '85%',
        alignSelf: 'center',
        marginBottom: 16,
    },
});

export default Rating;

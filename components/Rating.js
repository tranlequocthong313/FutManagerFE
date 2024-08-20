import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const Rating = () => {
    const [rating, setRating] = useState(0); // Initial rating value
    const [isInputVisible, setIsInputVisible] = useState(false); // Manage input visibility

    const handleRating = (star) => {
        setRating(star);
        setIsInputVisible(true); // Show input field when rating is selected
    };

    const handleCancel = () => {
        setRating(0); // Reset rating
        setIsInputVisible(false); // Hide input field
    };

    const handleSubmit = () => {
        // Handle the submit action here
        // e.g., send rating and review to the server
        setIsInputVisible(false); // Hide input field after submission
    };

    return (
        <View style={styles.ratingContainer}>
            <View style={styles.fieldInfo}>
                <Image
                    source={{ uri: "https://res.cloudinary.com/diojasks1/image/upload/v1723804779/tycwpxoyw3mha6aoqqzd.jpg" }}
                    style={styles.fieldImage}
                />
                <View style={styles.fieldDetails}>
                    <Text style={styles.fieldText}>Sân 1</Text>
                    <Text style={styles.fieldText}>Loại sân: sân 5</Text>
                </View>
            </View>
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
            {isInputVisible && (
                <View style={styles.containerReview}>
                    <Text style={styles.labelInput}>Nhận xét</Text>
                    <TextInput
                        style={styles.input}
                        multiline
                        numberOfLines={4}
                    />
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={[styles.button, styles.buttonCancel]} onPress={handleCancel}>
                            <Text style={styles.buttonText}>Hủy</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, styles.buttonSubmit]} onPress={handleSubmit}>
                            <Text style={styles.buttonText}>Đánh giá</Text>
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

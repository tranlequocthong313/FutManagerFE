import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const Rating = () => {
    const [rating, setRating] = useState(3); // Giá trị đánh giá ban đầu

    const handleRating = (star) => {
        setRating(star);
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
                    <Text style={styles.fieldType}>Loại sân: sân 5</Text>
                </View>
            </View>
            <View style={styles.starContainer}>
                {[1, 2, 3, 4, 5].map((star) => (
                    <FontAwesome
                        key={star}
                        name={star <= rating ? 'star' : 'star-o'}
                        size={40}
                        color={star <= rating ? '#FFD700' : '#000'}
                        onPress={() => handleRating(star)}
                    />
                ))}
            </View>
            <TextInput
                style={styles.input}
                placeholder="Nhận xét"
                multiline
                numberOfLines={4}
            />
            <View style={styles.buttonContainer}>
                <Button title="    Hủy    " onPress={() => {}} color="#999999" />
                <Button title="Đánh giá" onPress={() => {}} color="#FFD700" />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    ratingContainer: {
        backgroundColor: '#00C673',
        padding: 16,
        borderRadius: 8,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    fieldInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
        backgroundColor: '#DDD',
        padding: 8,
        borderRadius: 8,
        
        
    },
    fieldImage: {
        width: 80,
        height: 50,
        // borderRadius: 20,
        marginRight: 4,
    },
    fieldDetails: {
        flex: 1,
        backgroundColor: '#DDD',
        borderRadius: 8,
        padding: 8,
        marginBottom: 16,
        height: 80,
    },
    fieldText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    fieldType: {
        fontSize: 14,
        color: '#666',
    },
    starContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 16,
    },
    input: {
        borderColor: '#DDD',
        borderWidth: 1,
        borderRadius: 8,
        padding: 8,
        marginBottom: 16,
        height: 160,
        backgroundColor: '#FFF',
        textAlignVertical: 'top',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 10
    },
});

export default Rating;

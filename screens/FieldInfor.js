import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import { format } from 'date-fns'; // Ensure date-fns is imported
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const FieldInfor = ({ route }) => {
    const { field, date, totalPrice, fromTime, toTime } = route.params;
    const navigation = useNavigation();
    // State for input values
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [notes, setNotes] = useState('');

    const formatPrice = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    };

    const handleSubmit = () => {
        if (!name || !phone || !notes) {
            // Show an alert or handle the error
            alert('Vui lòng nhập đầy đủ thông tin.');
            return;
        }

        // Create booking data object
        const bookingData = {
            booking_date: format(new Date(date), 'yyyy-MM-dd'),
            from_time: fromTime,
            to_time: toTime,
            note: notes,
            booker_name: name,
            phone_number: phone,
            payment_channel: null
        };
        // Navigate to another page and pass data
        navigation.navigate('FieldPayment', { bookingData, field, totalPrice});
    };

    // Determine if the button should be disabled
    const isButtonDisabled = !name || !phone || !notes;

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Image
                    source={field.img ? { uri: field.img } : { uri: "https://res.cloudinary.com/dh1irfap0/image/upload/v1724499901/footballfieldicon_n8mbgs.png" }}
                    style={styles.image}
                />
                <View style={styles.cardContent}>
                    <Text style={styles.fieldName}>{field.name}</Text>
                    <Text style={styles.fieldNumber}>Loại sân: Sân {field.field_type}</Text>
                </View>
            </View>
            <View style={styles.cardTime}>
                <FontAwesome name="clock-o" size={40} color="#000" style={styles.icon} />
                <View style={styles.cardContent}>
                    <Text style={styles.fieldName}>{format(new Date(date), 'dd/MM/yyyy')}</Text>
                    <Text style={styles.fieldNumber}>{fromTime} - {toTime}</Text>
                </View>
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Họ và tên</Text>
                <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                />
                <Text style={styles.label}>Số điện thoại</Text>
                <TextInput
                    style={styles.input}
                    keyboardType="phone-pad"
                    value={phone}
                    onChangeText={setPhone}
                />
                <Text style={styles.label}>Ghi chú</Text>
                <TextInput
                    style={[styles.input, styles.notesInput]}
                    multiline
                    numberOfLines={4}
                    value={notes}
                    onChangeText={setNotes}
                />
            </View>
            <View style={styles.totalPriceContainer}>
                <Text style={styles.totalPriceText}>Tổng: {formatPrice(totalPrice)} VND</Text>
            </View>
            <TouchableOpacity
                style={[styles.continueButton, isButtonDisabled && styles.disabledButton]}
                onPress={handleSubmit}
                disabled={isButtonDisabled}
            >
                <Text style={styles.continueButtonText}>ĐẶT SÂN</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#00C673',
    },
    card: {
        flexDirection: 'row',
        padding: 15,
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#D9D9D9',
    },
    cardTime: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#D9D9D9',
        paddingHorizontal: 15,
        paddingBottom: 25,
    },
    image: {
        width: 80,
        height: 80,
    },
    cardContent: {
        flex: 1,
        marginLeft: 15,
    },
    fieldName: {
        fontSize: 16,
        fontWeight: 'bold',
        padding: 5,
    },
    fieldNumber: {
        fontSize: 14,
        padding: 5,
        fontWeight: 'bold',
    },
    icon: {
        backgroundColor: '#05834E',
        borderRadius: 10,
        paddingVertical: 15,
        paddingHorizontal: 25,
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.47,
    },
    inputContainer: {
        marginTop: 10,
        padding: 15,
        alignItems: 'center', // Center align items horizontally
    },
    label: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#fff',
        width: '100%', // Ensure the label takes up full width
    },
    input: {
        height: 50,
        borderColor: '#05834E',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 10,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        width: '90%', // Make inputs take the full width of container
    },
    notesInput: {
        height: 120,
        padding: 10,
        textAlignVertical: 'top', // Align text to the top for multiline input
    },
    totalPriceContainer: {
        padding: 15,
        borderColor: '#D9D9D9',
        alignItems: 'flex-end',
    },
    totalPriceText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    continueButton: {
        backgroundColor: '#D7BC2F',
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 20,
        marginTop: 10,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#fff',
    },
    continueButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    disabledButton: {
        backgroundColor: '#B0B0B0',
    },
});

export default FieldInfor;

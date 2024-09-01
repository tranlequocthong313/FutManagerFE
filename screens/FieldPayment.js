import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { format } from 'date-fns';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { authHTTP, fieldEndpoints } from '../configs/apis';

const FieldPayment = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { bookingData, field, totalPrice } = route.params;

    const [selectedPayment, setSelectedPayment] = useState(null);

    const handlePaymentSelect = (paymentMethod) => {
        setSelectedPayment(paymentMethod);
    };

    const formatPrice = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    };

    const handleBooking = async () => {
        if (selectedPayment) {
            const paymentChannel = selectedPayment.toLowerCase();
            const updatedBookingData = {
                ...bookingData,
                payment_channel: paymentChannel,
            };
    
            try {
                const instance = await authHTTP();
                const response = await instance.post(
                    fieldEndpoints.book(field.id),
                    updatedBookingData
                );
                
                if (response.data && response.data.payment_url) {
                    navigation.navigate('WebViewScreen', {
                        dataPayment: response.data,
                    });
                } else {
                    Alert.alert('Thông báo', 'Không có URL thanh toán trong phản hồi.');
                }
    
                // Xử lý thành công, ví dụ: điều hướng đến màn hình xác nhận
    
            } catch (error) {
                console.error('Error booking field:', error);
                Alert.alert('Lỗi', 'Đã xảy ra lỗi trong quá trình đặt sân.');
                // Xử lý lỗi, ví dụ: hiển thị thông báo lỗi cho người dùng
            }
        } else {
            Alert.alert('Thông báo', 'Vui lòng chọn phương thức thanh toán.');
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
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
                    <Text style={styles.fieldName}>{format(new Date(bookingData.booking_date), 'dd/MM/yyyy')}</Text>
                    <Text style={styles.fieldNumber}>{bookingData.from_time} - {bookingData.to_time}</Text>
                </View>
            </View>
            <View style={styles.containerPayment}>
                <Text style={styles.textLabel}>Hình thức thanh toán</Text>
                
                <View style={styles.cardPayment}>
                    <TouchableOpacity
                        style={styles.radioButton}
                        onPress={() => handlePaymentSelect('VN_PAY')}
                    >
                        {selectedPayment === 'VN_PAY' && <View style={styles.radioButtonIcon} />}
                    </TouchableOpacity>
                    <Image source={{ uri: 'https://res.cloudinary.com/dh1irfap0/image/upload/v1724575688/vnpay_jmd4sg.jpg' }} style={styles.paymentImage} />
                    <Text style={styles.paymentLabel}>VNPAY</Text>
                </View>
                
                <View style={styles.cardPayment}>
                    <TouchableOpacity
                        style={styles.radioButton}
                        onPress={() => handlePaymentSelect('MOMO')}
                    >
                        {selectedPayment === 'MOMO' && <View style={styles.radioButtonIcon} />}
                    </TouchableOpacity>
                    <Image source={{ uri: 'https://res.cloudinary.com/dh1irfap0/image/upload/v1724575681/momo_bvy6lz.png' }} style={styles.paymentImage} />
                    <Text style={styles.paymentLabel}>MOMO</Text>
                </View>
                
            </View>

            <View style={styles.footer}>
                <View style={styles.totalPriceContainer}>
                    <Text style={styles.totalPriceText}>Tổng: {formatPrice(totalPrice)} VND</Text>
                </View>
                <TouchableOpacity
                    style={[styles.continueButton, !selectedPayment && styles.disabledButton]}
                    disabled={!selectedPayment}
                    onPress={handleBooking}
                >
                    <Text style={styles.continueButtonText}>ĐẶT SÂN</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1, // Ensure ScrollView takes up the full height
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
    textLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 15,
        paddingHorizontal: 20,
        color: '#fff',
    },
    cardPayment: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#FFF',
        marginVertical: 5,
        borderRadius: 10,
        paddingHorizontal: 50,
        marginHorizontal: 20,
    },
    radioButton: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#05834E',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 50,
    },
    radioButtonIcon: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#05834E',
    },
    paymentImage: {
        width: 60,
        height: 60,
        borderRadius: 10,
        marginRight: 50,
    },
    paymentLabel: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    containerPayment: {
        marginVertical: 30,
    },
    footer: {
        padding: 15,
    },
    totalPriceContainer: {
        alignItems: 'flex-end',
        marginBottom: 10,
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

export default FieldPayment;

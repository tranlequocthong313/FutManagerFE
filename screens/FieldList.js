import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Alert, Button } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { authHTTP, fieldEndpoints } from "../configs/apis";
import { useNavigation } from "@react-navigation/native";

// Hàm định dạng giá tiền với dấu phẩy
const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

// Hàm định dạng rating với một chữ số thập phân
const formatRating = (rating) => {
    return rating.toFixed(1);
};

// Hàm lấy màu nền cho thẻ dựa trên trạng thái
const getCardBackgroundColor = (status) => {
    switch (status) {
        case 'Available':
            return '#119960'; // Màu xanh lá cây cho trạng thái "Có sẵn"
        case 'Booked':
            return '#F10808'; // Màu đỏ cho trạng thái "Đầy"
        case 'Maintenance':
            return '#D9D9D9'; // Màu xám cho trạng thái "Bảo trì"
        default:
            return '#FFFFFF'; // Màu trắng mặc định
    }
};

// Hàm lấy màu chữ cho thẻ dựa trên trạng thái
const getTextColor = (status) => {
    return status === 'Maintenance' ? '#000' : '#fff'; // Màu trắng cho trạng thái "Bảo trì", màu đen cho các trạng thái khác
};

// Hàm hiện hộp thoại với các tùy chọn
const showOptions = ({ navigation, field }) => {
    Alert.alert(
        'Chọn tùy chọn',
        `Bạn muốn làm gì với sân ${field.name}?`,
        [
            {
                text: 'Xem chi tiết sân',
                onPress: () => navigation.navigate("ReviewScreen", { fieldId: field.id }), // Thực hiện hành động xem chi tiết
            },
            {
                text: 'Đặt sân',
                onPress: () => navigation.navigate("FieldBooking", { field: field }), // Thực hiện hành động đặt sân
            },
            {
                text: 'Hủy',
                style: 'cancel',
            },
        ],
        { cancelable: true }
    );
};

const FieldList = () => {
    const [fieldsData, setFieldsData] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const instance = await authHTTP();
                const response = await instance.get(fieldEndpoints['fields']);
                setFieldsData(response.data.results);
            } catch (error) {
                console.error('Error fetching fields data:', error);
            }
        };

        fetchData();
    }, []);

    const renderFieldCard = ({ item }) => (
        <TouchableOpacity
            onPress={() => item.status === 'Available' && showOptions({ navigation, field: item })}
            style={[styles.card, { backgroundColor: getCardBackgroundColor(item.status) }]}
            disabled={item.status !== 'Available'} // Vô hiệu hóa nút nhấn nếu trạng thái không phải là "Available"
        >
            <Image
                source={item.img ? { uri: item.img } : { uri: "https://res.cloudinary.com/dh1irfap0/image/upload/v1724499901/footballfieldicon_n8mbgs.png" }}
                style={styles.image}
            />
            <View style={styles.cardContent}>
                <Text style={[styles.fieldName, { color: getTextColor(item.status) }]}>{item.name}</Text>
                <Text style={[styles.fieldNumber, { color: getTextColor(item.status) }]}>Sân {item.field_type}</Text>
            </View>
            <View style={styles.cardPriceRating}>
                <Text style={[styles.price, { color: getTextColor(item.status) }]}>{formatPrice(item.price)} VND/h</Text>
                <View style={styles.ratingContainer}>
                    <Text style={[styles.rating, { color: getTextColor(item.status) }]}>{formatRating(item.avg_rating)}</Text>
                    <FontAwesome name="star" size={20} color="#E2C113" />
                </View>
            </View>
        </TouchableOpacity>
    );


    return (
        <View style={styles.container}>
            <FlatList
                data={fieldsData}
                renderItem={renderFieldCard}
                keyExtractor={(item) => item.id}
            />
            {/* TODO: để gắn màn hình thành công sau khi thực hiện thanh toán xxong sẽ xóa */}
            <TouchableOpacity
                style={styles.button}
                onPress={() => { navigation.navigate('FieldSucess'); }}
            >
                <Text style={styles.buttonText}>Đi đến Màn hình Thành công</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    card: {
        flexDirection: 'row',
        padding: 15,
        alignItems: 'center',
        width: '100%',
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
        fontSize: 18,
        fontWeight: 'bold',
        padding: 5,
    },
    fieldNumber: {
        fontSize: 14,
        padding: 5,
    },
    cardPriceRating: {
        alignItems: 'flex-end',
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        padding: 5,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
    },
    rating: {
        marginRight: 5,
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default FieldList;

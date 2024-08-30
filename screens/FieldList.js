import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Modal, Pressable, TextInput } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { authHTTP, fieldEndpoints } from "../configs/apis";
import { Picker } from "@react-native-picker/picker";
import { autoCapitalize } from "deprecated-react-native-prop-types/DeprecatedTextInputPropTypes";

const FieldList = () => {
    const [fieldsData, setFieldsData] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [fromPrice, setFromPrice] = useState('');
    const [toPrice, setToPrice] = useState('');
    const [status, setStatus] = useState('');
    const [fieldType, setFieldType] = useState('');
    const [minRating, setMinRating] = useState('');
    const navigation = useNavigation();

    const buildQueryString = () => {
        const params = new URLSearchParams();
        if (fromPrice) params.append('fromprice', fromPrice);
        if (toPrice) params.append('toprice', toPrice);
        if (status) params.append('status', status);
        if (fieldType) params.append('type', fieldType);
        if (minRating) params.append('fromrating', minRating);
        return params.toString();
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const instance = await authHTTP();
                const queryString = buildQueryString();
                const url = queryString ? `${fieldEndpoints['fields']}?${queryString}` : fieldEndpoints['fields'];
                const response = await instance.get(url);
                setFieldsData(response.data.results);
            } catch (error) {
                console.error('Error fetching fields data:', error);
            }
        };

        fetchData();
    }, [fromPrice, toPrice, status, fieldType, minRating]);

    const renderFieldCard = ({ item }) => (
        <TouchableOpacity
            onPress={() => {
                if (item.status === 'Available' || item.status === 'Maintenance') {
                    navigation.navigate("ReviewScreen", { field: item });
                }
            }}
            style={[styles.card, { backgroundColor: getCardBackgroundColor(item.status) }]}
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



    const handleFilterClear = () => {
        setFromPrice('');
        setToPrice('');
        setMinRating('');
        setStatus('');
        setFieldType('');
        setModalVisible(false);
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <View style={styles.filterContainer}>
                    <View style={styles.filterItem}>
                        <View style={[styles.colorBox, { backgroundColor: '#119960' }]} />
                        <Text style={styles.labelText}>Sẵn sàng</Text>
                    </View>
                    <View style={styles.filterItem}>
                        <View style={[styles.colorBox, { backgroundColor: '#FD0404' }]} />
                        <Text style={styles.labelText}>Đầy</Text>
                    </View>
                    <View style={styles.filterItem}>
                        <View style={[styles.colorBox, { backgroundColor: '#D9D9D9' }]} />
                        <Text style={styles.labelText}>Bảo trì</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.filterIcon} onPress={() => setModalVisible(true)}>
                    <FontAwesome name="filter" size={30} color="#fff" />
                </TouchableOpacity>
            </View>
            <FlatList
                data={fieldsData}
                renderItem={renderFieldCard}
                keyExtractor={(item) => item.id.toString()}
            />
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(false);
                }}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Lọc và tìm kiếm sân</Text>
                        <View style={styles.filterPrice}>
                            <TextInput
                                style={styles.input}
                                placeholder="Từ giá tiền"
                                keyboardType="numeric"
                                value={fromPrice}
                                onChangeText={setFromPrice}
                            />
                            <Text> -- </Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Đến giá tiền"
                                keyboardType="numeric"
                                value={toPrice}
                                onChangeText={setToPrice}
                            />
                            <Text>VNĐ</Text>
                        </View>
                        <Picker
                            selectedValue={status}
                            style={styles.picker}
                            onValueChange={(itemValue) => setStatus(itemValue)}
                        >
                            <Picker.Item label="Chọn trạng thái" value="" />
                            <Picker.Item label="Sẵn sàng" value="Available" />
                            <Picker.Item label="Đầy" value="Booked" />
                            <Picker.Item label="Bảo trì" value="Maintenance" />
                        </Picker>
                        <Picker
                            selectedValue={fieldType}
                            style={styles.picker}
                            onValueChange={(itemValue) => setFieldType(itemValue)}
                        >
                            <Picker.Item label="Chọn lọai sân" value="" />
                            <Picker.Item label="Sân 5" value="5" />
                            <Picker.Item label="Sân 7" value="7" />
                            <Picker.Item label="Sân 11" value="11" />
                            {/* Add more field types as needed */}
                        </Picker>
                        <Picker
                            selectedValue={minRating}
                            style={styles.picker}
                            onValueChange={(itemValue) => setMinRating(itemValue)}
                        >
                            <Picker.Item label="Đánh giá từ" value="" />
                            <Picker.Item label="1 sao" value="1" />
                            <Picker.Item label="2 sao" value="2" />
                            <Picker.Item label="3 sao" value="3" />
                            <Picker.Item label="4 sao" value="4" />
                            <Picker.Item label="5 sao" value="5" />
                            {/* Add more field types as needed */}
                        </Picker>
                        <Pressable style={[styles.button, {backgroundColor:'#D7BC2F'}]} onPress={handleFilterClear}>
                            <Text style={styles.buttonText}>Xóa điều kiện lọc</Text>
                        </Pressable>
                        <Pressable style={[styles.button,{backgroundColor:'#819B90'}]} onPress={() => setModalVisible(false)}>
                            <Text style={styles.buttonText}>Đóng</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

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
    switch (status.toString().toLowerCase()) {
        case 'available':
            return '#119960'; // Màu xanh lá cây cho trạng thái "Có sẵn"
        case 'booked':
            return '#F10808'; // Màu đỏ cho trạng thái "Đầy"
        case 'maintenance':
            return '#D9D9D9'; // Màu xám cho trạng thái "Bảo trì"
        default:
            return '#FFFFFF'; // Màu trắng mặc định
    }
};

// Hàm lấy màu chữ cho thẻ dựa trên trạng thái
const getTextColor = (status) => {
    return status.toString().toLowerCase() === 'maintenance' ? '#000' : '#fff'; // Màu trắng cho trạng thái "Bảo trì", màu đen cho các trạng thái khác
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    headerContainer: {
        height: 80, // Tăng chiều cao của header
        backgroundColor: '#00C673',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginTop: 30,
    },
    filterContainer: {
        flexDirection: 'row',
    },
    filterItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 25,
    },
    colorBox: {
        width: 20,
        height: 20,
        marginRight: 5,
        borderRadius: 3,
    },
    labelText: {
        color: '#fff',
        fontSize: 14,
    },
    filterIcon: {
        padding: 10,
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
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        height: 450,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    filterPrice: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
        paddingHorizontal: 10,
        padding: 5,
        backgroundColor: '#D9D9D9',
    },
    input: {
        flex: 1,
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginRight: 5, // Khoảng cách giữa các input
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    picker: {
        height: 40,
        width: '100%',
        marginBottom: 10,
        backgroundColor: '#D9D9D9',
    },
    button: {
        backgroundColor: '#00C673',
        padding: 10,
        borderRadius: 5,
        marginVertical: 10,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },

});

export default FieldList;

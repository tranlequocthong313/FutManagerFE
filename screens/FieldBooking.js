import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, TextInput } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import { authHTTP, fieldEndpoints } from '../configs/apis';

const FieldBooking = ({ route, navigation }) => {
    const { field } = route.params;

    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const [timeSlots, setTimeSlots] = useState([]);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(false);
        setDate(currentDate);
    };

    const showDatePicker = () => {
        setShow(true);
    };

    const formatPrice = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    };

    const pointerEvents = (status) => {
        return ["invalid", "booked"].includes(status.toString().toLowerCase()) ? "none" : "auto"
    };

    const getStatusColor = (status) => {
        switch (status.toString().toLowerCase()) {
            case 'available':
                return '#D9D9D9';
            case 'booked':
                return '#F10808';
            case 'selected':
                return '#FFD700';
            default:
                return '#666666';
        }
    };

    const handlePressTimeSlot = (index) => {
        setTimeSlots((prevSlots) => {
            const updatedSlots = prevSlots.map((slot, i) => {
                if (i === index && (slot.status === 'Available' || slot.status === 'Selected')) {
                    return { ...slot, status: slot.status === 'Selected' ? 'Available' : 'Selected' };
                }
                return slot;
            });

            // Tìm tất cả các khoảng thời gian đã được chọn
            const selectedSlots = updatedSlots.filter(slot => slot.status === 'Selected');
            if (selectedSlots.length > 0) {
                const fromTime = selectedSlots[0].time;
                const toTime = selectedSlots[selectedSlots.length - 1].time;

                // Tìm tất cả các khoảng thời gian ở giữa
                const fromIndex = updatedSlots.findIndex(slot => slot.time === fromTime);
                const toIndex = updatedSlots.findIndex(slot => slot.time === toTime);

                // Tự động chọn các khoảng thời gian ở giữa
                for (let i = fromIndex + 1; i < toIndex; i++) {
                    if (updatedSlots[i].status === 'Available') {
                        updatedSlots[i].status = 'Selected';
                    }
                }

                // Kiểm tra tính hợp lệ của thời gian bắt đầu và kết thúc
                let isValid = true;
                for (let i = 0; i < updatedSlots.length; i++) {
                    if (updatedSlots[i].status === 'Booked' &&
                        (updatedSlots[i].time >= fromTime && updatedSlots[i].time <= toTime)) {
                        isValid = false;
                        break;
                    }
                }

                if (isValid) {
                    return updatedSlots;
                } else {
                    alert('Hãy chọn thời gian liên tục nhau');
                    return prevSlots;
                }
            }

            return updatedSlots;
        });
    };



    const calculateTotalPrice = () => {
        const selectedSlots = timeSlots.filter(slot => slot.status === 'Selected');
        return selectedSlots.length * field.price;
    };

    const renderTimeSlot = ({ item, index }) => (
        <TouchableOpacity style={{ pointerEvents: pointerEvents(item.status) }} onPress={() => handlePressTimeSlot(index)}>
            <View style={styles.timeSlot}>
                <Text style={styles.timeSlotText}>{item.time}</Text>
                <View style={[styles.timeSlotStatus, { backgroundColor: getStatusColor(item.status) }]} />
            </View>
        </TouchableOpacity>
    );

    const navigateToNextPage = () => {
        const selectedSlots = timeSlots.filter(slot => slot.status === 'Selected');
        if (selectedSlots.length > 0) {
            const fromTime = selectedSlots[0].time;
            let toTime = selectedSlots[selectedSlots.length - 1].time;

            // Kiểm tra tính hợp lệ của thời gian bắt đầu và kết thúc
            const isValid = timeSlots.every(slot => {
                return !(slot.status === 'Booked' &&
                    (slot.time >= fromTime && slot.time <= toTime));
            });

            if (isValid) {
                toTime = selectedSlots[selectedSlots.length - 1].endtime;
                const totalPrice = calculateTotalPrice();

                // Điều hướng đến màn hình tiếp theo và truyền các thông tin cần thiết
                navigation.navigate('FieldInfor', {
                    field,
                    date: format(date, 'yyyy-MM-dd'),
                    totalPrice,
                    fromTime,
                    toTime
                });
            } else {
                alert('Selected time slot overlaps with already booked time slots');
            }
        } else {
            alert('Please select at least one time slot');
        }
    };

    const initTimeSlots = () => {
        const result = [
            { time: '06:00', status: 'Available', endtime: '07:00' },
            { time: '07:00', status: 'Available', endtime: '08:00' },
            { time: '08:00', status: 'Available', endtime: '09:00' },
            { time: '09:00', status: 'Available', endtime: '10:00' },
            { time: '14:00', status: 'Available', endtime: '15:00' },
            { time: '15:00', status: 'Available', endtime: '16:00' },
            { time: '16:00', status: 'Available', endtime: '17:00' },
            { time: '17:00', status: 'Available', endtime: '18:00' },
            { time: '18:00', status: 'Available', endtime: '19:00' },
            { time: '19:00', status: 'Available', endtime: '20:00' },
            { time: '20:00', status: 'Available', endtime: '21:00' },
            { time: '21:00', status: 'Available', endtime: '22:00' },
            { time: '22:00', status: 'Available', endtime: '23:00' },
        ]
        return result.map(slot => {
            if (lessThanNow(slot)) {
                return {
                    ...slot,
                    status: 'Invalid'
                }
            }
            return slot
        })
    }

    // HH:mm
    const lessThanNow = (timeObj) => {
        const now = new Date();
        const [hours, minutes] = timeObj.time.split(':');
        const timeToCheck = new Date();
        timeToCheck.setHours(hours, minutes, 0, 0);
        return timeToCheck < now
    }

    const updateTimeSlots = (bookings) => {
        setTimeSlots((prevSlots) => {
            // Tạo một bản sao của slots gốc và reset lại trạng thái
            const resetSlots = (prevSlots.length ? prevSlots : initTimeSlots()).map(slot => ({
                ...slot,
                status: slot.status.toString().toLowerCase() === 'invalid' ? 'Invalid' : 'Available'
            }));

            // Cập nhật trạng thái của các slot dựa trên dữ liệu bookings
            bookings.forEach(booking => {
                if (booking.paid) {
                    const fromHour = parseInt(booking.from_time.split(':')[0], 10);
                    const toHour = parseInt(booking.to_time.split(':')[0], 10);

                    for (let i = 0; i < resetSlots.length; i++) {
                        const slotHour = parseInt(resetSlots[i].time.split(':')[0], 10);

                        if (slotHour >= fromHour && slotHour < toHour) {
                            resetSlots[i] = { ...resetSlots[i], status: 'Booked' };
                        }
                    }
                }
            });

            return resetSlots;
        });
    };


    useEffect(() => {
        // Fetch data from API
        const fetchBookings = async () => {
            try {
                const instance = await authHTTP();
                const url = `${fieldEndpoints.bookings(field.id)}?date=${format(date, 'yyyy-MM-dd')}`;
                const response = await instance.get(url);
                const data = response.data;
                updateTimeSlots(data);
            } catch (error) {
                console.error('Error fetching bookings:', error);
            }
        };


        fetchBookings();
    }, [date]);

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <View style={styles.filterWrapper}>
                    <View style={styles.statusContainer}>
                        <View style={styles.statusItem}>
                            <View style={[styles.statusIndicator, { backgroundColor: '#D9D9D9' }]} />
                            <Text style={styles.statusLabel}>Trống</Text>
                        </View>
                        <View style={styles.statusItem}>
                            <View style={[styles.statusIndicator, { backgroundColor: '#FB1212' }]} />
                            <Text style={styles.statusLabel}>Đã đặt</Text>
                        </View>
                        <View style={styles.statusItem}>
                            <View style={[styles.statusIndicator, { backgroundColor: '#E2C113' }]} />
                            <Text style={styles.statusLabel}>Chọn</Text>
                        </View>
                    </View>
                    <View style={styles.datePickerWrapper}>
                        <TouchableOpacity style={styles.dateInput} onPress={showDatePicker}>
                            <TextInput
                                style={styles.dateText}
                                value={format(date, 'dd/MM/yyyy')}
                                editable={false}
                            />
                            <FontAwesome name="calendar" size={16} color="#fff" />
                        </TouchableOpacity>
                        {show && (
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={date}
                                mode="date"
                                display="default"
                                onChange={onChange}
                                minimumDate={new Date()}
                            />
                        )}
                    </View>
                </View>
            </View>

            <View style={styles.card}>
                <Image
                    source={field.img ? { uri: field.img } : { uri: "https://res.cloudinary.com/dh1irfap0/image/upload/v1724499901/footballfieldicon_n8mbgs.png" }}
                    style={styles.image}
                />
                <View style={styles.cardContent}>
                    <Text style={[styles.fieldName]}>{field.name}</Text>
                    <Text style={[styles.fieldNumber]}>Loại sân: Sân {field.field_type}</Text>
                </View>
                <View style={styles.cardPriceRating}>
                    <Text style={[styles.price]}>{formatPrice(field.price)} VND/h</Text>
                </View>
            </View>

            <FlatList
                data={timeSlots}
                renderItem={renderTimeSlot}
                keyExtractor={(item) => item.time}
                contentContainerStyle={styles.timeSlotsContainer}
                ListEmptyComponent={<></>}
            />

            <View style={styles.totalPriceContainer}>
                <Text style={styles.totalPriceText}>Tổng: {formatPrice(calculateTotalPrice())} VND</Text>
            </View>

            <TouchableOpacity
                style={[
                    styles.continueButton,
                    calculateTotalPrice() === 0 && styles.disabledButton
                ]}
                onPress={navigateToNextPage}
                disabled={calculateTotalPrice() === 0}
            >
                <Text style={styles.continueButtonText}>TIẾP THEO</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    headerContainer: {
        backgroundColor: '#00C673',
    },

    filterWrapper: {
        height: 80,
        backgroundColor: '#00C673',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    statusContainer: {
        flexDirection: 'row',
    },
    statusItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10,
    },
    statusIndicator: {
        width: 20,
        height: 20,
        marginRight: 5,
        borderRadius: 3,
    },
    statusLabel: {
        color: '#fff',
        fontSize: 14,
    },
    datePickerWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dateInput: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#007B55',
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    dateText: {
        color: '#fff',
        fontSize: 15,
        marginRight: 10,
        paddingHorizontal: 10,
    },
    card: {
        flexDirection: 'row',
        padding: 15,
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#D9D9D9',
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
    cardPriceRating: {
        alignItems: 'flex-end',
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        padding: 5,
        marginTop: 32,
    },
    timeSlotsContainer: {
        paddingHorizontal: 15,
        paddingTop: 20,
    },
    timeSlot: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    timeSlotText: {
        fontSize: 16,
        width: '30%',
        backgroundColor: '#819B90',
        textAlign: 'center',
        color: '#fff',
        fontWeight: 'bold',
        padding: 10,
        borderColor: '#000',
        borderBottomWidth: 2,
        marginRight: 5,
    },
    timeSlotStatus: {
        flex: 1,
        height: 44,
        borderColor: '#fff',
        borderWidth: 1,
    },
    totalPriceContainer: {
        padding: 15,
        borderTopWidth: 1,
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
        width: '100%',
        marginTop: 10,
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

export default FieldBooking;

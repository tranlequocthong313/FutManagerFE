import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { BarChart } from 'react-native-chart-kit';
import { Dimensions } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { authHTTP, statsEndpoints } from '../configs/apis'; // Đảm bảo import đúng

const screenWidth = Dimensions.get("window").width;

const FieldRevenueStats = () => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [date, setDate] = useState("");
    const [revenueData, setRevenueData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [noData, setNoData] = useState(false); // Thêm state để kiểm tra không có dữ liệu

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        const month = date.getMonth() + 1; // Months are zero-based in JS
        const year = date.getFullYear();
        setDate(`${month}/${year}`);
        hideDatePicker();
        fetchData(year, month); // Cập nhật dữ liệu khi chọn tháng
    };

    const fetchData = async (year, month) => {
        try {
            const instance = await authHTTP(); // Lấy instance của Axios
            const response = await instance.get(`${statsEndpoints.revenue}?year=${year}&month=${month}`);
            const data = response.data; // Axios trả về dữ liệu trong response.data
            if (data.monthly_revenue[0].daily_revenue.length === 0) {
                setNoData(true); // Nếu không có doanh thu, cập nhật trạng thái noData
            } else {
                setRevenueData(data);
                setNoData(false); // Có dữ liệu, nên reset trạng thái noData
            }
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setIsLoading(false); // Kết thúc trạng thái loading ngay cả khi có lỗi
        }
    };

    useEffect(() => {
        // Lấy năm và tháng từ ngày hiện tại khi load lần đầu
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth() + 1;
        fetchData(currentYear, currentMonth);
    }, []);

    if (isLoading) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }

    if (noData) {
        return (
            <View style={styles.container}>
                <Text style={styles.noDataText}>Không có doanh thu cho tháng này</Text>
            </View>
        );
    }

    const formatNumber = (number) => {
        return number.toLocaleString(); // Định dạng số với dấu phân cách hàng nghìn
    };

    const data = {
        labels: revenueData.monthly_revenue[0].daily_revenue.map(item => item.day.toString()),
        datasets: [
            {
                data: revenueData.monthly_revenue[0].daily_revenue.map(item => item.total_revenue)
            }
        ]
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>

            <TouchableOpacity onPress={showDatePicker} style={styles.datePicker}>
                <TextInput
                    style={styles.input}
                    placeholder="MM/YYYY"
                    value={date}
                    editable={false}
                />
                <Icon name="calendar-today" size={24} color="gray" />
            </TouchableOpacity>

            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
                date={new Date()} // Đặt ngày hiện tại mặc định
                // Chỉ hiển thị tháng và năm, không cho phép chọn ngày
                display="spinner"
            />

            <BarChart
                style={styles.chart}
                data={data}
                width={screenWidth - 40}
                height={220}
                chartConfig={chartConfig}
                verticalLabelRotation={0}
                fromZero={true} // Đảm bảo trục Y bắt đầu từ 0
            />

            <View style={styles.table}>
                <View style={styles.tableRow}>
                    <Text style={styles.tableHeader}>ID</Text>
                    <Text style={styles.tableHeader}>Day</Text>
                    <Text style={styles.tableHeader}>Revenue</Text>
                </View>
                {revenueData.monthly_revenue[0].daily_revenue.map((item, index) => (
                    <View key={index} style={styles.tableRow}>
                        <Text style={styles.tableHeader}>{index+1}</Text>
                        <Text style={styles.tableHeader}>{item.day}</Text>
                        <Text style={styles.tableHeader}>{formatNumber(item.total_revenue)} VND</Text>
                    </View>
                ))}
            </View>

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    header: {
        backgroundColor: '#008000',
        paddingVertical: 15,
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    datePicker: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#008000',
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#000',
    },
    chart: {
        marginVertical: 8,
    },
    yAxisLabel: {
        position: 'absolute',
        left: 0,
        top: 250,
        transform: [{ rotate: '-90deg' }],
        fontSize: 16,
        fontWeight: 'bold',
        color: '#008000',
    },
    xAxisLabel: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#008000',
    },
    table: {
        marginTop: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        overflow: 'hidden',
    },
    tableRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    tableHeader: {
        flex: 1,
        fontWeight: 'bold',
        color: '#000',
    },
    button: {
        backgroundColor: '#FFD700',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    noDataText: {
        textAlign: 'center',
        fontSize: 16,
        color: '#ff0000',
    },
});

const chartConfig = {
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    color: () => '#008000', // Màu xanh lá đậm cho thanh
    barPercentage: 0.5,
    propsForLabels: {
        fontSize: '12px',
        fontWeight: 'bold',
        color: '#008000',
    },
    propsForVerticalLabels: {
        fontSize: '12px',
        fontWeight: 'bold',
        color: '#008000',
    },
    propsForBackgroundLines: {
        strokeWidth: 0.5,
        stroke: '#000'
    },
    formatYLabel: (value) => {
        const number = Number(value);
        if (!isNaN(number)) {
            return number.toLocaleString(); // Định dạng số liệu với dấu phân cách hàng nghìn
        }
        return value;
    }
};

export default FieldRevenueStats;

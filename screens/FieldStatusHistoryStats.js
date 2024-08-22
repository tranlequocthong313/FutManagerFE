import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    FlatList,
    Dimensions,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { LineChart } from "react-native-chart-kit";
import { authHTTP, fieldEndpoints, statsEndpoints } from "../configs/apis";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const screenWidth = Dimensions.get("window").width;

const FieldStatusHistoryStats = () => {
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [year, setYear] = useState(new Date().getFullYear());
    const [field, setField] = useState(null);
    const [fields, setFields] = useState([]);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const fetchFields = async () => {
        setLoading(true);
        try {
            const response = await (await authHTTP()).get(fieldEndpoints.fields);
            if (response.status === 200) {
                setFields(response.data.results);
                setField(response.data.results[0]?.id);
            } else {
                console.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    };

    const fetchStats = async () => {
        if (!field || !month || !year) {
            return;
        }

        setLoading(true);
        try {
            const response = await (
                await authHTTP()
            ).get(
                `${statsEndpoints.status(field)}?month=${month
                    .toString()
                    .padStart(2, "0")}&year=${year}`,
            );
            if (response.status === 200) {
                setStats(response.data);
            } else {
                console.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchFields();
    }, []);

    useEffect(() => {
        fetchStats();
    }, [field, month, year]);

    const chartData = {
        labels: ["Ngày trống", "Ngày sửa chữa", "Ngày được đặt"],
        datasets: [
            {
                data: stats
                    ? [
                        stats.report.available_days,
                        stats.report.maintain_days,
                        stats.report.booked_days,
                    ]
                    : [0, 0, 0],
            },
        ],
    };

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        setMonth(date.getMonth() + 1);
        setYear(date.getFullYear());
        hideDatePicker();
    };

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#00C673" />
            ) : (
                <>
                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={field}
                            onValueChange={(itemValue) => setField(itemValue)}
                            style={styles.picker}
                        >
                            {fields.map((f) => (
                                <Picker.Item key={f.id} label={f.name} value={f.id} />
                            ))}
                        </Picker>
                        <Text onPress={showDatePicker} style={styles.datePickerText}>
                            {`${month}/${year}`}
                        </Text>
                    </View>

                    {stats && (
                        <>
                            <LineChart
                                data={chartData}
                                width={screenWidth - 32}
                                height={220}
                                yAxisLabel=""
                                chartConfig={{
                                    backgroundColor: "#05834E",
                                    backgroundGradientFrom: "#05834E",
                                    backgroundGradientTo: "#05834E",
                                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                }}
                                style={styles.chart}
                            />

                            <FlatList
                                data={[
                                    { key: "Ngày trống", value: stats.report.available_days },
                                    { key: "Ngày sửa chữa", value: stats.report.maintain_days },
                                    { key: "Ngày được đặt", value: stats.report.booked_days },
                                ]}
                                renderItem={({ item }) => (
                                    <View style={styles.tableRow}>
                                        <Text style={styles.tableKey}>{item.key}:</Text>
                                        <Text style={styles.tableValue}>{item.value}</Text>
                                    </View>
                                )}
                                keyExtractor={(item) => item.key}
                                style={styles.table}
                            />
                        </>
                    )}
                </>
            )}

            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
                display="default"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#fff",
    },
    pickerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },
    picker: {
        flex: 1,
        height: 50,
    },
    datePickerText: {
        fontSize: 16,
        color: "#00C673",
        marginLeft: 16,
    },
    chart: {
        marginVertical: 32,
        borderRadius: 16,
    },
    table: {
        marginTop: 20,
    },
    tableRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
        backgroundColor: "#f9f9f9",
    },
    tableKey: {
        fontSize: 16,
        color: "#333",
        fontWeight: "bold",
    },
    tableValue: {
        fontSize: 16,
        color: "#333",
    },
});

export default FieldStatusHistoryStats;

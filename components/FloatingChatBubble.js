// FloatingChatBubble.js
import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Animated, Linking } from "react-native";
import { FontAwesome as FontAwesomeIcon } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import HTTP, { serviceEndpoints } from "../configs/apis";

const FloatingChatBubble = () => {
    const [showMenu, setShowMenu] = useState(false);
    const [customerSupports, setCustomerSupports] = useState([])

    useEffect(() => {
        const fetchCustomerSupports = async () => {
            try {
                const res = await HTTP.get(serviceEndpoints.customerSupports)
                if (res.status === 200) {
                    setCustomerSupports(res.data.results)
                } else {
                    console.error(res.data.message)
                }
            } catch (error) {
                console.error(res.data.message)
            }
        }

        fetchCustomerSupports()
    }, [])

    const getServiceContent = (keys = []) => {
        let res = "";
        customerSupports.forEach((cs) => {
            if (cs.service_name && keys.includes(cs.service_name.toLowerCase())) {
                  res = cs.content
            }
        })
        return res
    }

    const openMessenger = () => {
        let fieldMasterId = getServiceContent(["fb", "facebook"]) || "400753249778273";

        Linking.canOpenURL('https://').then(supported => {
            if (!supported) {
                console.error('Can\'t handle url: ');
            } else {
                Linking.openURL("https://m.me/" + fieldMasterId);
            }
        }).catch(err => console.error(err))
    }

    const openZalo = () => {
        const fieldMasterPhoneNumber = getServiceContent(["zalo"]) || "0909943501";

        Linking.canOpenURL('https://').then(supported => {
            if (!supported) {
                console.error('Can\'t handle url: ');
            } else {
                Linking.openURL("https://zalo.me/" + fieldMasterPhoneNumber);
            }
        }).catch(err => console.error(err))
    }

    return (
        <Animated.View style={styles.bubble}>
            <TouchableOpacity
                style={styles.bubbleContent}
                onPress={() => setShowMenu(!showMenu)}
            >
                <FontAwesomeIcon name="comments" size={28} color="#fff" />
            </TouchableOpacity>
            {showMenu && (
                <View style={styles.menu}>
                    <TouchableOpacity style={styles.menuItem} onPress={openMessenger}>
                        <Fontisto name="messenger" size={28} color="#000" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuItem}>
                        <Fontisto name="whatsapp" size={28} color="#000" onPress={openZalo} />
                    </TouchableOpacity>
                </View>
            )}
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    bubble: {
        position: "absolute",
        bottom: 80,
        right: 20,
        backgroundColor: "#05834E",
        borderRadius: 50,
        padding: 18,
        elevation: 5,
    },
    bubbleContent: {
        alignItems: "center",
        justifyContent: "center",
    },
    menu: {
        backgroundColor: "#D9D9D9", // Nền của menu
        borderRadius: 40,
        padding: 6,
        position: "absolute",
        bottom: 78,
        right: 2,
        width: 60, // Điều chỉnh chiều rộng của menu nếu cần
        flexDirection: "column", // Đổi menu thành chiều dọc
        alignItems: "center", // Căn giữa các icon trong menu
    },
    menuItem: {
        borderRadius: 30,
        padding: 10,
        marginBottom: 10, // Khoảng cách giữa các icon
    },
});

export default FloatingChatBubble;

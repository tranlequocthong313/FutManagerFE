import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView, useWindowDimensions } from 'react-native';
import { authHTTP, serviceEndpoints } from '../configs/apis';
import RenderHtml from 'react-native-render-html';

// Sửa hàm AboutScreen
export default function AboutScreen() {
    const [content, setContent] = useState()
    const { width } = useWindowDimensions();

    useEffect(() => {
        const fetchAboutUsContent = async () => {
            try {
                const res = await (await authHTTP()).get(serviceEndpoints.abouts)
                if (res.status === 200) {
                    setContent(res.data.results[0].content)
                }
            } catch (error) {
                console.error(error)
            }
        }

        fetchAboutUsContent()
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <RenderHtml
                    contentWidth={width}
                    source={{ html: `${content}` }}
                />
            </ScrollView >
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    scrollViewContent: {
        padding: 20,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    headerText1: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'right'
    },
    paragraph: {
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 15,
    },
    quote: {
        fontSize: 16,
        lineHeight: 24,
        fontStyle: 'italic',
        marginBottom: 15,
    },
});

// Chỉ export default một lần

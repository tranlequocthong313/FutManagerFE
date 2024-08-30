import React, { useEffect } from 'react';
import { WebView } from 'react-native-webview';
import { View, ActivityIndicator, Linking } from 'react-native';

export default function WebViewScreen({ route, navigation }) {
    const { dataPayment } = route.params;

    useEffect(() => {
        const handleDeepLink = (event) => {
            const url = event.url;
            if (url.includes('payment-success')) {
                navigation.navigate('FieldSuccess');
            }
        };

        Linking.addEventListener('url', handleDeepLink);

        Linking.getInitialURL().then((url) => {
            if (url) {
                handleDeepLink({ url });
            }
        });

        return () => {
            Linking.removeAllListeners('url');
        };
    }, []);

    return (
        <WebView
            style={{ marginTop: 28 }}
            source={{
                uri: dataPayment.payment_url || dataPayment.pay_url,
            }}
            startInLoadingState
            renderLoading={() => (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color="#000" />
                </View>
            )}
            onNavigationStateChange={(event) => {
                const uri = dataPayment.deeplink;
                if (!uri) {
                    return;
                }
                if (event.url !== uri) {
                    Linking.openURL(uri ?? event.url);
                }
            }}
        />
    );
}

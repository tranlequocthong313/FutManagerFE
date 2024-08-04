import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import AccountScreen from './screens/AccountScreen';
import NotificationsScreen from './screens/NotificationScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import AvatarTitle from './components/AvatarTitle';
import { ImageBackground, StyleSheet, TouchableOpacity, View } from 'react-native';
import FloatingChatBubble from './components/FloatingChatBubble';

const Tab = createBottomTabNavigator();

const backgroundImage = { uri: 'https://placehold.co/600x300/png' };

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'calendar';
            } else if (route.name === 'Notifications') {
              iconName = 'notifications';
            } else if (route.name === 'Account') {
              iconName = 'person';
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#fff',
          tabBarInactiveTintColor: '#2ecc71',
          tabBarActiveBackgroundColor: '#2ecc71',
          tabBarStyle: { backgroundColor: 'white' },
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: 'Home',
          }}
        />
        <Tab.Screen
          name="Notifications"
          component={NotificationsScreen}
          options={{
            tabBarLabel: 'Notifications',
            tabBarBadge: 3,
            tabBarBadgeStyle: { backgroundColor: 'red' },
          }}
        />
        <Tab.Screen
          name="Account"
          component={AccountScreen}
          options={{ 
            headerTitleAlign: 'center',
            headerTitle: (props) => <AvatarTitle {...props} />,
            headerBackground: () => (
              <ImageBackground
                source={backgroundImage}
                style={StyleSheet.absoluteFill}
              />
            ),
          }}
        />
      </Tab.Navigator>
      <FloatingChatBubble />
    </NavigationContainer>
  );
}


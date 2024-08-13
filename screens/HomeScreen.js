import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AccountScreen from './AccountScreen';
import NotificationsScreen from './NotificationScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import AvatarTitle from '../components/AvatarTitle';
import { ImageBackground } from 'react-native';

const Tab = createBottomTabNavigator();

const backgroundImage = { uri: 'https://placehold.co/600x300/png' };

function HomeScreen() {
  return (
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
  );
}

export default HomeScreen;

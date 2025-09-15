import React from 'react';
import { Image, View } from 'react-native';
import Home from '../screens/home/Home';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from "@react-native-vector-icons/fontisto";
import CartScreen from '../screens/home/CartScreen';
import WishlistScreen from '../screens/home/WishlistScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const BottomTabNavigation = (props: any) => {
    return (
        <Tab.Navigator screenOptions={({ route }) => ({
            headerShown: true,
            tabBarIcon: ({ color, size }) => {
                let iconName = 'home';
                if (route.name === 'Cart') {
                    iconName = 'cart';
                } else if (route.name === 'Wishlist') {
                    iconName = 'heart';
                }
                return <Ionicons name={iconName} size={size} color={color} />;
            }
        })}>
            <Tab.Screen
                name={'Home'}
                component={Home}
                options={{
                    tabBarLabel: 'Home',
                    tabBarActiveTintColor: 'skyblue',
                    tabBarIcon: ({ focused }: { focused: boolean }) => {
                        return (
                            <Icon name='home' size={20} color={'blue'} />
                        );
                    },
                }}
            />
            <Tab.Screen name="Wishlist" component={WishlistScreen} />
            <Tab.Screen name="Cart" component={CartScreen} />

        </Tab.Navigator>
    );
};

export default BottomTabNavigation;

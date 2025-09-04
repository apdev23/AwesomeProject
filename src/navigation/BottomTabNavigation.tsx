import React from 'react';
import { Image, View } from 'react-native';
import Home from '../screens/home/Home';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const BottomTabNavigation = (props: any) => {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name={'Home'}
                component={Home}
                options={{
                    tabBarLabel: 'Home',
                    tabBarActiveTintColor: 'skyblue',
                    tabBarIcon: ({ focused }: { focused: boolean }) => {
                        return (
                            <View>
                                <Image source={require('../../assets/png/group.png')} style={{ width: 20, height: 20 }} tintColor={focused ? 'skyblue' : '#000'} />
                            </View>
                        );
                    },
                }}
            />
            {/* <Tab.Screen
                name={' Setting'}
                component={Setting}
                options={{
                    tabBarLabel: 'Setting',
                    tabBarActiveTintColor: 'skyblue',
                    tabBarIcon: ({ focused }: { focused: boolean }) => {
                        return (
                            <View>
                                <Image source={require('../assets/png/setting.png')} style={{ width: 20, height: 20 }} tintColor={focused ? 'skyblue' : '#000'} />
                            </View>
                        );
                    },
                }}
            /> */}

        </Tab.Navigator>
    );
};

export default BottomTabNavigation;

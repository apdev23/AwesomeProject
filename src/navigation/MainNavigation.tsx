import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthNavigation from './AuthNavigation';
import HomeNavigation from './HomeNavigation';
import { useSelector } from 'react-redux';

const Stack = createNativeStackNavigator();

const MainNavigation = () => {
    const token = useSelector((state: any) => state?.auth?.user?.token);

    console.log(token, "token----")

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {(!token || token === "") ?
                <Stack.Screen name='Auth' component={AuthNavigation} />
                :
                <Stack.Screen name='HomeNavigation' component={HomeNavigation} />
            }
        </Stack.Navigator>
    )
}

export default MainNavigation;

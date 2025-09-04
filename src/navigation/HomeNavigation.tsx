import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigation from './BottomTabNavigation';

const Stack = createNativeStackNavigator();

const HomeNavigation = (props: any) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='BottomTabNavigation' component={BottomTabNavigation} />

    </Stack.Navigator>
  )
}

export default HomeNavigation
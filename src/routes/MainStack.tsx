import React from 'react';
import { View } from 'react-native';
import { HomeScreen } from '../pages/HomeScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ItemCompraScreen } from '../pages/ItemCompraScreen';
import { ItemCarinhoScreen } from '../pages/ItemCarinhoScreen';
import { SplashScreen } from '../pages/SplashScreen';

export const MainStack = () => {

    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator initialRouteName="SplashScreen" >
            <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ItemCompraScreen" component={ItemCompraScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ItemCarinhoScreen" component={ItemCarinhoScreen} options={{ headerShown: false }} />
            <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}


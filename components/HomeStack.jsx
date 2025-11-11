import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import DetailScreen from './DetailScreen';

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeList" component={HomeScreen} options={{ title: 'Products' }} />
      <Stack.Screen name="Detail" component={DetailScreen} options={{ title: 'Details' }} />
    </Stack.Navigator>
  );
}
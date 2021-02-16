import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

//Screens
import OnBoarding from './pages/OnBoarding';
import User from './pages/User';

const Stack = createStackNavigator();

export default function Routes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="OnBoarding"
        component={OnBoarding}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

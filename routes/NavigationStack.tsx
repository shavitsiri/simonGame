import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import GameScreen from '../Screens/GameScreen';
import ResultsScreen from '../Screens/ResultsScreen';

const Stack = createStackNavigator();

const NavigationStack = () => {
  return (
    <Stack.Navigator initialRouteName="Game">
      <Stack.Screen name="Game" component={GameScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Results" component={ResultsScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default NavigationStack;

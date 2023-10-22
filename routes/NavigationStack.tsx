import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import GameScreen from '../Screens/GameScreen';
import ResultsScreen from '../Screens/ResultsScreen';

const Stack = createStackNavigator();

const NavigationStack = () => {
  return (
    <Stack.Navigator initialRouteName="Game">
      <Stack.Screen name="Game" component={GameScreen} />
      <Stack.Screen name="Results" component={ResultsScreen} />
    </Stack.Navigator>
  );
};

export default NavigationStack;

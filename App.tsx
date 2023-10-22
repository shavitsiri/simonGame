/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import type { PropsWithChildren } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
// import gestureHandlerRootHOC from 'react-native-gesture-handler';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import NavigationStack from './routes/NavigationStack';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import store from './reducer/store';
import AsyncStorage from '@react-native-async-storage/async-storage';




function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  
  useEffect(() => {
    const initializeAsyncStorage = async () => {
      try {
        const resultsData = await AsyncStorage.getItem('results');
        if (resultsData === null) {
          // AsyncStorage is empty, so initialize it with an empty array.
          const initialValue = [];
          await AsyncStorage.setItem('results', JSON.stringify(initialValue));
        }
      } catch (error) {
        console.error('Error accessing AsyncStorage:', error);
      }
    };
  
    // Call the initialization logic.
    initializeAsyncStorage();
  }, []);
  


  return (
    <Provider store={store}>
        <NavigationContainer>
            <NavigationStack />
        </NavigationContainer>
    </Provider>
  );
}


export default App;

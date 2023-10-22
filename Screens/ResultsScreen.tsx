import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../reducer/type';
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import { incrementScore, setOtherValue } from '../reducer/gameActions';

const ResultsScreen: React.FC = () => {
  const score = useSelector((state: RootState) => state.game.score);
  const name = useSelector((state: RootState) => state.game.name);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [results, setResults] = useState<number[]>([]);

  const handleSetOtherValue = () => {
    dispatch(setOtherValue(-1));
  };

  const getResultsFromAsync = async () => {
    try {
      const resultsData = await AsyncStorage.getItem('results');
        //  console.log("resultsData = ", resultsData);
      if (resultsData !== null) {
        const results_user = JSON.parse(resultsData);
        const sortedResults = results_user.sort((a, b) => b.score - a.score);
        setResults(sortedResults);
      }
    } catch (error) {
      console.error('Error retrieving data from AsyncStorage:', error);
    }
  };

  useFocusEffect(() => {
    getResultsFromAsync();
  });

  // Get only the top 10 results
  const top10Results = results.slice(0, 10);
  
  return (
    <View style={styles.container}>
      <Text style={styles.resultsText}>Your Best </Text>
      <FlatList
        data={top10Results}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.resultItem}>
            <Image
                style={styles.resultImage}
                source={
                    index === 0
                    ? require('../images/thropy_gold.jpg')
                    : index === 1
                    ? require('../images/thropy_silver.jpeg')
                    : require('../images/thropy_bronze.jpeg')
                }
            />
            <Text style={styles.resultName}>{` ${item.name.length? item.name : 'Guest'}`}</Text>
            <Text style={styles.resultScore}>{`Score: ${item.score}`}</Text>
          </View>
        )}
      />
      <TouchableOpacity
        style={styles.newGameButton}
        onPress={() => {
          navigation.navigate('Game');
          handleSetOtherValue();
        }}
      >
        <Text style={styles.newGameButtonText}>Start New Game</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6C7FC2',
  },
  resultsText: {
    fontSize: 24,
    marginBottom: 15,
    marginTop:5,
    color:'black',
  },
  resultItem: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width:250,
    margin:5,
    backgroundColor:'aliceblue',
    borderRadius:12,
    height:35,
  },
  resultName: {
    fontSize: 16,
    color:'black',
    marginTop:5,
  },
  resultScore: {
    fontSize: 16,
    color:'black',
    marginTop:5,
    marginRight:30,
  },
  resultImage:{
    width:35,
    height:35,
    borderRadius:12,

  },
  newGameButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    marginBottom:10,
  },
  newGameButtonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default ResultsScreen;

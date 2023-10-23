import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../reducer/type';
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import { setOtherValue } from '../reducer/gameActions';

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
            if (resultsData !== null) {
                const results_user = JSON.parse(resultsData);
                const sortedResults = results_user.sort((a: { score: number }, b: { score: number }) => b.score - a.score);
                setResults(sortedResults);
            }
        } catch (error) {
            console.error('Error retrieving data from AsyncStorage:', error);
        }
    };

    useFocusEffect(() => {
        getResultsFromAsync();
    });

    const top10Results = results.slice(0, 10);

    return (
        <View style={styles.Container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Leaderboard</Text>
            </View>
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
                        <Text style={styles.resultName}>{`${item.name.length ? item.name : 'Guest'}`}</Text>
                        <Text style={styles.resultScore}>{`Score: ${item.score}`}</Text>
                    </View>
                )}
            />
            <TouchableOpacity style={styles.newGameButton} onPress={() => { navigation.navigate('Game'); handleSetOtherValue(); }}>
                <Text style={styles.newGameButtonText}>Start New Game</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    Container:{
        flex:1,
        backgroundColor: '#343539',
    },
    header: {
        padding: 20,
    },
    headerText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'white',
    },
    resultItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        padding: 10,
        borderRadius: 10,
    },
    resultImage: {
        width: 40,
        height: 40,
    },
    resultName: {
        fontSize: 18,
        color: 'black',
    },
    resultScore: {
        fontSize: 18,
        color: 'black',
    },
    newGameButton: {
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 10,
        marginTop: 20,
    },
    newGameButtonText: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
    },
});

export default ResultsScreen;

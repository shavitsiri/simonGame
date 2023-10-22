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
                const sortedResults = results_user.sort((a, b) => b.score - a.score);
                setResults(sortedResults);
            }
        } 
        catch (error) {
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
            <View style={styles.holder_header} >
                <Text style={styles.text_header} > LeaderBoard </Text>
            </View>
            <Image style={styles.icon_confetti_1} source={require('../images/icon_confetti.png')} />
            <Image style={styles.icon_confetti_2} source={require('../images/icon_confetti.png')} />
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
                        <Image style={styles.icon_crown} source={ index === 0 ? require('../images/icon_crown.png') : null } />
                        <Text style={styles.resultName}>{` ${item.name.length? item.name : 'Guest'}`}</Text>
                        <Text style={styles.resultScore}>{`Score: ${item.score}`}</Text>
                    </View>
                )}
            />
            <TouchableOpacity style={styles.newGameButton} onPress={() => { navigation.navigate('Game'); handleSetOtherValue(); }} >
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
        backgroundColor: '#343539',
    },
    holder_header:{
        padding: 16, // Adjust the padding as needed
    },
    icon_confetti_1:{
        position:'absolute',
        top:35,
        left:35,
    },
    icon_confetti_2:{
        position:'absolute',
        top:35,
        right:35,
    },
    text_header:{
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white', // Text color
        textAlign: 'center',
    },
    resultsText: {
        fontSize: 24,
        marginBottom: 15,
        marginTop:5,
        color:'white',
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
    icon_crown:{
        position:'absolute',
        right:0,
        width:25,
        height:25,
        transform: [{ rotate: '45deg' }],
    },
    newGameButton: {
        backgroundColor: '#4CAF50',
        padding: 6,
        borderRadius: 5,
        marginBottom:15,

    },
    newGameButtonText: {
        color: 'white',
        fontSize: 18,
    },
});

export default ResultsScreen;

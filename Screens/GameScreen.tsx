import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, TextInput, Image } from 'react-native';
import Sound from 'react-native-sound';
import Tts from 'react-native-tts';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { incrementScore, setOtherValue, setName } from '../reducer/gameActions';
import { RootState } from '../reducer/type';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { generateRandomSequence } from '../functions/sequenceUtils';



const GameScreen: React.FC = () => {
    Tts.setDefaultLanguage('en-US');
    const buttonColors = ['red', 'green', 'blue', 'yellow'];

    // Redux using
    const score = useSelector((state: RootState) => state.game.score);
    const name = useSelector((state: RootState) => state.game.name);
    const dispatch = useDispatch();

    const handleIncrementScore = () => {
        dispatch(incrementScore());
    };

    const handleSetOtherValue = () => {
        dispatch(setOtherValue(-1));
    };

    const handleSetName = (text_name: string) => {
        const regex = /^[a-zA-Z]+$/;
        if (regex.test(text_name) || text_name === '') {
            dispatch(setName(text_name.trim() === '' ? 'Guest' : text_name));
        }
    };

    // States Variables
    const navigation = useNavigation();
    const [convert_newSequence, setConvert_newSequence] = useState<string>('');
    const [sequence, setSequence] = useState<string[]>([]);
    const [userInput, setUserInput] = useState<string[]>([]);
    const [isPlayingSequence, setIsPlayingSequence] = useState<boolean>(true);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [startButtonEnable, setIsStartButtonEnable] = useState(false);
    const [fadeGreenButton, setFadeGreenButton] = useState(false);
    const [fadeBlueButton, setFadeBlueButton] = useState(false);
    const [fadeRedButton, setFadeRedButton] = useState(false);
    const [fadeYellowButton, setFadeYellowButton] = useState(false);
  

    // Define a sound for button presses by the user
    const userButtonSound = new Sound(require('../sounds/user_button_press.wav'), (error) => {
        if (error) {
            console.log('Failed to load sound', error);
        }
    });

    // Function from Button Start Game
    const startGame = () => {
        const newSequence = generateRandomSequence(20);
        setConvert_newSequence(newSequence.join(' '));
        setSequence(newSequence);
        setUserInput([]);
        if (score === -1) {
            handleIncrementScore();
        } 
        else {
            handleSetOtherValue();
        }
    };

    // Function to deal with user pressing button game
    const handleButtonPress = (color: string) => {
        if (isPlayingSequence) {
            return;
        }
        else{
            userButtonSound.play((success) => {
                if (!success) {
                    console.log('Failed to play the sound');
                }
            });
            setUserInput([...userInput, color]);
        }
        
    };



    useEffect(() => {
        if (score != -1) {
            playSequence(convert_newSequence, score)
            setUserInput([]);
        }
    }, [score]);



    useEffect(() => {
        if (userInput.length && userInput.length == score + 1) {
            setIsPlayingSequence(true);
            checkUserInput();
        } 
        else if (userInput.length && userInput.length < score + 1) {
            checkUserInput();
        }
    }, [userInput]);


    async function playSequence(sequenceToPlay: string, level: number) {
        setIsPlayingSequence(true);
        const words = sequenceToPlay.split(' ');
      
        // Add an initial delay of one second
        await new Promise((resolve) => setTimeout(resolve, 1000));
      
        for (let index = 0; index <= level; index++) {
          if (words[index] === 'green') {
            setFadeGreenButton(true);
          } else if (words[index] === 'blue') {
            setFadeBlueButton(true);
          } else if (words[index] === 'red') {
            setFadeRedButton(true);
          } else if (words[index] === 'yellow') {
            setFadeYellowButton(true);
          }
          Tts.speak(words[index]);
          
          // Delay to show the button for a period
          await new Promise((resolve) => setTimeout(resolve, 800));
      
          // Hide all buttons
          setFadeGreenButton(false);
          setFadeBlueButton(false);
          setFadeRedButton(false);
          setFadeYellowButton(false);
      
          // Delay before moving to the next button
          await new Promise((resolve) => setTimeout(resolve, 800));
      
        }
      
        setTimeout(() => {
          setIsPlayingSequence(false);
        }, level * 100);
      }
      
      
      



    // Function 2 check if the user right with his pressing
    const checkUserInput = () => {
        for (let i = 0; i < userInput.length; i++) {
            if (userInput[i] !== sequence[i]) {
                endGame();
                return;
            }
        }
        if (userInput.length === score + 1) {
            handleIncrementScore();
        }
    };



    // Function Game Over
    const endGame = () => {
        setIsPlayingSequence(true);
        setIsModalVisible(true);
        setIsStartButtonEnable(false);
    };




    // Function to store the data of the game in async storage
    const addScore2Async = async (score: number, name: string) => {
        try {
            const resultsData = await AsyncStorage.getItem('results');
            let results = resultsData ? JSON.parse(resultsData) : [];
            results.push({ score, name });
            dispatch(setName(''));
            await AsyncStorage.setItem('results', JSON.stringify(results));
        } catch (error) {
            console.error('Error Adding user score to storage:', error);
        }
    };

  return (
        
        <View style={styles.container}>
            <Image style={styles.image_logo} source={require('../images/simon_game_logo.jpeg')} />
            <Text style={styles.scoreText}>Score: {score == -1 ? '0' : score}</Text>
            <View style={styles.buttonContainer}>

                {fadeGreenButton ? <TouchableOpacity style={styles.greenButtonFade} /> : null}
                {fadeBlueButton ? <TouchableOpacity style={styles.blueButtonFade} /> : null}
                {fadeRedButton ? <TouchableOpacity style={styles.redButtonFade} /> : null}
                {fadeYellowButton ? <TouchableOpacity style={styles.yellowButtonFade} /> : null}
                
                {buttonColors.slice(0, 2).map((color, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[
                        styles.button,
                        { backgroundColor: color },
                        isPlayingSequence && styles.disabledButton,
                        ]}
                        onPress={() => handleButtonPress(color)}
                        disabled={isPlayingSequence}
                    />
                ))}

            </View>
            <View style={styles.buttonContainer}>
                {buttonColors.slice(2, 4).map((color, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[
                        styles.button,
                        { backgroundColor: color },
                        isPlayingSequence && styles.disabledButton,
                        ]}
                        onPress={() => handleButtonPress(color)}
                        disabled={isPlayingSequence}
                    />
                ))}
            </View>
    

            <TouchableOpacity style={styles.startButton} onPress={()=>{startGame();setIsStartButtonEnable(true);}} disabled={startButtonEnable}>
                <Text style={styles.startButtonText}>Start</Text>
            </TouchableOpacity>

        


            <Modal visible={isModalVisible} onRequestClose={() => setIsModalVisible(false)} animationType="slide" transparent={true}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                    <Text style={styles.ModalInputLabel}>Your Name: </Text>
                    <TextInput style={styles.ModalInputField} onChangeText={(text) => handleSetName(text)} placeholder="Jhon" />
                    <TouchableOpacity style={styles.ModalButton} onPress={() => { addScore2Async(score, name); setIsModalVisible(false); navigation.navigate('Results'); }}>
                        <Text style={styles.ModalButtonText}>Continue</Text>
                    </TouchableOpacity>
                    </View>
                </View>
            </Modal>

        </View>
  );
};

const styles = StyleSheet.create({
    imageBackground:{
        flex: 1,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#343539',
    },
    image_logo:{
        position:'relative',
        right:100,
        width:130,
        height:40,
        bottom:30,
    },
    scoreText: {
        fontSize: 36,
        marginBottom: 40,
        color: 'aliceblue',
        fontWeight: '700',
    },
    button: {
        width: 90,
        height: 90,
        borderRadius: 12,
        margin: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    disabledButton: {
        opacity: 0.5,
    },
    startButton: {
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 12,
        width: 150,
        marginTop: 35,
    },
    startButtonText: {
        color: 'white',
        fontSize: 22,
        alignSelf: 'center',
    },
    ModalInputLabel: {
        color: 'black',
        fontSize: 18,
        padding: 7,
        alignSelf: 'center',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        width: '80%',
    },
    ModalInputField: {
        width: '60%',
        borderWidth: 1,
        borderColor: '#868686',
        borderRadius: 12,
        padding: 7,
        marginBottom: 10,
        alignSelf: 'center',
    },
    ModalButton: {
        width: 100,
        backgroundColor: 'midnightblue',
        alignSelf: 'center',
        borderRadius: 12,
    },
    ModalButtonText: {
        color: 'white',
        alignSelf: 'center',
        fontSize: 15,
        padding: 5,
    },
    greenButtonFade:{
        position:'absolute',
        right:0,
        width: 90,
        height: 90,
        borderRadius: 12,
        margin: 10,
        backgroundColor:'lightgreen',
    },
    blueButtonFade:{
        position:'absolute',
        top:110,
        left:0,
        width: 90,
        height: 90,
        borderRadius: 12,
        margin: 10,
        backgroundColor:'#4C7DFF',
    },
    redButtonFade:{
        position:'absolute',
        left:0,
        width: 90,
        height: 90,
        borderRadius: 12,
        margin: 10,
        backgroundColor:'red',
    },
    yellowButtonFade:{
        position:'absolute',
        top:110,
        right:0,
        width: 90,
        height: 90,
        borderRadius: 12,
        margin: 10,
        backgroundColor:'yellow',
    },
});

export default GameScreen;

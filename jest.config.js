// module.exports = {
//   preset: 'react-native',
// };


module.exports = {
  preset: 'react-native',

   // Transform modules that are using Babel
   transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },

  // Paths to Jest's mock modules
  moduleNameMapper: {
    '^@react-native-async-storage/async-storage$':
      '<rootDir>/__mocks__/react-native/Libraries/Storage/AsyncStorage.js',
    '^@react-native-sound$': 
     '<rootDir>/__mocks__/react-native-sound.js',
    '^react-native-tts$': 
      '<rootDir>/__mocks__/react-native-tts.js',

    // Add more mappings for other mocks as needed
  },
};
// __mocks__/react-native/Libraries/Storage/AsyncStorage.js

const mockAsyncStorage = {
    setItem: jest.fn(),
    getItem: jest.fn(),
    removeItem: jest.fn(),
    mergeItem: jest.fn(),
    clear: jest.fn(),
    getAllKeys: jest.fn(),
  };
  
  export default mockAsyncStorage;
  
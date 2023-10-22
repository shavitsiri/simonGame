import mockAsyncStorage from "./Storage/AsyncStorage";
import jestConfig from "./jest.config";

const mockImpl = new mockAsyncStorage();
jest.mock('@react-native-async-storage/async-storage',()=>mockImpl);


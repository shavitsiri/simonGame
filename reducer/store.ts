// store.ts

import { createStore, combineReducers } from 'redux';
import gameReducer from './gameReduce';

const rootReducer = combineReducers({
  game: gameReducer,
});

const store = createStore(rootReducer);

export default store;

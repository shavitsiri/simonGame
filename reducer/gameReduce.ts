// reducers/gameReducer.ts

import { SET_SCORE, INCREMENT_SCORE, SET_OTHER_VALUE, SET_NAME } from './gameActions';

export interface GameState {
  score: number;
  name: string;
}

const initialState: GameState = {
  score: -1,
  name:'Guest',
};

const gameReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_SCORE:
      return { ...state, score: action.payload };
    case INCREMENT_SCORE:
      return { ...state, score: state.score + 1 };
    case SET_OTHER_VALUE:
      return { ...state, score: -1 };
    case SET_NAME:
      return { ...state, name: action.payload };
    default:
      return state;
  }
};

export default gameReducer;

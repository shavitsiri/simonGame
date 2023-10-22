// types.ts

import { GameState } from '../reducer/gameReduce';

interface RootState {
  game: GameState;
  // Add properties for other reducers here if you have multiple reducers
}

export type { RootState };

// actions/gameActions.ts

export const SET_SCORE = 'SET_SCORE';
export const INCREMENT_SCORE = 'INCREMENT_SCORE';
export const SET_OTHER_VALUE = 'SET_OTHER_VALUE';
export const SET_NAME = 'SET_NAME';

export const setScore = (newScore: number) => ({
  type: SET_SCORE,
  payload: newScore,
});

export const incrementScore = () => ({
  type: INCREMENT_SCORE,
});

export const setOtherValue = (newValue: number) => ({
  type: SET_OTHER_VALUE,
  payload: newValue,
});

export const setName = (newName: string) => ({
  type: SET_NAME,
  payload: newName,
});
